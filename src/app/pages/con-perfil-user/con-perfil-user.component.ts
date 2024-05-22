import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { RequestPerfil } from 'src/app/models/RequestPerfil';
import { LogsService } from 'src/app/services/logs.service';
import { PerfilFormService } from 'src/app/services/perfil-form.service';
import { RequestLogOp } from 'src/app/models/RequestLogOp';

@Component({
  selector: 'app-con-perfil-user',
  templateUrl: './con-perfil-user.component.html',
  styleUrls: ['./con-perfil-user.component.css'],
})
export class ConPerfilUserComponent {
  loading: boolean = false;

  constructor(
    private title: Title,
    private PerfilFormService: PerfilFormService,
    private toastr: ToastrService,
    private cookieService: CookieService,
    private logsService: LogsService
  ) {}
  async ngOnInit(): Promise<void> {
    const novoTitulo = 'Perfil do Usuario';
    this.title.setTitle(novoTitulo);
  }

  async Perfil(RequestPerfil: RequestPerfil) {
    if (!this.loading) {
      this.loading = true;

      try {
        const response = await this.PerfilFormService.InsertPerfil(
          RequestPerfil
        );

        console.log(response);

        if (response[0].nomePerfil == 401) {
          this.toastr.error(`Já existe um Perfil com a mesmas Descrição.`);
        } else {
          this.toastr.success(`Perfil cadastrada`);

          const session = JSON.parse(this.cookieService.get('session'));

          console.log(session);

          const horaLocal: Date = new Date();
          horaLocal.setHours(horaLocal.getHours() - 3);

          const RequestLogOp: RequestLogOp = {
            dataLogOperacao: horaLocal,
            matriculaUsuarioLogOperacao: session.matriculaUsuario,
            codigoPerfilLogOperacao: session.codigoPerfil,
            CodigoFuncaoLogOperacao: 1,
            DescricaoLogOperacao: 'CADASTRO PERFIL',
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
