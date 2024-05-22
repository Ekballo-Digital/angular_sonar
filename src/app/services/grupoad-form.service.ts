import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { RequestGrupo } from '../models/RequestGrupo';
import { UpdateGrupoAd } from '../models/UpdateGrupoAd';

@Injectable({
  providedIn: 'root',
})
export class GrupoadFormService {
  private token: string = '';
  private session: string = '';
  private ApiUrl = `${environment.ApiUrl}/GrupoAd/InsertAd`;
  private ApiUrlUp = `${environment.ApiUrl}/GrupoAd/UpdateAd`;
  private ApiUrlGet = `${environment.ApiUrl}/GrupoAd/SelectAd`;

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private toastr: ToastrService
  ) {}

  async InsertGrupoAd(RequestGrupo: RequestGrupo): Promise<any> {
    this.session = this.cookie.get('session');

    const data = JSON.parse(this.session);

    this.token = data.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    console.log(RequestGrupo);
    try {
      return await this.http
        .post<any>(this.ApiUrl, RequestGrupo, { headers: headers })
        .toPromise();
    } catch (error) {
      console.log(error);
    }
  }

  async UpdateGrupoAd(UpdateGrupoAd: UpdateGrupoAd): Promise<any> {
    this.session = this.cookie.get('session');

    const data = JSON.parse(this.session);

    this.token = data.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    try {
      return await this.http
        .put<any>(this.ApiUrlUp, UpdateGrupoAd, { headers: headers })
        .toPromise();
    } catch (error) {
      console.log(error);
    }
  }

  async DeleteGrupoAd(cod: number): Promise<any> {
    this.session = this.cookie.get('session');

    const data = JSON.parse(this.session);

    this.token = data.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    try {
      return await this.http
        .delete<any>(`${environment.ApiUrl}/GrupoAd/DeleteAd/${cod}`, {
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

  async GetGrupoAd(): Promise<any> {
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
