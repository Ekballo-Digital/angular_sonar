import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Alertas } from 'src/app/models/Alertas';
import { ResponseCor } from 'src/app/models/ResponseCor';
import { EditaveisService } from 'src/app/services/editaveis.service';
import { SelectsService } from 'src/app/services/selects.service';
import { AlertaFormService } from 'src/app/services/alerta-form.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';
import { LogsService } from 'src/app/services/logs.service';
import { RequestLogOp } from 'src/app/models/RequestLogOp';

@Component({
  selector: 'app-editaveis',
  templateUrl: './editaveis.component.html',
  styleUrls: ['./editaveis.component.css'],
})
export class EditaveisComponent {
  currentUrl?: string;
  originalValues: any = {};
  Alertas: Alertas[] = [];
  ResponseCor: ResponseCor[] = [];

  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private editaveisService: EditaveisService,
    private selectsService: SelectsService,
    private alertaFormService: AlertaFormService,
    private toastr: ToastrService,
    private cookieService: CookieService,
    private logsService: LogsService
  ) {}

  async ngOnInit() {
    const novoTitulo = 'Edições Alerta';
    this.title.setTitle(novoTitulo);

    this.currentUrl =
      this.route.snapshot.url[this.route.snapshot.url.length - 1].path;

    const responseCor = await this.selectsService.GetCor();
    this.ResponseCor = responseCor;

    const response = await this.editaveisService.GetAlertas();
    this.Alertas = response;
  }

  editItem(item: any): void {
    item.editing = true;
    this.originalValues[item.codigoAlerta] = {
      codigoAlerta: item.codigoAlerta,
      descricaoAlerta: item.descricaoAlerta,
      nivelAlerta: item.nivelAlerta,
      codigoCor: item.codigoCor,
    };
  }

  async saveItem(item: any): Promise<void> {
    item.editing = false;

    try {
      const response = await this.alertaFormService.UpdateAlert({
        codigoAlerta: item.codigoAlerta,
        descricaoAlerta: item.descricaoAlerta,
        nivelAlerta: item.nivelAlerta,
        codigoCor: item.codigoCor,
      });

      if (response[0].nivelAlerta == 401) {
        this.toastr.error(`${response[0].descricaoAlerta}`);
        const originalValue = this.originalValues[item.codigoAlerta];
        Object.assign(item, originalValue);
      } else {
        this.toastr.success('Alerta editado');

        const session = JSON.parse(this.cookieService.get('session'));

        console.log(session);

        const horaLocal: Date = new Date();
        horaLocal.setHours(horaLocal.getHours() - 3);

        const RequestLogOp: RequestLogOp = {
          dataLogOperacao: horaLocal,
          matriculaUsuarioLogOperacao: session.matriculaUsuario,
          codigoPerfilLogOperacao: session.codigoPerfil,
          CodigoFuncaoLogOperacao: 1,
          DescricaoLogOperacao: 'UPDATE ALERTA',
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
    const originalValue = this.originalValues[item.codigoAlerta];
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
        const index = this.Alertas.indexOf(item);
        if (index !== -1) {
          const response = await this.alertaFormService.DeleteAlert(
            item.codigoAlerta
          );

          if (response == 200) {
            this.Alertas.splice(index, 1);
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
              DescricaoLogOperacao: 'DELETE ALERTA',
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
