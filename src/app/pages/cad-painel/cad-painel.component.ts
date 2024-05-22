import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ResponseArea } from 'src/app/models/ResponseArea';
import { SelectsService } from 'src/app/services/selects.service';
import { PaineisService } from 'src/app/services/paineis.service';
import { RequestPainel } from 'src/app/models/RequestPainel';
import { ToastrService } from 'ngx-toastr';
import { PainelFormService } from 'src/app/services/painel-form.service';
import { CookieService } from 'ngx-cookie-service';
import { LogsService } from 'src/app/services/logs.service';
import { RequestLogOp } from 'src/app/models/RequestLogOp';

@Component({
  selector: 'app-cad-painel',
  templateUrl: './cad-painel.component.html',
  styleUrls: ['./cad-painel.component.css'],
})
export class CadPainelComponent {
  loading: boolean = false;

  constructor(
    private title: Title,
    private PainelFormService: PainelFormService,
    private toastr: ToastrService,
    private cookieService: CookieService,
    private logsService: LogsService
  ) {}
  async ngOnInit(): Promise<void> {
    const novoTitulo = 'Painel';
    this.title.setTitle(novoTitulo);
  }

  async Painel(RequestPainel: RequestPainel) {
    if (!this.loading) {
      this.loading = true;

      try {
        const response = await this.PainelFormService.InsertPainel(
          RequestPainel
        );

        console.log(response);

        if (response[0].codigoArea == 401) {
          this.toastr.error(`${response[0].ipPainel}`);
        } else {
          this.toastr.success(`Painel cadastrada`);

          const session = JSON.parse(this.cookieService.get('session'));

          console.log(session);

          const horaLocal: Date = new Date();
          horaLocal.setHours(horaLocal.getHours() - 3);

          const RequestLogOp: RequestLogOp = {
            dataLogOperacao: horaLocal,
            matriculaUsuarioLogOperacao: session.matriculaUsuario,
            codigoPerfilLogOperacao: session.codigoPerfil,
            CodigoFuncaoLogOperacao: 1,
            DescricaoLogOperacao: 'CADASTRO PAINEL',
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
