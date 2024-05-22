import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { GrupoAd } from 'src/app/models/GrupoAd';
import { Painel } from 'src/app/models/Painel';
import { ResponseArea } from 'src/app/models/ResponseArea';
import { ResponsePerfil } from 'src/app/models/ResponsePerfil';
import { GrupoadFormService } from 'src/app/services/grupoad-form.service';
import { LogsService } from 'src/app/services/logs.service';
import { SelectsService } from 'src/app/services/selects.service';
import Swal from 'sweetalert2';
import { RequestLogOp } from 'src/app/models/RequestLogOp';

@Component({
  selector: 'app-editar-grupoad',
  templateUrl: './editar-grupoad.component.html',
  styleUrls: ['./editar-grupoad.component.css'],
})
export class EditarGrupoadComponent {
  originalValues: any = {};
  GrupoAd: GrupoAd[] = [];
  Area: ResponseArea[] = [];
  Perfil: ResponsePerfil[] = [];

  constructor(
    private title: Title,
    private toastr: ToastrService,
    private GrupoadFormService: GrupoadFormService,
    private SelectsService: SelectsService,
    private cookieService: CookieService,
    private logsService: LogsService
  ) {}

  async ngOnInit() {
    const novoTitulo = 'Edições Grupo Ad';
    this.title.setTitle(novoTitulo);

    this.GrupoAd = await this.GrupoadFormService.GetGrupoAd();

    this.Area = await this.SelectsService.GetArea();

    this.Perfil = await this.SelectsService.GetPerfil();
  }

  editItem(item: any): void {
    item.editing = true;
    this.originalValues[item.codigoGrupoAd] = {
      nomeGrupoAd: item.nomeGrupoAd,
      codigoPerfil: item.codigoPerfil,
      codigoAreaGrupoAd: item.codigoAreaGrupoAd,
    };
  }

  async saveItem(item: any): Promise<void> {
    item.editing = false;

    try {
      const response = await this.GrupoadFormService.UpdateGrupoAd({
        codigoGrupoAd: item.codigoGrupoAd,
        nomeGrupoAd: item.nomeGrupoAd,
        codigoPerfil: item.codigoPerfil,
        codigoAreaGrupoAd: item.codigoAreaGrupoAd,
      });

      if (response[0].codigoPerfil == 401) {
        this.toastr.error(`${response[0].nomeGrupoAd}`);
        const originalValue = this.originalValues[item.codigoGrupoAd];
        Object.assign(item, originalValue);
      } else {
        this.toastr.success('GrupoAd editada');

        const session = JSON.parse(this.cookieService.get('session'));

        console.log(session);

        const horaLocal: Date = new Date();
        horaLocal.setHours(horaLocal.getHours() - 3);

        const RequestLogOp: RequestLogOp = {
          dataLogOperacao: horaLocal,
          matriculaUsuarioLogOperacao: session.matriculaUsuario,
          codigoPerfilLogOperacao: session.codigoPerfil,
          CodigoFuncaoLogOperacao: 1,
          DescricaoLogOperacao: 'UPDATE GRUPO AD',
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
    const originalValue = this.originalValues[item.codigoGrupoAd];
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
        const index = this.GrupoAd.indexOf(item);
        if (index !== -1) {
          const response = await this.GrupoadFormService.DeleteGrupoAd(
            item.codigoGrupoAd
          );

          if (response == 200) {
            this.GrupoAd.splice(index, 1);
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
              DescricaoLogOperacao: 'DELETE GRUPO AD',
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
