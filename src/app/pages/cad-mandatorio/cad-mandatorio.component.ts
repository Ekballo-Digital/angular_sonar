import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { RequestPrio } from 'src/app/models/RequestPrio';
import { LogsService } from 'src/app/services/logs.service';
import { RequestLogOp } from 'src/app/models/RequestLogOp';
import { PrioridadeFormService } from 'src/app/services/prioridade-form.service';

@Component({
  selector: 'app-cad-mandatorio',
  templateUrl: './cad-mandatorio.component.html',
  styleUrls: ['./cad-mandatorio.component.css'],
})
export class CadMandatorioComponent {
  loading: boolean = false;
  constructor(
    private title: Title,
    private toastr: ToastrService,
    private PrioridadeFormService: PrioridadeFormService,
    private cookieService: CookieService,
    private logsService: LogsService
  ) {}
  async ngOnInit(): Promise<void> {
    const novoTitulo = 'Mandatório';
    this.title.setTitle(novoTitulo);
  }

  async Prio(RequestPrio: RequestPrio) {
    if (!this.loading) {
      this.loading = true;

      try {
        const response = await this.PrioridadeFormService.InsertPrio(
          RequestPrio
        );

        console.log(response);

        if (response[0].codigoPrioridade == 401) {
          this.toastr.error(`${response[0].nomePrioridade}`);
        } else {
          this.toastr.success(`Prioridade cadastrado`);

          const session = JSON.parse(this.cookieService.get('session'));

          console.log(session);

          const horaLocal: Date = new Date();
          horaLocal.setHours(horaLocal.getHours() - 3);

          const RequestLogOp: RequestLogOp = {
            dataLogOperacao: horaLocal,
            matriculaUsuarioLogOperacao: session.matriculaUsuario,
            codigoPerfilLogOperacao: session.codigoPerfil,
            CodigoFuncaoLogOperacao: 1,
            DescricaoLogOperacao: 'CADASTRO PRIORIDADE',
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
