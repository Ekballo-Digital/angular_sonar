import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { FsistemaFormService } from 'src/app/services/fsistema-form.service';
import { MenuFormService } from 'src/app/services/menu-form.service';
import { FmenuFormService } from 'src/app/services/fmenu-form.service';
import { RequestFuncaoMenu } from 'src/app/models/RequestFuncaoMenu';
import { UpdateMenu } from 'src/app/models/UpdateMenu';
import { FSistema } from 'src/app/models/FSistema';
import { CookieService } from 'ngx-cookie-service';
import { LogsService } from 'src/app/services/logs.service';
import { RequestLogOp } from 'src/app/models/RequestLogOp';

@Component({
  selector: 'app-editar-fmenu',
  templateUrl: './editar-fmenu.component.html',
  styleUrls: ['./editar-fmenu.component.css'],
})
export class EditarFmenuComponent {
  originalValues: any = {};
  FuncaoMenu: RequestFuncaoMenu[] = [];
  Menu: UpdateMenu[] = [];
  FMenu: FSistema[] = [];

  constructor(
    private title: Title,
    private toastr: ToastrService,
    private MenuFormService: MenuFormService,
    private FsistemaFormService: FsistemaFormService,
    private FmenuFormService: FmenuFormService,
    private cookieService: CookieService,
    private logsService: LogsService
  ) {}

  async ngOnInit() {
    const novoTitulo = 'Edições Funções do Menu';
    this.title.setTitle(novoTitulo);

    this.Menu = await this.MenuFormService.GetMenu();
    this.FMenu = await this.FsistemaFormService.GetFSistema();
    this.FuncaoMenu = await this.FmenuFormService.GetFMenu();

    console.log(this.FuncaoMenu);
  }

  async deleteItem(item: any): Promise<void> {
    Swal.fire({
      title: 'Tem certeza que deseja excluir este item?',
      showDenyButton: true,
      confirmButtonText: 'Deletar',
      denyButtonText: `Cancelar`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const index = this.FuncaoMenu.indexOf(item);
        if (index !== -1) {
          const response = await this.FmenuFormService.DeleteFMenu(
            item.codigoMenu,
            item.codigoFuncao
          );

          if (response == 200) {
            this.FuncaoMenu.splice(index, 1);
            Swal.fire('Deletado!', '', 'success');

            const session = JSON.parse(this.cookieService.get('session'));

            console.log(session);

            const horaLocal: Date = new Date();
            horaLocal.setHours(horaLocal.getHours() - 3);

            const RequestLogOp: RequestLogOp = {
              dataLogOperacao: horaLocal,
              matriculaUsuarioLogOperacao: session.matriculaUsuario,
              codigoPerfilLogOperacao: session.codigoPerfil,
              CodigoFuncaoLogOperacao: 1,
              DescricaoLogOperacao: 'DELETE FUNÇÃO MENU',
              TipoQueryLogOperacao: 'D',
            };

            console.log(RequestLogOp);

            await this.logsService.LogOperacao(RequestLogOp);
          }
        }
      } else if (result.isDenied) {
        Swal.fire('Operação cancelada', '', 'info');
      }
    });
  }
}
