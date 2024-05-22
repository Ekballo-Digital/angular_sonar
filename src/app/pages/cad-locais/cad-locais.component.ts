import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { RequestArea } from 'src/app/models/RequestArea';
import { AreaFormService } from 'src/app/services/area-form.service';
import { LogsService } from 'src/app/services/logs.service';
import { RequestLogOp } from 'src/app/models/RequestLogOp';

@Component({
  selector: 'app-cad-locais',
  templateUrl: './cad-locais.component.html',
  styleUrls: ['./cad-locais.component.css'],
})
export class CadLocaisComponent {
  loading: boolean = false;

  constructor(
    private title: Title,
    private AreaFormService: AreaFormService,
    private toastr: ToastrService,
    private cookieService: CookieService,
    private logsService: LogsService
  ) {}
  async ngOnInit(): Promise<void> {
    const novoTitulo = 'Locais';
    this.title.setTitle(novoTitulo);
  }

  async Local(RequestArea: RequestArea) {
    if (!this.loading) {
      this.loading = true;

      try {
        const response = await this.AreaFormService.InsertArea(RequestArea);

        console.log(response);

        if (response[0].siglaArea == 401) {
          this.toastr.error(`${response[0].nomeArea}`);
        } else {
          this.toastr.success(`Area cadastrada`);

          const session = JSON.parse(this.cookieService.get('session'));

          console.log(session);

          const horaLocal: Date = new Date();
          horaLocal.setHours(horaLocal.getHours() - 3);

          const RequestLogOp: RequestLogOp = {
            dataLogOperacao: horaLocal,
            matriculaUsuarioLogOperacao: session.matriculaUsuario,
            codigoPerfilLogOperacao: session.codigoPerfil,
            CodigoFuncaoLogOperacao: 1,
            DescricaoLogOperacao: 'CADASTRO LOCAIS',
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
