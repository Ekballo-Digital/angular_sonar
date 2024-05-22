import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { MenuFormService } from 'src/app/services/menu-form.service';
import { Menu } from 'src/app/models/Menu';
import { CookieService } from 'ngx-cookie-service';
import { LogsService } from 'src/app/services/logs.service';
import { RequestLogOp } from 'src/app/models/RequestLogOp';

@Component({
  selector: 'app-editar-menu',
  templateUrl: './editar-menu.component.html',
  styleUrls: ['./editar-menu.component.css'],
})
export class EditarMenuComponent {
  originalValues: any = {};
  Menu: Menu[] = [];

  constructor(
    private title: Title,
    private toastr: ToastrService,
    private MenuFormService: MenuFormService,
    private cookieService: CookieService,
    private logsService: LogsService
  ) {}

  async ngOnInit() {
    const novoTitulo = 'Edições Menu';
    this.title.setTitle(novoTitulo);

    this.Menu = await this.MenuFormService.GetMenu();
  }

  editItem(item: any): void {
    item.editing = true;
    this.originalValues[item.codigoMenu] = {
      nomeMenu: item.nomeMenu,
      urlMenu: item.urlMenu,
    };
  }

  async saveItem(item: any): Promise<void> {
    item.editing = false;

    try {
      const response = await this.MenuFormService.UpdateMenu({
        codigoMenu: item.codigoMenu,
        nomeMenu: item.nomeMenu,
        urlMenu: item.urlMenu,
      });

      if (response[0].urlMenu == 401) {
        this.toastr.error(`${response[0].nomeMenu}`);
        const originalValue = this.originalValues[item.codigoMenu];
        Object.assign(item, originalValue);
      } else {
        this.toastr.success('Menu editada');

        const session = JSON.parse(this.cookieService.get('session'));

        console.log(session);

        const horaLocal: Date = new Date();
        horaLocal.setHours(horaLocal.getHours() - 3);

        const RequestLogOp: RequestLogOp = {
          dataLogOperacao: horaLocal,
          matriculaUsuarioLogOperacao: session.matriculaUsuario,
          codigoPerfilLogOperacao: session.codigoPerfil,
          CodigoFuncaoLogOperacao: 1,
          DescricaoLogOperacao: 'UPDATE MENU',
          TipoQueryLogOperacao: 'U',
        };

        console.log(RequestLogOp);

        await this.logsService.LogOperacao(RequestLogOp);
      }
    } catch (error) {
      this.toastr.error(`Formulário incompleto`);
    }
  }

  cancelEdit(item: any): void {
    const originalValue = this.originalValues[item.codigoMenu];
    Object.assign(item, originalValue);
    item.editing = false;
    this.toastr.warning(`Ação cancelada`);
  }

  async deleteItem(item: any): Promise<void> {
    Swal.fire({
      title: 'Tem certeza que deseja excluir este item?',
      showDenyButton: true,
      confirmButtonText: 'Deletar',
      denyButtonText: `Cancelar`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const index = this.Menu.indexOf(item);
        if (index !== -1) {
          const response = await this.MenuFormService.DeleteMenu(
            item.codigoMenu
          );

          if (response == 200) {
            this.Menu.splice(index, 1);
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
              DescricaoLogOperacao: 'DELETE MENU',
              TipoQueryLogOperacao: 'U',
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
