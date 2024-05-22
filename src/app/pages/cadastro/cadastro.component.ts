import { Component } from '@angular/core';
import { OpcoesService } from 'src/app/services/opcoes.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { ResponseFuncaoMenus } from 'src/app/models/ResponseFuncaoMenus';
import { FuncaoMenus } from 'src/app/models/FuncaoMenus';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent {
  FMenus: ResponseFuncaoMenus[] = [];
  urlF: string | undefined;

  constructor(
    private opcoesService: OpcoesService,
    private title: Title,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  async ngOnInit(): Promise<void> {
    const idmenu = this.route.snapshot.paramMap.get('idmenu');
    const urlSegments = this.location.path().split('/');

    const novoTitulo = `${urlSegments[1]
      .toLowerCase()
      .replace(/\b\w/g, (c: string) => c.toUpperCase())}`;
    this.title.setTitle(novoTitulo);

    try {
      const FuncaoMenu: FuncaoMenus = {
        codigoMenu: Number(idmenu),
      };

      switch (Number(idmenu)) {
        case 10:
          this.urlF = 'controle';
          break;
        case 20:
          this.urlF = 'cadastro';
          break;
        case 50:
          this.urlF = 'config-matriz';
          break;
        case 41:
          this.urlF = 'consulta';
          break;
      }

      const response = await this.opcoesService.GetFucaoMenus(FuncaoMenu);
      console.log(response);

      this.FMenus = response;
    } catch (error) {
      console.error(error);
    }
  }
}
