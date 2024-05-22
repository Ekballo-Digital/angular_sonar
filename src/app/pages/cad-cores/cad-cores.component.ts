import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { RequestCor } from 'src/app/models/RequestCor';
import { CorFormService } from 'src/app/services/cor-form.service';
import { RequestLogOp } from 'src/app/models/RequestLogOp';
import { LogsService } from 'src/app/services/logs.service';

@Component({
  selector: 'app-cad-cores',
  templateUrl: './cad-cores.component.html',
  styleUrls: ['./cad-cores.component.css'],
})
export class CadCoresComponent {
  loading: boolean = false;

  constructor(
    private title: Title,
    private toastr: ToastrService,
    private CorFormService: CorFormService,
    private cookieService: CookieService,
    private logsService: LogsService
  ) {}
  async ngOnInit(): Promise<void> {
    const novoTitulo = 'Cores';
    this.title.setTitle(novoTitulo);
  }

  async Cor(RequestCor: RequestCor) {
    if (!this.loading) {
      this.loading = true;

      try {
        const response = await this.CorFormService.InsertCor(RequestCor);

        console.log(response);

        if (response[0].hexaCor == 401) {
          this.toastr.error(`${response[0].descricaoCor}`);
        } else {
          this.toastr.success(`Cor cadastrado`);

          const session = JSON.parse(this.cookieService.get('session'));

          console.log(session);

          const horaLocal: Date = new Date();
          horaLocal.setHours(horaLocal.getHours() - 3);

          const RequestLogOp: RequestLogOp = {
            dataLogOperacao: horaLocal,
            matriculaUsuarioLogOperacao: session.matriculaUsuario,
            codigoPerfilLogOperacao: session.codigoPerfil,
            CodigoFuncaoLogOperacao: 1,
            DescricaoLogOperacao: 'CADASTRO CORES',
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
