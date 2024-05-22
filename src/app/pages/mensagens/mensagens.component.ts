import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MensagensService } from 'src/app/services/mensagens.service';
import { ResponseSiglas } from 'src/app/models/ResponseSiglas';
import { ResponseEstados } from 'src/app/models/ResponseEstados';
import { ActivatedRoute } from '@angular/router';
import { FuncaoEstado } from 'src/app/models/FuncaoEstados';
import { FuncaoAlerta } from 'src/app/models/FuncaoAlerta';

@Component({
  selector: 'app-mensagens',
  templateUrl: './mensagens.component.html',
  styleUrls: ['./mensagens.component.css'],
})
export class MensagensComponent {
  siglasTabelaMatriz: ResponseSiglas[] = [];
  estadosTabelaMatriz: ResponseEstados[] = [];
  alertaTabelaMatriz: any;
  IdPainel: number | null | undefined;

  constructor(
    private title: Title,
    private mensagensService: MensagensService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    const novoTitulo = 'Matriz';
    this.title.setTitle(novoTitulo);

    const idarea = this.route.snapshot.paramMap.get('idarea');
    const idpainel = this.route.snapshot.paramMap.get('idpainel');

    this.IdPainel = Number(idpainel);

    try {
      // FUNÇÃO SIGLA

      const responseSigla = await this.mensagensService.GetSiglasTabelaMatriz();
      this.siglasTabelaMatriz = responseSigla;

      // FUNÇÃO ESTADO

      const FuncaoEstadosData: FuncaoEstado = {
        codigoArea: Number(idarea),
      };

      const responseEstado = await this.mensagensService.GetEstadosTabelaMatriz(
        FuncaoEstadosData
      );

      this.estadosTabelaMatriz = responseEstado;

      // FUNÇÃO ALERTA

      const responseAlerta: any[] = [];

      for (let x: number = 0; x < responseEstado.length; x++) {
        const FuncaoAlertaData: FuncaoAlerta = {
          codigoEstado: Number(responseEstado[x].codigoEstado),
        };

        const alertaResponse =
          await this.mensagensService.GetAlertaTabelaMatriz(FuncaoAlertaData);
        responseAlerta.push(alertaResponse);
      }
      this.alertaTabelaMatriz = responseAlerta;
    } catch (error) {
      console.error('Erro ao obter valores:', error);
    }
  }
}
