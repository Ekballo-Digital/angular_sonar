import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { RequestFSistema } from 'src/app/models/RequestFSistema';
import { FsistemaFormService } from 'src/app/services/fsistema-form.service';
import { LogsService } from 'src/app/services/logs.service';
import { RequestLogOp } from 'src/app/models/RequestLogOp';

@Component({
  selector: 'app-con-funcao-sistema',
  templateUrl: './con-funcao-sistema.component.html',
  styleUrls: ['./con-funcao-sistema.component.css'],
})
export class ConFuncaoSistemaComponent {
  loading: boolean = false;
  constructor(
    private title: Title,
    private FsistemaFormService: FsistemaFormService,
    private toastr: ToastrService,
    private cookieService: CookieService,
    private logsService: LogsService
  ) {}
  async ngOnInit(): Promise<void> {
    const novoTitulo = 'Função do Sistema';
    this.title.setTitle(novoTitulo);
  }

  async FSistema(RequestFSistema: RequestFSistema) {
    if (!this.loading) {
      this.loading = true;

      try {
        const response = await this.FsistemaFormService.InsertFSistema(
          RequestFSistema
        );

        console.log(response);

        if (response[0].urlFuncao == 401) {
          this.toastr.error(`${response[0].descricaoFuncao}`);
        } else {
          this.toastr.success(`Função Sistema cadastrada`);

          const session = JSON.parse(this.cookieService.get('session'));

          console.log(session);

          const horaLocal: Date = new Date();
          horaLocal.setHours(horaLocal.getHours() - 3);

          const RequestLogOp: RequestLogOp = {
            dataLogOperacao: horaLocal,
            matriculaUsuarioLogOperacao: session.matriculaUsuario,
            codigoPerfilLogOperacao: session.codigoPerfil,
            CodigoFuncaoLogOperacao: 1,
            DescricaoLogOperacao: 'CADASTRO FUNÇÃO SISTEMA',
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
