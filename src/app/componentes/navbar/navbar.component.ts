import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { CookieService } from 'ngx-cookie-service';
import { Menus } from 'src/app/models/Menus';
import { ResponseMenus } from 'src/app/models/ResponseMenus';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  session: string | undefined;
  menus: ResponseMenus[] = [];
  constructor(
    private navbarService: NavbarService,
    private cookie: CookieService
  ) {}
  async ngOnInit(): Promise<void> {
    this.session = this.cookie.get('session');

    if (this.session) {
      const data = JSON.parse(this.session);

      const MenusData: Menus = {
        nomeGrupoAd: data.nomeGrupoAd[0],
      };

      try {
        const response = await this.navbarService.GetMenus(MenusData);
        this.menus = response;
      } catch (error) {
        console.error('Erro ao obter os painéis:', error);
      }
    }
  }
}
