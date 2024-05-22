import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FuncaoMenus } from 'src/app/models/FuncaoMenus';
import { ResponseFuncaoMenus } from 'src/app/models/ResponseFuncaoMenus';
import { OpcoesService } from 'src/app/services/opcoes.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-opcoes',
  templateUrl: './opcoes.component.html',
  styleUrls: ['./opcoes.component.css'],
})
export class OpcoesComponent implements OnInit {
  session: string | undefined;
  menusFuncoes: ResponseFuncaoMenus[] = [];
  CodigoArea: number | null | undefined;
  IdPainel: Number | null | undefined;

  constructor(
    private opcoesService: OpcoesService,
    private route: ActivatedRoute,
    private title: Title
  ) {}

  async ngOnInit(): Promise<void> {
    const novoTitulo = 'Opções';
    this.title.setTitle(novoTitulo);

    const idmenu = this.route.snapshot.paramMap.get('idmenu');
    const idpainel = this.route.snapshot.paramMap.get('idpainel');

    this.IdPainel = Number(idpainel);

    const FuncaoMenusData: FuncaoMenus = {
      codigoMenu: Number(idmenu),
    };

    try {
      const response = await this.opcoesService.GetFucaoMenus(FuncaoMenusData);
      this.menusFuncoes = response;
    } catch (error) {
      console.error('Erro ao obter os painéis:', error);
    }
  }

  PegaCodigoArea(event: any) {
    this.CodigoArea = event;
  }
}
