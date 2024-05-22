import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { CorFormService } from 'src/app/services/cor-form.service';
import { Cor } from 'src/app/models/Cor';
import { CookieService } from 'ngx-cookie-service';
import { LogsService } from 'src/app/services/logs.service';
import { RequestLogOp } from 'src/app/models/RequestLogOp';

@Component({
  selector: 'app-editar-cor',
  templateUrl: './editar-cor.component.html',
  styleUrls: ['./editar-cor.component.css'],
})
export class EditarCorComponent {
  originalValues: any = {};
  Cor: Cor[] = [];

  constructor(
    private title: Title,
    private toastr: ToastrService,
    private CorFormService: CorFormService,
    private cookieService: CookieService,
    private logsService: LogsService
  ) {}

  async ngOnInit() {
    const novoTitulo = 'Edições Cor';
    this.title.setTitle(novoTitulo);

    const response = await this.CorFormService.GetCor();
    this.Cor = response;
  }

  editItem(item: any): void {
    item.editing = true;
    this.originalValues[item.codigoCor] = {
      codigoCor: item.codigoCor,
      descricaoCor: item.descricaoCor,
      hexaCor: item.hexaCor,
      hexaCorRed: item.hexaCorRed,
      hexaCorGreen: item.hexaCorGreen,
      hexaCorBlue: item.hexaCorBlue,
    };
  }

  async saveItem(item: any): Promise<void> {
    item.editing = false;

    try {
      const response = await this.CorFormService.UpdateCor({
        codigoCor: item.codigoCor,
        descricaoCor: item.descricaoCor,
        hexaCor: item.hexaCor,
        hexaCorRed: item.hexaCorRed,
        hexaCorGreen: item.hexaCorGreen,
        hexaCorBlue: item.hexaCorBlue,
      });

      if (response[0].hexaCor == 401) {
        this.toastr.error(`${response[0].descricaoCor}`);
        const originalValue = this.originalValues[item.codigoCor];
        Object.assign(item, originalValue);
      } else {
        this.toastr.success('Cor editado');

        const session = JSON.parse(this.cookieService.get('session'));

        console.log(session);

        const horaLocal: Date = new Date();
        horaLocal.setHours(horaLocal.getHours() - 3);

        const RequestLogOp: RequestLogOp = {
          dataLogOperacao: horaLocal,
          matriculaUsuarioLogOperacao: session.matriculaUsuario,
          codigoPerfilLogOperacao: session.codigoPerfil,
          CodigoFuncaoLogOperacao: 1,
          DescricaoLogOperacao: 'UPDATE COR',
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
    const originalValue = this.originalValues[item.codigoCor];
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
        const index = this.Cor.indexOf(item);
        if (index !== -1) {
          const response = await this.CorFormService.DeleteCor(item.codigoCor);

          if (response == 200) {
            this.Cor.splice(index, 1);
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
              DescricaoLogOperacao: 'DELETE COR',
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
