import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { FSistema } from 'src/app/models/FSistema';
import Swal from 'sweetalert2';
import { FsistemaFormService } from 'src/app/services/fsistema-form.service';
import { LogsService } from 'src/app/services/logs.service';
import { CookieService } from 'ngx-cookie-service';
import { RequestLogOp } from 'src/app/models/RequestLogOp';

@Component({
  selector: 'app-editar-fsistema',
  templateUrl: './editar-fsistema.component.html',
  styleUrls: ['./editar-fsistema.component.css'],
})
export class EditarFsistemaComponent {
  originalValues: any = {};
  FSistema: FSistema[] = [];

  constructor(
    private title: Title,
    private toastr: ToastrService,
    private FsistemaFormService: FsistemaFormService,
    private cookieService: CookieService,
    private logsService: LogsService
  ) {}

  async ngOnInit() {
    const novoTitulo = 'Edições Painel';
    this.title.setTitle(novoTitulo);

    const response = await this.FsistemaFormService.GetFSistema();
    this.FSistema = response;
  }

  editItem(item: any): void {
    item.editing = true;
    this.originalValues[item.codigoFuncao] = {
      descricaoFuncao: item.descricaoFuncao,
      urlFuncao: item.urlFuncao,
      iconSvg: item.iconSvg,
    };
  }

  async saveItem(item: any): Promise<void> {
    item.editing = false;

    try {
      const response = await this.FsistemaFormService.UpdateFSistema({
        codigoFuncao: item.codigoFuncao,
        descricaoFuncao: item.descricaoFuncao,
        urlFuncao: item.urlFuncao,
        iconSvg: item.iconSvg,
      });

      if (response[0].urlFuncao == 401) {
        this.toastr.error(`Já existe um Perfil com a mesmas Descrição.`);
        const originalValue = this.originalValues[item.descricaoFuncao];
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
    const originalValue = this.originalValues[item.codigoFuncao];
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
        const index = this.FSistema.indexOf(item);
        if (index !== -1) {
          const response = await this.FsistemaFormService.DeleteFSistema(
            item.codigoFuncao
          );

          if (response == 200) {
            this.FSistema.splice(index, 1);
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
              DescricaoLogOperacao: 'DELETE PERFIL',
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
