import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { RequestFSistema } from '../models/RequestFSistema';
import { UpdateFSistema } from '../models/UpdateFSistema';

@Injectable({
  providedIn: 'root',
})
export class FsistemaFormService {
  private token: string = '';
  private session: string = '';
  private ApiUrl = `${environment.ApiUrl}/FuncaoSistema/InsertFuncao`;
  private ApiUrlUp = `${environment.ApiUrl}/FuncaoSistema/UpdateFuncao`;
  private ApiUrlGet = `${environment.ApiUrl}/FuncaoSistema/SelectFuncao`;

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private toastr: ToastrService
  ) {}

  async InsertFSistema(RequestFSistema: RequestFSistema): Promise<any> {
    this.session = this.cookie.get('session');

    const data = JSON.parse(this.session);

    this.token = data.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    console.log(RequestFSistema);
    try {
      return await this.http
        .post<any>(this.ApiUrl, RequestFSistema, { headers: headers })
        .toPromise();
    } catch (error) {
      console.log(error);
    }
  }

  async UpdateFSistema(UpdateFSistema: UpdateFSistema): Promise<any> {
    this.session = this.cookie.get('session');

    const data = JSON.parse(this.session);

    this.token = data.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    try {
      return await this.http
        .put<any>(this.ApiUrlUp, UpdateFSistema, { headers: headers })
        .toPromise();
    } catch (error) {
      console.log(error);
    }
  }

  async DeleteFSistema(cod: number): Promise<any> {
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
          `${environment.ApiUrl}/FuncaoSistema/DeleteFuncao/${cod}`,
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
          this.toastr.success('Menu deletado');

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

  async GetFSistema(): Promise<any> {
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