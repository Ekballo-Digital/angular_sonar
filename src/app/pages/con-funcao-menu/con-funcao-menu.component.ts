import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { RequestFuncaoMenu } from 'src/app/models/RequestFuncaoMenu';
import { FsistemaFormService } from 'src/app/services/fsistema-form.service';
import { FmenuFormService } from 'src/app/services/fmenu-form.service';
import { CookieService } from 'ngx-cookie-service';
import { LogsService } from 'src/app/services/logs.service';
import { RequestLogOp } from 'src/app/models/RequestLogOp';

@Component({
  selector: 'app-con-funcao-menu',
  templateUrl: './con-funcao-menu.component.html',
  styleUrls: ['./con-funcao-menu.component.css'],
})
export class ConFuncaoMenuComponent {
  loading: boolean = false;
  constructor(
    private title: Title,
    private toastr: ToastrService,
    private FmenuFormService: FmenuFormService,
    private cookieService: CookieService,
    private logsService: LogsService
  ) {}
  async ngOnInit(): Promise<void> {
    const novoTitulo = 'Funções do Menu';
    this.title.setTitle(novoTitulo);
  }

  async Fmenu(RequestFuncaoMenu: RequestFuncaoMenu) {
    if (!this.loading) {
      this.loading = true;

      try {
        const response = await this.FmenuFormService.InsertFMenu(
          RequestFuncaoMenu
        );

        console.log(response);

        if (response[0].codigoMenu == 401) {
          this.toastr.error(`Função menu já cadastrada`);
        } else {
          this.toastr.success(`Função cadastrada`);

          const session = JSON.parse(this.cookieService.get('session'));

          console.log(session);

          const horaLocal: Date = new Date();
          horaLocal.setHours(horaLocal.getHours() - 3);

          const RequestLogOp: RequestLogOp = {
            dataLogOperacao: horaLocal,
            matriculaUsuarioLogOperacao: session.matriculaUsuario,
            codigoPerfilLogOperacao: session.codigoPerfil,
            CodigoFuncaoLogOperacao: 1,
            DescricaoLogOperacao: 'CADASTRO FUNÇÃO MENU',
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
