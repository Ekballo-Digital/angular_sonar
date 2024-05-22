import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'; // Certifique-se de importar o CookieService do ngx-cookie-service
import { MiddlewareValidaUrlsService } from './services/middleware-valida-urls.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AnotherMiddlewareUrlsCadastro implements CanActivate {
  constructor(
    private cookieService: CookieService,
    private MiddlewareValidaUrlsService: MiddlewareValidaUrlsService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  async canActivate() {
    const session = JSON.parse(this.cookieService.get('session'));

    const Request = {
      nomeGrupoAd: session.nomeGrupoAd[0],
      url: 'cadastro',
    };

    const response = await this.MiddlewareValidaUrlsService.ValidaUrls(Request);

    console.log(response.length);

    if (response.length >= 1) {
      return true;
    } else {
      this.toastr.error(`Usuário não possui acesso à página`);
      this.router.navigate(['/paineis']);
    }

    return true;
  }
}
