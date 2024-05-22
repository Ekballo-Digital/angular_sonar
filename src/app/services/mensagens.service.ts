import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { FuncaoEstado } from '../models/FuncaoEstados';
import { FuncaoAlerta } from '../models/FuncaoAlerta';

@Injectable({
  providedIn: 'root',
})
export class MensagensService {
  private token: string = '';
  private session: string = '';
  private ApiUrlSiglas = `${environment.ApiUrl}/TabelaMatriz/GerarSilgasTabelaMatriz`;
  private ApiUrlEstados = `${environment.ApiUrl}/TabelaMatriz/GerarEstadosTabelaMatriz`;
  private ApiUrlAlertas = `${environment.ApiUrl}/TabelaMatriz/GerarAlertasTabelaMatriz`;

  constructor(private cookie: CookieService, private http: HttpClient) {}

  async GetSiglasTabelaMatriz(): Promise<any> {
    this.session = this.cookie.get('session');

    const data = JSON.parse(this.session);

    this.token = data.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return await this.http
      .post<any>(this.ApiUrlSiglas, null, { headers: headers })
      .toPromise();
  }

  async GetEstadosTabelaMatriz(FuncaoEstado: FuncaoEstado): Promise<any> {
    this.session = this.cookie.get('session');

    const data = JSON.parse(this.session);

    this.token = data.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return await this.http
      .post<any>(this.ApiUrlEstados, FuncaoEstado, { headers: headers })
      .toPromise();
  }

  async GetAlertaTabelaMatriz(FuncaoAlerta: FuncaoAlerta): Promise<any> {
    this.session = this.cookie.get('session');

    const data = JSON.parse(this.session);

    this.token = data.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return await this.http
      .post<any>(this.ApiUrlAlertas, FuncaoAlerta, { headers: headers })
      .toPromise();
  }
}
