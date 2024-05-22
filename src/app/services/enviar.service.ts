import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Enviar } from '../models/Enviar';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class EnviarService {
  private token: string = '';
  private session: string = '';
  private ApiUrl = `${environment.ApiUrl}/EnviarMensagem/GetEstado`;

  constructor(private http: HttpClient, private cookie: CookieService) {}

  async GetEstados(Enviar: Enviar): Promise<any> {
    this.session = this.cookie.get('session') || '';

    const data = JSON.parse(this.session);
    this.token = data.token || '';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return await this.http
      .post<any>(this.ApiUrl, Enviar, { headers: headers })
      .toPromise();
  }
}
