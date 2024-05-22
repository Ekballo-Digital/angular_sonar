import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { ResponseMenu } from 'src/app/models/ResponseMenu';
import { ResponsePerfil } from 'src/app/models/ResponsePerfil';
import { SelectsService } from 'src/app/services/selects.service';
import { MenuPerfilFormService } from 'src/app/services/menu-perfil-form.service';
import { RequestMenuPerfil } from 'src/app/models/RequestMenuPerfil';
import { CookieService } from 'ngx-cookie-service';
import { LogsService } from 'src/app/services/logs.service';
import { RequestLogOp } from 'src/app/models/RequestLogOp';

@Component({
  selector: 'app-con-menu-perfil',
  templateUrl: './con-menu-perfil.component.html',
  styleUrls: ['./con-menu-perfil.component.css'],
})
export class ConMenuPerfilComponent {
  ResponsePerfil: ResponsePerfil[] = [];
  ResponseMenu: ResponseMenu[] = [];
  loading: boolean = false;

  constructor(
    private title: Title,
    private selectsService: SelectsService,
    private toastr: ToastrService,
    private MenuPerfilFormService: MenuPerfilFormService,
    private cookieService: CookieService,
    private logsService: LogsService
  ) {}
  async ngOnInit(): Promise<void> {
    const novoTitulo = 'Menus do Perfil';
    this.title.setTitle(novoTitulo);

    try {
      this.ResponsePerfil = await this.selectsService.GetPerfil();
      this.ResponseMenu = await this.selectsService.GetMenu();
    } catch (error) {
      console.error(error);
    }
  }

  async MenuPerfil(RequestMenuPerfil: RequestMenuPerfil) {
    console.log(RequestMenuPerfil);

    if (!this.loading) {
      this.loading = true;

      try {
        const response = await this.MenuPerfilFormService.InsertMenuPerfil(
          RequestMenuPerfil
        );

        console.log(response);

        if (response[0].codigoPerfil == 401) {
          this.toastr.error(`Já existe um Menu perfil com a mesmas Descrição.`);
        } else {
          this.toastr.success(`Menu perfil cadastrada`);

          const session = JSON.parse(this.cookieService.get('session'));

          console.log(session);

          const horaLocal: Date = new Date();
          horaLocal.setHours(horaLocal.getHours() - 3);

          const RequestLogOp: RequestLogOp = {
            dataLogOperacao: horaLocal,
            matriculaUsuarioLogOperacao: session.matriculaUsuario,
            codigoPerfilLogOperacao: session.codigoPerfil,
            CodigoFuncaoLogOperacao: 1,
            DescricaoLogOperacao: 'CADASTRO MENU PERFIL',
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
