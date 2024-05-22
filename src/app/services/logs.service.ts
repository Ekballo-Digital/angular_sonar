import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { RequestLogEnvio } from '../models/RequestLogEnvio';
import { RequestLogOp } from '../models/RequestLogOp';

@Injectable({
  providedIn: 'root',
})
export class LogsService {
  private token: string = '';
  private session: string = '';

  private ApiUrl = `${environment.ApiUrl}/Log/LogMensagem`;
  private ApiUrlLogOp = `${environment.ApiUrl}/Log/LogOperacao`;

  constructor(private cookie: CookieService, private http: HttpClient) {}

  async LogEnvioMsg(RequestLogEnvio: RequestLogEnvio): Promise<any> {
    this.session = this.cookie.get('session');

    const data = JSON.parse(this.session);

    this.token = data.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return await this.http
      .post<any>(this.ApiUrl, RequestLogEnvio, { headers: headers })
      .toPromise();
  }

  async LogOperacao(RequestLogOp: RequestLogOp): Promise<any> {
    this.session = this.cookie.get('session');

    const data = JSON.parse(this.session);

    this.token = data.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return await this.http
      .post<any>(this.ApiUrlLogOp, RequestLogOp, { headers: headers })
      .toPromise();
  }
}
