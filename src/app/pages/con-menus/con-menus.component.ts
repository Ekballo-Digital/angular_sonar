import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { RequestMenu } from 'src/app/models/RequestMenu';
import { LogsService } from 'src/app/services/logs.service';
import { MenuFormService } from 'src/app/services/menu-form.service';
import { RequestLogOp } from 'src/app/models/RequestLogOp';

@Component({
  selector: 'app-con-menus',
  templateUrl: './con-menus.component.html',
  styleUrls: ['./con-menus.component.css'],
})
export class ConMenusComponent {
  loading: boolean = false;

  constructor(
    private title: Title,
    private toastr: ToastrService,
    private MenuFormService: MenuFormService,
    private cookieService: CookieService,
    private logsService: LogsService
  ) {}
  async ngOnInit(): Promise<void> {
    const novoTitulo = 'Menus';
    this.title.setTitle(novoTitulo);
  }

  async Menu(RequestMenu: RequestMenu) {
    if (!this.loading) {
      this.loading = true;

      try {
        const response = await this.MenuFormService.InsertMenu(RequestMenu);

        console.log(response);

        if (response[0].urlMenu == 401) {
          this.toastr.error(`${response[0].nomeMenu}`);
        } else {
          this.toastr.success(`Menu cadastrado`);

          const session = JSON.parse(this.cookieService.get('session'));

          console.log(session);

          const horaLocal: Date = new Date();
          horaLocal.setHours(horaLocal.getHours() - 3);

          const RequestLogOp: RequestLogOp = {
            dataLogOperacao: horaLocal,
            matriculaUsuarioLogOperacao: session.matriculaUsuario,
            codigoPerfilLogOperacao: session.codigoPerfil,
            CodigoFuncaoLogOperacao: 1,
            DescricaoLogOperacao: 'CADASTRO MENU',
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
