import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Prioridade } from 'src/app/models/Prioridade';
import { PrioridadeFormService } from 'src/app/services/prioridade-form.service';
import { LogsService } from 'src/app/services/logs.service';
import { CookieService } from 'ngx-cookie-service';
import { RequestLogOp } from 'src/app/models/RequestLogOp';

@Component({
  selector: 'app-editar-prioridade',
  templateUrl: './editar-prioridade.component.html',
  styleUrls: ['./editar-prioridade.component.css'],
})
export class EditarPrioridadeComponent {
  originalValues: any = {};
  Prioridade: Prioridade[] = [];

  constructor(
    private title: Title,
    private toastr: ToastrService,
    private PrioridadeFormService: PrioridadeFormService,
    private cookieService: CookieService,
    private logsService: LogsService
  ) {}

  async ngOnInit() {
    const novoTitulo = 'Edições Prioridade';
    this.title.setTitle(novoTitulo);

    const response = await this.PrioridadeFormService.GetPrio();
    this.Prioridade = response;
  }

  editItem(item: any): void {
    item.editing = true;
    this.originalValues[item.codigoPrioridade] = {
      codigoPrioridade: item.codigoPrioridade,
      nomePrioridade: item.nomePrioridade,
    };
  }

  async saveItem(item: any): Promise<void> {
    item.editing = false;

    try {
      const response = await this.PrioridadeFormService.UpdatePrio({
        codigoPrioridade: item.codigoPrioridade,
        nomePrioridade: item.nomePrioridade,
      });

      if (response[0].codigoPrioridade == 401) {
        this.toastr.error(`${response[0].nomePrioridade}`);
        const originalValue = this.originalValues[item.codigoPrioridade];
        Object.assign(item, originalValue);
      } else {
        this.toastr.success('Prioridade editado');

        const session = JSON.parse(this.cookieService.get('session'));

        console.log(session);

        const horaLocal: Date = new Date();
        horaLocal.setHours(horaLocal.getHours() - 3);

        const RequestLogOp: RequestLogOp = {
          dataLogOperacao: horaLocal,
          matriculaUsuarioLogOperacao: session.matriculaUsuario,
          codigoPerfilLogOperacao: session.codigoPerfil,
          CodigoFuncaoLogOperacao: 1,
          DescricaoLogOperacao: 'UPDATE PRIORIDADE',
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
    const originalValue = this.originalValues[item.codigoPrioridade];
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
        const index = this.Prioridade.indexOf(item);
        if (index !== -1) {
          const response = await this.PrioridadeFormService.DeletePrio(
            item.codigoPrioridade
          );

          if (response == 200) {
            this.Prioridade.splice(index, 1);
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
              DescricaoLogOperacao: 'DELETE PRIORIDADE',
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
