import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Area } from 'src/app/models/Area';
import { AreaFormService } from 'src/app/services/area-form.service';
import Swal from 'sweetalert2';
import { RequestLogOp } from 'src/app/models/RequestLogOp';
import { CookieService } from 'ngx-cookie-service';
import { LogsService } from 'src/app/services/logs.service';

@Component({
  selector: 'app-editar-area',
  templateUrl: './editar-area.component.html',
  styleUrls: ['./editar-area.component.css'],
})
export class EditarAreaComponent {
  originalValues: any = {};
  Area: Area[] = [];

  constructor(
    private title: Title,
    private toastr: ToastrService,
    private AreaFormService: AreaFormService,
    private cookieService: CookieService,
    private logsService: LogsService
  ) {}

  async ngOnInit() {
    const novoTitulo = 'Edições Area';
    this.title.setTitle(novoTitulo);

    const response = await this.AreaFormService.GetArea();
    this.Area = response;
  }

  editItem(item: any): void {
    item.editing = true;
    this.originalValues[item.codigoArea] = {
      codigoArea: item.codigoArea,
      nomeArea: item.nomeArea,
      siglaArea: item.siglaArea,
      tipoArea: item.tipoArea,
    };
  }

  async saveItem(item: any): Promise<void> {
    item.editing = false;

    try {
      const response = await this.AreaFormService.UpdateArea({
        codigoArea: item.codigoArea,
        nomeArea: item.nomeArea,
        siglaArea: item.siglaArea,
        tipoArea: item.tipoArea,
      });

      if (response[0].siglaArea == 401) {
        this.toastr.error(`${response[0].nomeArea}`);
        const originalValue = this.originalValues[item.codigoArea];
        Object.assign(item, originalValue);
      } else {
        this.toastr.success('Area editada');

        const session = JSON.parse(this.cookieService.get('session'));

        console.log(session);

        const horaLocal: Date = new Date();
        horaLocal.setHours(horaLocal.getHours() - 3);

        const RequestLogOp: RequestLogOp = {
          dataLogOperacao: horaLocal,
          matriculaUsuarioLogOperacao: session.matriculaUsuario,
          codigoPerfilLogOperacao: session.codigoPerfil,
          CodigoFuncaoLogOperacao: 1,
          DescricaoLogOperacao: 'UPDATE AREA',
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
    const originalValue = this.originalValues[item.codigoArea];
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
        const index = this.Area.indexOf(item);
        if (index !== -1) {
          const response = await this.AreaFormService.DeleteArea(
            item.codigoArea
          );

          if (response == 200) {
            this.Area.splice(index, 1);
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
              DescricaoLogOperacao: 'DELETE AREA',
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
