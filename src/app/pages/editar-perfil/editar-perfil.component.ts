import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { PerfilFormService } from 'src/app/services/perfil-form.service';
import { RequestPerfil } from 'src/app/models/RequestPerfil';
import { Perfil } from 'src/app/models/Perfil';
import { LogsService } from 'src/app/services/logs.service';
import { CookieService } from 'ngx-cookie-service';
import { RequestLogOp } from 'src/app/models/RequestLogOp';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css'],
})
export class EditarPerfilComponent {
  originalValues: any = {};
  Perfil: Perfil[] = [];

  constructor(
    private title: Title,
    private toastr: ToastrService,
    private PerfilFormService: PerfilFormService,
    private cookieService: CookieService,
    private logsService: LogsService
  ) {}

  async ngOnInit() {
    const novoTitulo = 'Edições Painel';
    this.title.setTitle(novoTitulo);

    const response = await this.PerfilFormService.GetPerfil();
    this.Perfil = response;
  }

  editItem(item: any): void {
    item.editing = true;
    this.originalValues[item.codigoPerfil] = {
      nomePerfil: item.nomePerfil,
    };
  }

  async saveItem(item: any): Promise<void> {
    item.editing = false;

    try {
      const response = await this.PerfilFormService.UpdatePerfil({
        codigoPerfil: item.codigoPerfil,
        nomePerfil: item.nomePerfil,
      });

      if (response[0].nomePerfil == 401) {
        this.toastr.error(`Já existe um Perfil com a mesmas Descrição.`);
        const originalValue = this.originalValues[item.codigoPerfil];
        Object.assign(item, originalValue);
      } else {
        this.toastr.success('Perfil editada');

        const session = JSON.parse(this.cookieService.get('session'));

        console.log(session);

        const horaLocal: Date = new Date();
        horaLocal.setHours(horaLocal.getHours() - 3);

        const RequestLogOp: RequestLogOp = {
          dataLogOperacao: horaLocal,
          matriculaUsuarioLogOperacao: session.matriculaUsuario,
          codigoPerfilLogOperacao: session.codigoPerfil,
          CodigoFuncaoLogOperacao: 1,
          DescricaoLogOperacao: 'UPDATE PERFIL',
          TipoQueryLogOperacao: 'U',
        };

        console.log(RequestLogOp);

        await this.logsService.LogOperacao(RequestLogOp);
      }
    } catch (error) {
      this.toastr.error(`Formulário incompleto`);
    }
  }

  cancelEdit(item: any): void {
    const originalValue = this.originalValues[item.codigoPerfil];
    Object.assign(item, originalValue);
    item.editing = false;
    this.toastr.warning(`Ação cancelada`);
  }

  async deleteItem(item: any): Promise<void> {
    Swal.fire({
      title: 'Tem certeza que deseja excluir este item?',
      showDenyButton: true,
      confirmButtonText: 'Deletar',
      denyButtonText: `Cancelar`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const index = this.Perfil.indexOf(item);
        if (index !== -1) {
          const response = await this.PerfilFormService.DeletePerfil(
            item.codigoPerfil
          );

          if (response == 200) {
            this.Perfil.splice(index, 1);
            Swal.fire('Deletado!', '', 'success');

            const session = JSON.parse(this.cookieService.get('session'));

            console.log(session);

            const horaLocal: Date = new Date();
            horaLocal.setHours(horaLocal.getHours() - 3);

            const RequestLogOp: RequestLogOp = {
              dataLogOperacao: horaLocal,
              matriculaUsuarioLogOperacao: session.matriculaUsuario,
              codigoPerfilLogOperacao: session.codigoPerfil,
              CodigoFuncaoLogOperacao: 1,
              DescricaoLogOperacao: 'UPDATE PERFIL',
              TipoQueryLogOperacao: 'D',
            };

            console.log(RequestLogOp);

            await this.logsService.LogOperacao(RequestLogOp);
          }
        }
      } else if (result.isDenied) {
        Swal.fire('Operação cancelada', '', 'info');
      }
    });
  }
}
