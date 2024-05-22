import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Estado } from 'src/app/models/Estado';
import { EstadoFormService } from 'src/app/services/estado-form.service';
import Swal from 'sweetalert2';
import { SelectsService } from 'src/app/services/selects.service';
import { ResponseArea } from 'src/app/models/ResponseArea';
import { CookieService } from 'ngx-cookie-service';
import { LogsService } from 'src/app/services/logs.service';
import { RequestLogOp } from 'src/app/models/RequestLogOp';

@Component({
  selector: 'app-editar-estado',
  templateUrl: './editar-estado.component.html',
  styleUrls: ['./editar-estado.component.css'],
})
export class EditarEstadoComponent {
  originalValues: any = {};
  Estado: Estado[] = [];
  Area: ResponseArea[] = [];

  constructor(
    private title: Title,
    private toastr: ToastrService,
    private EstadoFormService: EstadoFormService,
    private SelectsService: SelectsService,
    private cookieService: CookieService,
    private logsService: LogsService
  ) {}

  async ngOnInit() {
    const novoTitulo = 'Edições Area';
    this.title.setTitle(novoTitulo);

    const response = await this.EstadoFormService.GetEstado();
    this.Estado = response;

    const responseArea = await this.SelectsService.GetArea();
    this.Area = responseArea;
  }

  editItem(item: any): void {
    item.editing = true;
    this.originalValues[item.codigoEstado] = {
      codigoEstado: item.codigoEstado,
      descricaoEstado: item.descricaoEstado,
      codigoAreaEstado: item.codigoAreaEstado,
      tipoEstado: item.tipoEstado,
    };
  }

  async saveItem(item: any): Promise<void> {
    item.editing = false;

    try {
      const response = await this.EstadoFormService.UpdateEstado({
        codigoEstado: item.codigoEstado,
        descricaoEstado: item.descricaoEstado,
        codigoAreaEstado: item.codigoAreaEstado,
        tipoEstado: item.tipoEstado,
      });

      if (response[0].codigoAreaEstado == 401) {
        this.toastr.error(`${response[0].descricaoEstado}`);
        const originalValue = this.originalValues[item.codigoEstado];
        Object.assign(item, originalValue);
      } else {
        this.toastr.success('Estado editada');

        const session = JSON.parse(this.cookieService.get('session'));

        console.log(session);

        const horaLocal: Date = new Date();
        horaLocal.setHours(horaLocal.getHours() - 3);

        const RequestLogOp: RequestLogOp = {
          dataLogOperacao: horaLocal,
          matriculaUsuarioLogOperacao: session.matriculaUsuario,
          codigoPerfilLogOperacao: session.codigoPerfil,
          CodigoFuncaoLogOperacao: 1,
          DescricaoLogOperacao: 'UPDATE ESTADO',
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
    const originalValue = this.originalValues[item.codigoEstado];
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
        const index = this.Estado.indexOf(item);
        if (index !== -1) {
          const response = await this.EstadoFormService.DeleteEstado(
            item.codigoEstado
          );

          if (response == 200) {
            this.Estado.splice(index, 1);
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
              DescricaoLogOperacao: 'DELETE ESTADO',
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
