import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ResponseAlerta2 } from 'src/app/models/ResponseAlerta2';
import { ResponseArea } from 'src/app/models/ResponseArea';
import { ResponseEstados } from 'src/app/models/ResponseEstados';
import { MatrizUp } from 'src/app/models/MatrizUp';
import { responsePropiedades } from 'src/app/models/ResponsePrioridades';
import { MatrizService } from 'src/app/services/matriz.service';
import { SelectsService } from 'src/app/services/selects.service';
import { RequestLogOp } from 'src/app/models/RequestLogOp';
import { CookieService } from 'ngx-cookie-service';
import { LogsService } from 'src/app/services/logs.service';

@Component({
  selector: 'app-editar-matriz',
  templateUrl: './editar-matriz.component.html',
  styleUrls: ['./editar-matriz.component.css'],
})
export class EditarMatrizComponent {
  originalValues: any = {};

  ResponseEstado: ResponseEstados[] = [];
  ResponseArea: ResponseArea[] = [];
  ResponseAlerta: ResponseAlerta2[] = [];
  ResponsePrioridade: responsePropiedades[] = [];

  ResponseMatriz: MatrizUp[] = [];
  ResponseMatrizPaginada: MatrizUp[] | undefined;

  currentPage: number = 1;
  pageSize: number = 10;

  constructor(
    private title: Title,
    private selectsService: SelectsService,
    private MatrizService: MatrizService,
    private toastr: ToastrService,
    private cookieService: CookieService,
    private logsService: LogsService
  ) {}

  async ngOnInit() {
    this.ResponseEstado = await this.selectsService.GetEstados();
    this.ResponseArea = await this.selectsService.GetArea();
    this.ResponseAlerta = await this.selectsService.GetAlertas2();
    this.ResponsePrioridade = await this.selectsService.GetPrioridades();

    this.loadMatriz();
  }

  async loadMatriz() {
    this.ResponseMatriz = await this.MatrizService.GetMatriz();
    this.paginateItems();
  }

  paginateItems() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(
      startIndex + this.pageSize,
      this.ResponseMatriz.length
    );
    this.ResponseMatrizPaginada = this.ResponseMatriz.slice(
      startIndex,
      endIndex
    );
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateItems();
    }
  }

  nextPage() {
    const totalPages = Math.ceil(this.ResponseMatriz.length / this.pageSize);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.paginateItems();
    }
  }

  editItem(item: MatrizUp): void {
    item.editing = true;
    this.originalValues = { ...item };
  }

  async saveItem(item: MatrizUp): Promise<void> {
    try {
      await this.MatrizService.UpdateMatriz({
        codigoEstado: Number(this.originalValues.codigoEstado),
        codigoArea: Number(this.originalValues.codigoArea),
        codigoAlerta: Number(this.originalValues.codigoAlerta),
        codigoPrioridade: Number(this.originalValues.codigoPrioridade),
        codigoEstadoNovo: Number(item.codigoEstado),
        codigoAreaNovo: Number(item.codigoArea),
        codigoAlertaNovo: Number(item.codigoAlerta),
        codigoPrioridadeNovo: Number(item.codigoPrioridade),
      });

      this.toastr.success('Matriz editada');

      const session = JSON.parse(this.cookieService.get('session'));

      console.log(session);

      const horaLocal: Date = new Date();
      horaLocal.setHours(horaLocal.getHours() - 3);

      const RequestLogOp: RequestLogOp = {
        dataLogOperacao: horaLocal,
        matriculaUsuarioLogOperacao: session.matriculaUsuario,
        codigoPerfilLogOperacao: session.codigoPerfil,
        CodigoFuncaoLogOperacao: 1,
        DescricaoLogOperacao: 'UPDATE MATRIZ',
        TipoQueryLogOperacao: 'U',
      };

      console.log(RequestLogOp);

      await this.logsService.LogOperacao(RequestLogOp);

      item.editing = false;
      window.location.reload();
    } catch (error) {
      this.toastr.error(`Formulário incompleto`);
    }
  }

  cancelEdit(item: MatrizUp): void {
    Object.assign(item, this.originalValues);
    item.editing = false;
    this.toastr.warning(`Ação cancelada`);
  }

  async deleteItem(item: MatrizUp): Promise<void> {
    Swal.fire({
      title: 'Tem certeza que deseja excluir este item?',
      showDenyButton: true,
      confirmButtonText: 'Deletar',
      denyButtonText: `Cancelar`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const index = this.ResponseMatriz.findIndex(
          (matriz) =>
            matriz.codigoEstado === item.codigoEstado &&
            matriz.codigoArea === item.codigoArea &&
            matriz.codigoAlerta === item.codigoAlerta &&
            matriz.codigoPrioridade === item.codigoPrioridade
        );

        if (index !== -1) {
          const response = await this.MatrizService.DeleteMatriz(
            item.codigoEstado,
            item.codigoArea,
            item.codigoAlerta,
            item.codigoPrioridade
          );

          if (response == 200) {
            this.ResponseMatriz.splice(index, 1);
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
              DescricaoLogOperacao: 'DELETE MATRIZ',
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

  getEstadoNome(codigoEstado: number): string {
    //this.ResponseEstado = await this.selectsService.GetEstados();

    const estado = this.ResponseEstado.find(
      (est) => est.codigoEstado === codigoEstado
    );
    return estado ? estado.descricaoEstado : '';
  }

  getAreaNome(codigoArea: number): string {
    const area = this.ResponseArea.find((a) => a.codigoArea === codigoArea);
    return area ? area.nomeArea : '';
  }

  getAlertaNome(codigoAlerta: number): any {
    const alerta = this.ResponseAlerta.find(
      (al) => al.codigoAlerta === codigoAlerta
    );
    return alerta ? alerta.alertaNivel : '';
  }

  getPrioridadeNome(codigoPrioridade: number): string {
    const prioridade = this.ResponsePrioridade.find(
      (pr) => pr.codigoPrioridade === codigoPrioridade
    );
    return prioridade ? prioridade.nomePrioridade : '';
  }
}
