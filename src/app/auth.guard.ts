import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'; // Certifique-se de importar o CookieService do ngx-cookie-service
import { MiddlewareValidaPainelService } from './services/middleware-valida-painel.service';
import { MiddleWarePainel } from './models/MiddleWarePainel';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private cookieService: CookieService, private router: Router) {}

  canActivate(): boolean {
    // Verifica se o cookie de autenticação está presente
    if (this.cookieService.check('session')) {
      return true; // O usuário está autenticado e pode acessar a página
    } else {
      // Se o usuário não estiver autenticado, redirecione-o para a página de login
      this.router.navigate(['/']);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class AnotherMiddlewarePainel implements CanActivate {
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private MiddlewareValidaPainelService: MiddlewareValidaPainelService,
    private toastr: ToastrService
  ) {}

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const idpainel = route.paramMap.get('idpainel'); // Acessando o parâmetro 'idpainel' da rota

    const session = JSON.parse(this.cookieService.get('session'));

    const Request: MiddleWarePainel = {
      codigoPainel: Number(idpainel),
      nomeGrupoAd: session.nomeGrupoAd[0],
    };

    const response = await this.MiddlewareValidaPainelService.ValidaPainel(
      Request
    );

    if (response.length >= 1) {
      return true;
    } else {
      this.toastr.error(`Usuário não possui acesso à página`);
      this.router.navigate(['/paineis']);
    }

    return true; // Exemplo: sempre permitir acesso por enquanto
  }
}
