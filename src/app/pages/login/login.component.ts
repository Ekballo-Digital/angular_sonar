import { Component } from '@angular/core';
import { Login } from 'src/app/models/Login';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loading: boolean = false;
  constructor(
    private loginService: LoginService,
    private toastr: ToastrService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  async Login(Login: Login) {
    if (!this.loading) {
      this.loading = true;
      try {
        const response = await this.loginService
          .LoginAuthentication(Login)
          .toPromise();
        const linha = response[0];

        switch (linha.statusCode) {
          case 200:
            this.toastr.success(`${linha.nomeUsuario} você está autenticado`);
            this.cookieService.set('session', JSON.stringify(linha), {
              expires: 1 / 24,
            });
            this.router.navigate(['/paineis']);
            break;
          case 401:
            this.toastr.error(`Senha ou matrícula incorreta`);
            break;
          case 203:
            this.toastr.warning(
              `Usuário ${linha.matriculaUsuario} não tem acesso ao sistema de painéis`
            );
            break;
          case 300:
            alert(`${linha.nomeUsuario} você está autenticado`);
            break;
        }
      } catch (error: any) {
        // Lógica de tratamento de erro
        if (error instanceof HttpErrorResponse && error.status === 400) {
          this.toastr.error(error.error.errors.MatriculaUsuario[0]);
          this.toastr.error(error.error.errors.SenhaUsuario[0]);
        } else {
          this.toastr.error('Ocorreu um erro ao processar a solicitação.');
        }
      } finally {
        this.loading = false;
      }
    }
  }
}
