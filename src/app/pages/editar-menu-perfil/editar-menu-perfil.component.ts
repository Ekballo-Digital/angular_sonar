import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { MenuPerfilFormService } from 'src/app/services/menu-perfil-form.service';
import { RequestMenuPerfil } from 'src/app/models/RequestMenuPerfil';
import { RequestMenu } from 'src/app/models/RequestMenu';
import { UpdateMenu } from 'src/app/models/UpdateMenu';
import { MenuFormService } from 'src/app/services/menu-form.service';
import { PerfilFormService } from 'src/app/services/perfil-form.service';
import { UpdatePerfil } from 'src/app/models/UpdatePerfil';
import { LogsService } from 'src/app/services/logs.service';
import { CookieService } from 'ngx-cookie-service';
import { RequestLogOp } from 'src/app/models/RequestLogOp';

@Component({
  selector: 'app-editar-menu-perfil',
  templateUrl: './editar-menu-perfil.component.html',
  styleUrls: ['./editar-menu-perfil.component.css'],
})
export class EditarMenuPerfilComponent {
  originalValues: any = {};
  MenuPerfil: RequestMenuPerfil[] = [];
  Perfil: UpdatePerfil[] = [];
  Menu: UpdateMenu[] = [];
  // Menu: UpdateMenu[] = [];
  // FMenu: FSistema[] = [];

  constructor(
    private title: Title,
    private toastr: ToastrService,

    private MenuPerfilFormService: MenuPerfilFormService,
    private PerfilFormService: PerfilFormService,
    private MenuFormService: MenuFormService,
    private cookieService: CookieService,
    private logsService: LogsService
  ) {}

  async ngOnInit() {
    const novoTitulo = 'Edições Funções do Menu';
    this.title.setTitle(novoTitulo);

    this.MenuPerfil = await this.MenuPerfilFormService.GetMenuPerfil();
    this.Perfil = await this.PerfilFormService.GetPerfil();
    this.Menu = await this.MenuFormService.GetMenu();
  }

  async deleteItem(item: any): Promise<void> {
    Swal.fire({
      title: 'Tem certeza que deseja excluir este item?',
      showDenyButton: true,
      confirmButtonText: 'Deletar',
      denyButtonText: `Cancelar`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const index = this.MenuPerfil.indexOf(item);
        if (index !== -1) {
          const response = await this.MenuPerfilFormService.DeleteMenuPerfil(
            item.codigoMenu,
            item.codigoPerfil
          );

          if (response == 200) {
            this.MenuPerfil.splice(index, 1);
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
              DescricaoLogOperacao: 'DELETE MENU PERFIL',
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
