import { Component, OnInit } from '@angular/core';
import { PaineisService } from 'src/app/services/paineis.service';
import { CookieService } from 'ngx-cookie-service';
import { Paineis } from 'src/app/models/Paineis';
import { ResponsePaineis } from 'src/app/models/ResponsePaineis';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  session: string | undefined;
  paineis: ResponsePaineis[] = [];

  constructor(
    private paineisService: PaineisService,
    private cookie: CookieService,
    private title: Title
  ) {}

  async ngOnInit(): Promise<void> {
    const novoTitulo = 'Selecione um painel';
    this.title.setTitle(novoTitulo);

    this.session = this.cookie.get('session');

    if (this.session) {
      const data = JSON.parse(this.session);

      const paineisData: Paineis = {
        nomeGrupoAd: data.nomeGrupoAd[0],
      };

      try {
        const response = await this.paineisService.GetPaineis(paineisData);
        this.paineis = response;
      } catch (error) {
        console.error('Erro ao obter os painéis:', error);
      }
    }
  }
}
