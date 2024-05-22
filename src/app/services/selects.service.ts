import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class SelectsService {
  private token: string = '';
  private session: string = '';

  private ApiUrl = `${environment.ApiUrl}/EnviarMensagem/GetAlerta`;
  private ApiUrl2 = `${environment.ApiUrl}/EnviarMensagem/GetAlerta2`;
  private ApiUrlPropiedade = `${environment.ApiUrl}/EnviarMensagem/GetPropiedades`;
  private ApiUrlCor = `${environment.ApiUrl}/Select/GetCor`;
  private ApiUrlArea = `${environment.ApiUrl}/Select/GetArea`;
  private ApiUrlPerfil = `${environment.ApiUrl}/Select/GetPerfil`;
  private ApiUrlMenu = `${environment.ApiUrl}/Select/GetMenu`;
  private ApiUrlEstados = `${environment.ApiUrl}/Select/GetEstado`;

  constructor(private http: HttpClient, private cookie: CookieService) {}

  async GetAlertas(): Promise<any> {
    this.session = this.cookie.get('session') || '';

    const data = JSON.parse(this.session);
    this.token = data.token || '';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return await this.http
      .get<any>(this.ApiUrl, { headers: headers })
      .toPromise();
  }

  async GetAlertas2(): Promise<any> {
    this.session = this.cookie.get('session') || '';

    const data = JSON.parse(this.session);
    this.token = data.token || '';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return await this.http
      .get<any>(this.ApiUrl2, { headers: headers })
      .toPromise();
  }

  async GetPrioridades(): Promise<any> {
    this.session = this.cookie.get('session') || '';

    const data = JSON.parse(this.session);
    this.token = data.token || '';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return await this.http
      .get<any>(this.ApiUrlPropiedade, { headers: headers })
      .toPromise();
  }

  async GetCor(): Promise<any> {
    this.session = this.cookie.get('session') || '';

    const data = JSON.parse(this.session);
    this.token = data.token || '';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return await this.http
      .get<any>(this.ApiUrlCor, { headers: headers })
      .toPromise();
  }

  async GetArea(): Promise<any> {
    this.session = this.cookie.get('session') || '';

    const data = JSON.parse(this.session);
    this.token = data.token || '';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return await this.http
      .get<any>(this.ApiUrlArea, { headers: headers })
      .toPromise();
  }

  async GetPerfil(): Promise<any> {
    this.session = this.cookie.get('session') || '';

    const data = JSON.parse(this.session);
    this.token = data.token || '';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return await this.http
      .get<any>(this.ApiUrlPerfil, { headers: headers })
      .toPromise();
  }

  async GetMenu(): Promise<any> {
    this.session = this.cookie.get('session') || '';

    const data = JSON.parse(this.session);
    this.token = data.token || '';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return await this.http
      .get<any>(this.ApiUrlMenu, { headers: headers })
      .toPromise();
  }

  async GetEstados(): Promise<any> {
    this.session = this.cookie.get('session') || '';

    const data = JSON.parse(this.session);
    this.token = data.token || '';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return await this.http
      .get<any>(this.ApiUrlEstados, { headers: headers })
      .toPromise();
  }

  async GetNomeEstado(cod: number): Promise<any> {
    this.session = this.cookie.get('session') || '';

    const data = JSON.parse(this.session);
    this.token = data.token || '';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return await this.http
      .get<any>(`${environment.ApiUrl}/Select/GetNomeEstado/${cod}`, {
        headers: headers,
      })
      .toPromise();
  }

  async GetNomeArea(cod: number): Promise<any> {
    this.session = this.cookie.get('session') || '';

    const data = JSON.parse(this.session);
    this.token = data.token || '';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return await this.http
      .get<any>(`${environment.ApiUrl}/Select/GetNomeArea/${cod}`, {
        headers: headers,
      })
      .toPromise();
  }

  async GetNomeAlerta(cod: number): Promise<any> {
    this.session = this.cookie.get('session') || '';

    const data = JSON.parse(this.session);
    this.token = data.token || '';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return await this.http
      .get<any>(`${environment.ApiUrl}/Select/GetNomeAlerta/${cod}`, {
        headers: headers,
      })
      .toPromise();
  }

  async GetNomePrioridade(cod: number): Promise<any> {
    this.session = this.cookie.get('session') || '';

    const data = JSON.parse(this.session);
    this.token = data.token || '';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return await this.http
      .get<any>(`${environment.ApiUrl}/Select/GetNomePrioridade/${cod}`, {
        headers: headers,
      })
      .toPromise();
  }
}
