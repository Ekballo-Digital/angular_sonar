import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { SelectsService } from 'src/app/services/selects.service';
import { PainelFormService } from 'src/app/services/painel-form.service';
import { ResponseArea } from 'src/app/models/ResponseArea';
import { Painel } from 'src/app/models/Painel';
import { LogsService } from 'src/app/services/logs.service';
import { CookieService } from 'ngx-cookie-service';
import { RequestLogOp } from 'src/app/models/RequestLogOp';

@Component({
  selector: 'app-editar-painel',
  templateUrl: './editar-painel.component.html',
  styleUrls: ['./editar-painel.component.css'],
})
export class EditarPainelComponent {
  originalValues: any = {};
  Painel: Painel[] = [];
  Area: ResponseArea[] = [];

  constructor(
    private title: Title,
    private toastr: ToastrService,
    private PainelFormService: PainelFormService,
    private SelectsService: SelectsService,
    private cookieService: CookieService,
    private logsService: LogsService
  ) {}

  async ngOnInit() {
    const novoTitulo = 'Edições Painel';
    this.title.setTitle(novoTitulo);

    const response = await this.PainelFormService.GetPainel();
    this.Painel = response;

    const responseArea = await this.SelectsService.GetArea();
    this.Area = responseArea;
  }

  editItem(item: any): void {
    item.editing = true;
    this.originalValues[item.codigoPainel] = {
      ipPainel: item.ipPainel,
      codigoArea: item.codigoArea,
      portaPainel: item.portaPainel,
      statusPainel: item.statusPainel,
    };
  }

  async saveItem(item: any): Promise<void> {
    item.editing = false;

    try {
      const response = await this.PainelFormService.UpdatePainel({
        codigoPainel: item.codigoPainel,
        ipPainel: item.ipPainel,
        codigoArea: item.codigoArea,
        portaPainel: item.portaPainel,
        statusPainel: item.statusPainel,
      });

      if (response[0].codigoArea == 401) {
        this.toastr.error(`${response[0].ipPainel}`);
        const originalValue = this.originalValues[item.codigoPainel];
        Object.assign(item, originalValue);
      } else {
        this.toastr.success('Painel editada');

        const session = JSON.parse(this.cookieService.get('session'));

        console.log(session);

        const horaLocal: Date = new Date();
        horaLocal.setHours(horaLocal.getHours() - 3);

        const RequestLogOp: RequestLogOp = {
          dataLogOperacao: horaLocal,
          matriculaUsuarioLogOperacao: session.matriculaUsuario,
          codigoPerfilLogOperacao: session.codigoPerfil,
          CodigoFuncaoLogOperacao: 1,
          DescricaoLogOperacao: 'UPDATE PAINEL',
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
    const originalValue = this.originalValues[item.codigoPainel];
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
        const index = this.Painel.indexOf(item);
        if (index !== -1) {
          const response = await this.PainelFormService.DeletePainel(
            item.codigoPainel
          );

          if (response == 200) {
            this.Painel.splice(index, 1);
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
              DescricaoLogOperacao: 'DELETE PAINEL',
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
