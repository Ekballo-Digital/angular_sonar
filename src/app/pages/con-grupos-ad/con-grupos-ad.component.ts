import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { RequestGrupo } from 'src/app/models/RequestGrupo';
import { ResponseArea } from 'src/app/models/ResponseArea';
import { ResponsePerfil } from 'src/app/models/ResponsePerfil';
import { SelectsService } from 'src/app/services/selects.service';
import { GrupoadFormService } from 'src/app/services/grupoad-form.service';
import { CookieService } from 'ngx-cookie-service';
import { LogsService } from 'src/app/services/logs.service';
import { RequestLogOp } from 'src/app/models/RequestLogOp';

@Component({
  selector: 'app-con-grupos-ad',
  templateUrl: './con-grupos-ad.component.html',
  styleUrls: ['./con-grupos-ad.component.css'],
})
export class ConGruposAdComponent {
  loading: boolean = false;

  constructor(
    private title: Title,
    private selectsService: SelectsService,
    private toastr: ToastrService,
    private GrupoadFormService: GrupoadFormService,
    private cookieService: CookieService,
    private logsService: LogsService
  ) {}
  async ngOnInit(): Promise<void> {
    const novoTitulo = 'Grupos Active Directory';
    this.title.setTitle(novoTitulo);
  }

  async GrupoAd(RequestGrupo: RequestGrupo) {
    if (!this.loading) {
      this.loading = true;

      try {
        const response = await this.GrupoadFormService.InsertGrupoAd(
          RequestGrupo
        );

        console.log(response);

        if (response[0].codigoPerfil == 401) {
          this.toastr.error(`${response[0].nomeGrupoAd}`);
        } else {
          this.toastr.success(`Grupo cadastrado`);

          const session = JSON.parse(this.cookieService.get('session'));

          console.log(session);

          const horaLocal: Date = new Date();
          horaLocal.setHours(horaLocal.getHours() - 3);

          const RequestLogOp: RequestLogOp = {
            dataLogOperacao: horaLocal,
            matriculaUsuarioLogOperacao: session.matriculaUsuario,
            codigoPerfilLogOperacao: session.codigoPerfil,
            CodigoFuncaoLogOperacao: 1,
            DescricaoLogOperacao: 'CADASTRO GRUPO AD',
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
