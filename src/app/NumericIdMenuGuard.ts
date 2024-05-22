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
export class NumericIdMenuGuard implements CanActivate {
  constructor(private router: Router, private toastr: ToastrService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const idmenu = route.paramMap.get('idmenu');

    if (!isNaN(Number(idmenu))) {
      return true;
    } else if (!Number(idmenu)) {
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
