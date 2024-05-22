import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { EnviarService } from 'src/app/services/enviar.service';
import { Enviar } from 'src/app/models/Enviar';
import { SelectsService } from 'src/app/services/selects.service';
import { ResponseEnviarGeral } from 'src/app/models/ResponseEnviarGeral';
import { ResponseAlerta } from 'src/app/models/ResponseAlerta';
import { responsePropiedades } from 'src/app/models/ResponsePrioridades';
import { RequestEnviarMsg } from 'src/app/models/RequestEnviarMsg';
import { EnviarMsgServiceService } from 'src/app/services/enviar-msg-service.service';
import { ToastrService } from 'ngx-toastr';
import { ResponseCor } from 'src/app/models/ResponseCor';
import { CorFormService } from 'src/app/services/cor-form.service';
import { UpdateCor } from 'src/app/models/CorUpdate';
import { RequestLogEnvio } from 'src/app/models/RequestLogEnvio';
import { LogsService } from 'src/app/services/logs.service';
import { CookieService } from 'ngx-cookie-service';
import { RequestEnviarMsgNovo } from 'src/app/models/RequestEnviarMsgNovo';

@Component({
  selector: 'app-enviar',
  templateUrl: './enviar.component.html',
  styleUrls: ['./enviar.component.css'],
})
export class EnviarComponent {
  IdPainel: number | null | undefined;
  IdEstado: number | null | undefined;
  // Estado: ResponseEstado[] = [];
  Estado!: String | null;
  Tipo!: String | null;
  Estados: ResponseEnviarGeral[] = [];
  Alertas: ResponseAlerta[] = [];
  Propiedades: responsePropiedades[] = [];
  Cor: UpdateCor[] = [];

  loading: boolean = false;

