import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NumericIdEnvGuard implements CanActivate {
  constructor(private router: Router, private toastr: ToastrService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const idpainel = route.paramMap.get('idpainel');
    const idestado = route.paramMap.get('idestado');

    if (!isNaN(Number(idpainel)) && !isNaN(Number(idestado))) {
      return true;
    } else if (!Number(idpainel) && !Number(idestado)) {
      // Redireciona para uma página de erro ou para a página inicial, dependendo do caso
      this.toastr.error('Parâmetro invalido');
      this.router.navigate(['/paineis']);
      return false;
    } else {
      this.toastr.error('Parâmetro invalido');
      this.router.navigate(['/paineis']);
      return false;
    }
  }
}
