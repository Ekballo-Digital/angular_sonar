import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { RequestEstado } from 'src/app/models/ResquestEstado';
import { EstadoFormService } from 'src/app/services/estado-form.service';
import { RequestLogOp } from 'src/app/models/RequestLogOp';
import { LogsService } from 'src/app/services/logs.service';

@Component({
  selector: 'app-cad-estado-operacao',
  templateUrl: './cad-estado-operacao.component.html',
  styleUrls: ['./cad-estado-operacao.component.css'],
})
export class CadEstadoOperacaoComponent {
  loading: boolean = false;
  constructor(
    private title: Title,
    private EstadoFormService: EstadoFormService,
    private toastr: ToastrService,
    private cookieService: CookieService,
    private logsService: LogsService
  ) {}
  async ngOnInit(): Promise<void> {
    const novoTitulo = 'Estado';
    this.title.setTitle(novoTitulo);
  }

  async Estados(RequestEstado: RequestEstado) {
    if (!this.loading) {
      this.loading = true;

      try {
        const response = await this.EstadoFormService.InsertEstado(
          RequestEstado
        );

        console.log(response);

        if (response[0].codigoAreaEstado == 401) {
          this.toastr.error(`${response[0].descricaoEstado}`);
        } else {
          this.toastr.success(`Estado cadastrado`);

          const session = JSON.parse(this.cookieService.get('session'));

          console.log(session);

          const horaLocal: Date = new Date();
          horaLocal.setHours(horaLocal.getHours() - 3);

          const RequestLogOp: RequestLogOp = {
            dataLogOperacao: horaLocal,
            matriculaUsuarioLogOperacao: session.matriculaUsuario,
            codigoPerfilLogOperacao: session.codigoPerfil,
            CodigoFuncaoLogOperacao: 1,
            DescricaoLogOperacao: 'CADASTRO ESTADO',
            TipoQueryLogOperacao: 'I',
          };

          console.log(RequestLogOp);

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