  mensagem: string = '';
  selectedAlertaNivel: number[] = [];
  selectedPrioridade: number[] = [];
  selectedCor: string[] = [];

  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private enviarService: EnviarService,
    private selectsService: SelectsService,
    private EnviarMsgServiceService: EnviarMsgServiceService,
    private CorFormService: CorFormService,
    private toastr: ToastrService,
    private LogsService: LogsService,
    private cookieService: CookieService
  ) {
    //this.inicializarEstados();
  }

  async ngOnInit(): Promise<void> {
    const novoTitulo = 'Mensagens';
    this.title.setTitle(novoTitulo);

    const idestado = this.route.snapshot.paramMap.get('idestado');

    const FuncaoEnviar: Enviar = {
      codigoEstado: Number(idestado),
    };

    try {
      //ESTADOS
      const response = await this.enviarService.GetEstados(FuncaoEnviar);
      console.log(response);

      this.Estado = response[0].descricaoEstado;
      this.Tipo = response[0].tipoEstado;

      this.Estados = response;

      //ALERTAS
      this.Alertas = await this.selectsService.GetAlertas();

      //PRIORIDADES
      this.Propiedades = await this.selectsService.GetPrioridades();

      //COR
      this.Cor = await this.CorFormService.GetCor();
    } catch (error) {
      console.error('Erro ao obter os painéis:', error);
    }
  }

  hotCor(alerta: number) {
    switch (alerta) {
      case 4:
        return 'Vermelho';
      case 3:
        return 'Laranja';
      case 2:
        return 'Amarelo';
      case 1:
        return 'Azul';
      case 0:
        return 'Verde';
      default:
        return '';
    }
  }

  async gerarJSON() {
    const idpainel = this.route.snapshot.paramMap.get('idpainel');
    const session = JSON.parse(this.cookieService.get('session'));
    const horaLocal = new Date();
    horaLocal.setHours(horaLocal.getHours() - 3); // ajuste de fuso horário

    let jsonData = this.Estados.map((estado, index) => ({
      mensagem: this.mensagem,
      codigoArea: estado.codigoArea,
      alerta: Number(this.selectedAlertaNivel[index]),
      prioridade: Number(this.selectedPrioridade[index]),
      cor: this.hotCor(Number(this.selectedAlertaNivel[index])),
      painelEnvio: Number(idpainel),
    }));

    // Filtrar jsonData para remover objetos com NaN
    jsonData = jsonData.filter(
      (item) => !Object.values(item).some((value) => Number.isNaN(value))
    );

    // Validar mensagens vazias
    if (jsonData.some((item) => !item.mensagem)) {
      this.toastr.error(`Formulário incompleto`);
      return;
    }

    try {
      // Lista para armazenar os códigos de status
      const codigoStatusEnvioMsg = new Array(jsonData.length).fill(null);

      for (let i = 0; i < jsonData.length; i++) {
        const partes = jsonData[i].mensagem.split(':');
        const codigo = parseInt(partes[0], 10);

        switch (codigo) {
          case 400:
            codigoStatusEnvioMsg[i] = 0;
            this.toastr.error(`${partes[1]}`);
            break;
          case 200:
            codigoStatusEnvioMsg[i] = 1;
            break;
          default:
            codigoStatusEnvioMsg[i] = -1; // Código desconhecido
          //this.toastr.warning(`Código desconhecido: ${codigo}`);
        }

        // Prepare o objeto de log
        const RequestLogEnvio = {
          dataMsg: horaLocal,
          matriculaUsuarioMsg: session.matriculaUsuario,
          codigoEstadoMsg: 999,
          descricaoMsg: jsonData[i].mensagem,
          codigoAreaMsg: jsonData[i].codigoArea,
          codigoStatusEnvioMsg: codigoStatusEnvioMsg[i],
        };

        try {
          // Envie a mensagem para o painel
          await this.EnviarMsgServiceService.EnviarMsgPainelUnico([
            jsonData[i],
          ]);
          // Envie o log
          console.log('Enviando log:', RequestLogEnvio); // Adiciona log de depuração
          await this.LogsService.LogEnvioMsg(RequestLogEnvio);

          this.toastr.success(`Fila criada com sucesso`);
        } catch (error) {
          console.error(`Erro ao enviar mensagem ou log:`, error);
          this.toastr.error(`Erro ao enviar mensagem ou log`);
        }
      }
    } catch (error) {
      console.error(`Erro no cadastro:`, error);
      this.toastr.error(`Erro no cadastro`);
    }
  }

  async EnviarMensagem(RequestEnviarMsg: RequestEnviarMsgNovo[]) {
    if (!this.loading) {
      this.loading = true;

      //console.log(RequestEnviarMsg);

      try {
        const response = await this.EnviarMsgServiceService.EnviarMsgPainel(
          RequestEnviarMsg
        );

        //console.log(response);

        //LOG
        // Primeiro, processamos as respostas para determinar os códigos de status de envio
        var codigoStatusEnvioMsg = []; // Usaremos um array para armazenar os códigos de status baseados nos códigos de área de resposta
        for (var i = 0; i < response.length; i++) {
          var partes = response[i].mensagem.split(':'); // Corrigindo de 'slit' para 'split'

          console.log(partes[0]); // Este é um log de depuração para ver o que foi extraído
          var codigo = parseInt(partes[0]); // Convertendo a string para um número
          switch (codigo) {
            case 400:
              codigoStatusEnvioMsg[i] = 0;
              this.toastr.error(`${partes[1]}`);
              break;
            case 200:
              codigoStatusEnvioMsg[i] = 1;
              break;
          }
        }

        // Em seguida, usamos o array de RequestEnviarMsg para enviar logs
        const session = JSON.parse(this.cookieService.get('session'));
        for (const reqMsg of RequestEnviarMsg) {
          const horaLocal = new Date();
          horaLocal.setHours(horaLocal.getHours() - 3); // ajuste de fuso horário

          // Obtenha o índice de reqMsg de RequestEnviarMsg para pegar o códigoStatusEnvioMsg correspondente
          const index = RequestEnviarMsg.indexOf(reqMsg);

          // Prepare o objeto de log
          const RequestLogEnvio = {
            dataMsg: horaLocal,
            matriculaUsuarioMsg: session.matriculaUsuario,
            codigoEstadoMsg: Number(
              this.route.snapshot.paramMap.get('idestado')
            ),
            descricaoMsg: reqMsg.mensagem,
            codigoAreaMsg: reqMsg.codigoArea,
            codigoStatusEnvioMsg: codigoStatusEnvioMsg[index], // Use o código de status preparado anteriormente
            //codigoStatusEnvioMsg: 1, // Use o código de status preparado anteriormente
          };
          // Envie o log
          await this.LogsService.LogEnvioMsg(RequestLogEnvio);
        }

        this.toastr.success(`Fila criada com sucesso`);
      } catch (error) {
        console.log(`Erro no cadastro: ` + error);
        this.toastr.error(`Formulário incompleto`);
      }
      this.loading = false;
    }
  }

  getCorValue(descricaoCor: string): string {
    switch (descricaoCor) {
      case 'Vermelho':
        return '#FF0000';
      case 'Laranja':
        return '#FF7300';
      case 'Amarelo':
        return '#FFDD00';
      case 'Azul':
        return '#00BFFF';
      case 'Verde':
        return '#37F000';
      default:
        return '';
    }
  }
}
