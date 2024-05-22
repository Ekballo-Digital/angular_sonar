import { RequestMatriz } from '../models/RequestMatriz';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { UpdateMatriz } from '../models/UpdateMatriz';

@Injectable({
  providedIn: 'root',
})
export class MatrizService {
  private token: string = '';
  private session: string = '';
  private ApiUrl = `${environment.ApiUrl}/Matriz/InsertMatriz`;
  private ApiUrlUp = `${environment.ApiUrl}/Matriz/UpdateMatriz`;
  private ApiUrlGet = `${environment.ApiUrl}/Matriz/SelectMatriz`;

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private toastr: ToastrService
  ) {}

  async InsertMatriz(RequestMatriz: RequestMatriz): Promise<any> {
    this.session = this.cookie.get('session');

    const data = JSON.parse(this.session);

    this.token = data.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    console.log(RequestMatriz);
    try {
      return await this.http
        .post<any>(this.ApiUrl, RequestMatriz, { headers: headers })
        .toPromise();
    } catch (error) {
      console.log(error);
    }
  }

  async UpdateMatriz(UpdateMatriz: UpdateMatriz): Promise<any> {
    this.session = this.cookie.get('session');

    const data = JSON.parse(this.session);

    this.token = data.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    try {
      return await this.http
        .put<any>(this.ApiUrlUp, UpdateMatriz, { headers: headers })
        .toPromise();
    } catch (error) {
      console.log(error);
    }
  }

  async DeleteMatriz(
    CodigoEstado: number,
    CodigoArea: number,
    CodigoAlerta: number,
    CodigoPrioridade: number
  ): Promise<any> {
    this.session = this.cookie.get('session');

    const data = JSON.parse(this.session);

    this.token = data.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    try {
      return await this.http
        .delete<any>(
          `${environment.ApiUrl}/Matriz/DeleteMatriz/${CodigoEstado}/${CodigoArea}/${CodigoAlerta}/${CodigoPrioridade}`,
          {
            headers: headers,
          }
        )
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
          this.toastr.success('GrupoAd deletado');

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

  async GetMatriz(): Promise<any> {
    this.session = this.cookie.get('session') || '';

    const data = JSON.parse(this.session);
    this.token = data.token || '';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return await this.http
      .get<any>(this.ApiUrlGet, { headers: headers })
      .toPromise();
  }
}
