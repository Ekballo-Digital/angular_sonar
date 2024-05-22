import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class FilasService {
  private token: string = '';
  private session: string = '';

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private toastr: ToastrService
  ) {}

  async SelectFilaEnvio(matricula: string, codigoPainel: number): Promise<any> {
    this.session = this.cookie.get('session') || '';

    const data = JSON.parse(this.session);
    this.token = data.token || '';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return await this.http
      .get<any>(
        `${environment.ApiUrl}/Fila/SelectFilaEnvio/${matricula}/${codigoPainel}`,
        {
          headers: headers,
        }
      )
      .toPromise();
  }

  async SelectFilaEnvioGeral(codigoPainel: number): Promise<any> {
    this.session = this.cookie.get('session') || '';

    const data = JSON.parse(this.session);
    this.token = data.token || '';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return await this.http
      .get<any>(
        `${environment.ApiUrl}/Fila/SelectFilaEnvioGeral/${codigoPainel}`,
        {
          headers: headers,
        }
      )
      .toPromise();
  }

  async DeleteFila(codigoPainel: number): Promise<any> {
    this.session = this.cookie.get('session');

    const data = JSON.parse(this.session);

    this.token = data.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    console.log(headers);

    try {
      return await this.http
        .delete<any>(`${environment.ApiUrl}/Fila/DeleteFila/${codigoPainel}`, {
          headers: headers,
        })
        .toPromise();
    } catch (error) {
      console.log('Erro no bloco catch:', error);
      if (error instanceof HttpErrorResponse) {
        console.log(error.error);
        if (error.status === 500) {
          // Erro interno do servidor
          this.toastr.error(`${error.error}`);
        } else if (error.status === 400) {
          // Erro de solicitação inválida
          this.toastr.error(
            'Solicitação inválida. Por favor, tente novamente.'
          );
        } else if (error.status === 404) {
          // Recurso não encontrado
          this.toastr.error('Recurso não encontrado.');
        } else if (error.status === 200) {
          this.toastr.success('Fila deletada');

          return 200;
        } else {
          // Outro erro HTTP
          this.toastr.error(`Erro HTTP: ${error.message}`);
        }
      } else {
        // Outros erros não relacionados ao HTTP
        this.toastr.error(`Erro: ${error}`);
      }
    }
  }
}
