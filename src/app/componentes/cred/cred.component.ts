import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PainelUso } from 'src/app/models/PainelUso';
import { CredService } from 'src/app/services/cred.service';
import { Title } from '@angular/platform-browser';
import { PainelFormService } from 'src/app/services/painel-form.service';
import { EnviarMsgServiceService } from 'src/app/services/enviar-msg-service.service';
import { RequestMute } from 'src/app/models/RequestMute';
import { ServiceFilaService } from 'src/app/services/service-fila.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cred',
  templateUrl: './cred.component.html',
  styleUrls: ['./cred.component.css'],
})
export class CredComponent {
  nomePerfil: String | undefined;
  matriculaUsuario: String | undefined;
  nomeUsuario: String | undefined;
  NomePainel!: String | null;
  NomePagina!: String | null;
  CodigoPainel!: Number | null;

  @Output() CodigoArea = new EventEmitter();

  constructor(
    public CookieService: CookieService,
    private route: ActivatedRoute,
    private credService: CredService,
    private title: Title,
    private PainelFormService: PainelFormService,
    private EnviarMsgServiceService: EnviarMsgServiceService,
    private ServiceFilaService: ServiceFilaService,
    private toastr: ToastrService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.NomePagina = this.title.getTitle();

    const cookieSessionString = this.CookieService.get('session');

    if (cookieSessionString) {
      const cookieSession = JSON.parse(cookieSessionString);
      this.nomePerfil = cookieSession.nomePerfil;
      this.matriculaUsuario = cookieSession.matriculaUsuario;
      this.nomeUsuario = cookieSession.nomeUsuario
        .toLowerCase()
        .replace(/\b\w/g, (c: string) => c.toUpperCase());
    }

    const idpainel = this.route.snapshot.paramMap.get('idpainel');

    const FuncaoPainelUso: PainelUso = {
      codigoPainel: Number(idpainel),
    };

    const response = await this.credService.GetPainelUso(FuncaoPainelUso);

    this.NomePainel = response[0].siglaArea;
    this.CodigoPainel = response[0].codigoPainel;

    this.CodigoArea.emit(response[0].codigoArea);
  }

  async Mute() {
    const idpainel = this.route.snapshot.paramMap.get('idpainel');

    const responsePainel = await this.PainelFormService.GetPainelUso(
      Number(idpainel)
    );

    console.log(responsePainel);

    const RequestMute: RequestMute = {
      ip: responsePainel.ipPainel,
      porta: responsePainel.portaPainel,
    };

    console.log(RequestMute);

    const valor = await this.EnviarMsgServiceService.Mute(RequestMute);

    //console.log(responsePainel);
  }

  async Teste() {
    const idpainel = this.route.snapshot.paramMap.get('idpainel');

    const responsePainel = await this.PainelFormService.GetPainelUso(
      Number(idpainel)
    );

    console.log(responsePainel);

    const RequestTeste: RequestMute = {
      ip: responsePainel.ipPainel,
      porta: responsePainel.portaPainel,
    };

    console.log(RequestTeste);

    const valor = await this.EnviarMsgServiceService.Teste(RequestTeste);

    //console.log(responsePainel);
  }

  async RestartServer() {
    try {
      await this.ServiceFilaService.RestartSever();
      this.toastr.success('Reenvio executado');
    } catch (e) {
      this.toastr.error('Erro ao realizar reenvio');
    }
  }

  logout() {
    this.cookieService.delete('session');
    this.router.navigate(['/']);
  }
}
