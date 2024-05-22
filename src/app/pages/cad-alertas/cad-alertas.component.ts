import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { RequestAlerta } from 'src/app/models/RequestAlerta';
import { AlertaFormService } from 'src/app/services/alerta-form.service';
import { LogsService } from 'src/app/services/logs.service';
import { RequestLogOp } from 'src/app/models/RequestLogOp';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cad-alertas',
  templateUrl: './cad-alertas.component.html',
  styleUrls: ['./cad-alertas.component.css'],
})
export class CadAlertasComponent {
  loading: boolean = false;

  constructor(
    private title: Title,
    private toastr: ToastrService,
    private alertaFormService: AlertaFormService,
    private logsService: LogsService,
    private cookieService: CookieService
  ) {}

  async ngOnInit(): Promise<void> {
    const novoTitulo = 'Alertas';
    this.title.setTitle(novoTitulo);
  }

  async Alerta(RequestAlerta: RequestAlerta) {
    if (!this.loading) {
      this.loading = true;

      try {
        const response = await this.alertaFormService.InsertAlert(
          RequestAlerta
        );

        if (response[0].nivelAlerta == 401) {
          this.toastr.error(`${response[0].descricaoAlerta}`);
        } else {
          this.toastr.success(`Alerta cadastrado`);
          const session = JSON.parse(this.cookieService.get('session'));

          console.log(session);

          const horaLocal: Date = new Date();
          horaLocal.setHours(horaLocal.getHours() - 3);

          const RequestLogOp: RequestLogOp = {
            dataLogOperacao: horaLocal,
            matriculaUsuarioLogOperacao: session.matriculaUsuario,
            codigoPerfilLogOperacao: session.codigoPerfil,
            CodigoFuncaoLogOperacao: 1,
            DescricaoLogOperacao: 'CADASTRO ALERTA',
            TipoQueryLogOperacao: 'I',
          };

          await this.logsService.LogOperacao(RequestLogOp);
        }
      } catch (error) {
        console.log(`Erro no cadastro: ` + error);
        this.toastr.error(`Formulário incompleto`);
      }
      this.loading = false;
    }
  }
}
