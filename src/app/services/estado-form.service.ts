import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { RequestEstado } from '../models/ResquestEstado';
import { environment } from 'src/environments/environment';
import { UpdateEstado } from '../models/UpdateEstado';

@Injectable({
  providedIn: 'root',
})
export class EstadoFormService {
  private token: string = '';
  private session: string = '';
  private ApiUrl = `${environment.ApiUrl}/Estado/InsertEstado`;
  private ApiUrlUp = `${environment.ApiUrl}/Estado/UpdateEstado`;
  private ApiUrlGetEstado = `${environment.ApiUrl}/Estado/SelectEstado`;

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private toastr: ToastrService
  ) {}

  async InsertEstado(RequestEstado: RequestEstado): Promise<any> {
    this.session = this.cookie.get('session');

    const data = JSON.parse(this.session);

    this.token = data.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    //console.log(RequestAlerta);
    try {
      return await this.http
        .post<any>(this.ApiUrl, RequestEstado, { headers: headers })
        .toPromise();
    } catch (error) {
      console.log(error);
    }
  }

  async UpdateEstado(UpdateEstado: UpdateEstado): Promise<any> {
    this.session = this.cookie.get('session');

    const data = JSON.parse(this.session);

    this.token = data.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    try {
      return await this.http
        .put<any>(this.ApiUrlUp, UpdateEstado, { headers: headers })
        .toPromise();
    } catch (error) {
      console.log(error);
    }
  }

  async DeleteEstado(cod: number): Promise<any> {
    this.session = this.cookie.get('session');

    const data = JSON.parse(this.session);

    this.token = data.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    try {
      return await this.http
        .delete<any>(`${environment.ApiUrl}/Estado/DeleteEstado/${cod}`, {
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
          this.toastr.success('Estado deletado');

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

  async GetEstado(): Promise<any> {
    this.session = this.cookie.get('session') || '';

    const data = JSON.parse(this.session);
    this.token = data.token || '';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return await this.http
      .get<any>(this.ApiUrlGetEstado, { headers: headers })
      .toPromise();
  }
}
