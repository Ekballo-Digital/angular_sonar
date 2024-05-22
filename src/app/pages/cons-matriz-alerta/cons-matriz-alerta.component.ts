import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ResponseAlertas } from 'src/app/models/ReponseAlertas';
import { ResponseAlerta } from 'src/app/models/ResponseAlerta';
import { ResponseArea } from 'src/app/models/ResponseArea';
import { ResponseEstados } from 'src/app/models/ResponseEstados';
import { responsePropiedades } from 'src/app/models/ResponsePrioridades';
import { SelectsService } from 'src/app/services/selects.service';
import { RequestMatriz } from 'src/app/models/RequestMatriz';
import { ToastrService } from 'ngx-toastr';
import { MatrizService } from 'src/app/services/matriz.service';
import { LogsService } from 'src/app/services/logs.service';
import { CookieService } from 'ngx-cookie-service';
import { RequestLogOp } from 'src/app/models/RequestLogOp';

@Component({
  selector: 'app-cons-matriz-alerta',
  templateUrl: './cons-matriz-alerta.component.html',
  styleUrls: ['./cons-matriz-alerta.component.css'],
})
export class ConsMatrizAlertaComponent {
  loading: boolean = false;

  ResponseEstado: ResponseEstados[] = [];
  ResponseArea: ResponseArea[] = [];
  ResponseAlerta: ResponseAlerta[] = [];
  ResponsePrioridade: responsePropiedades[] = [];

  constructor(
    private title: Title,
    private selectsService: SelectsService,
    private toastr: ToastrService,
    private MatrizService: MatrizService,
    private cookieService: CookieService,
    private logsService: LogsService
  ) {}
  async ngOnInit(): Promise<void> {
    const novoTitulo = 'Matriz de Alerta';
    this.title.setTitle(novoTitulo);
  }

  async Matriz(RequestMatriz: RequestMatriz) {
    if (!this.loading) {
      this.loading = true;

      try {
        const response = await this.MatrizService.InsertMatriz(RequestMatriz);

        console.log(response);

        if (response[0].codigoEstado == 401) {
          this.toastr.error(`Já existe uma Matriz com essas informações.`);
        } else {
          this.toastr.success(`Matriz cadastrado`);

          const session = JSON.parse(this.cookieService.get('session'));

          console.log(session);

          const horaLocal: Date = new Date();
          horaLocal.setHours(horaLocal.getHours() - 3);

          const RequestLogOp: RequestLogOp = {
            dataLogOperacao: horaLocal,
            matriculaUsuarioLogOperacao: session.matriculaUsuario,
            codigoPerfilLogOperacao: session.codigoPerfil,
            CodigoFuncaoLogOperacao: 1,
            DescricaoLogOperacao: 'CADASTRO MATRIZ',
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
