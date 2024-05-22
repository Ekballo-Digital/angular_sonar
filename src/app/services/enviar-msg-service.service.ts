import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { RequestEnviarMsg } from '../models/RequestEnviarMsg';
import { environment } from 'src/environments/environment';
import { RequestMute } from '../models/RequestMute';
import { RequestEnviarMsgNovo } from '../models/RequestEnviarMsgNovo';

@Injectable({
  providedIn: 'root',
})
export class EnviarMsgServiceService {
  private token: string = '';
  private session: string = '';
  private ApiUrl = `${environment.ApiUrl}/Server/Sever`;
  private ApiUrlUnico = `${environment.ApiUrl}/Server/ServerUnico`;
  private ApiUrlMute = `${environment.ApiUrl}/Server/Mute`;
  private ApiUrlTeste = `${environment.ApiUrl}/Server/Teste`;

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private toastr: ToastrService
  ) {}

  async EnviarMsgPainel(
    RequestEnviarMsg: RequestEnviarMsgNovo[]
  ): Promise<any> {
    this.session = this.cookie.get('session');

    const data = JSON.parse(this.session);

    this.token = data.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    console.log(RequestEnviarMsg);
    try {
      return await this.http
        .post<any>(this.ApiUrl, RequestEnviarMsg, { headers: headers })
        .toPromise();
    } catch (error) {
      console.log(error);
    }
  }

  async EnviarMsgPainelUnico(
    RequestEnviarMsg: RequestEnviarMsgNovo[]
  ): Promise<any> {
    this.session = this.cookie.get('session');

    if (!this.session) {
      console.error('Session cookie not found');
      return;
    }

    const data = JSON.parse(this.session);

    if (!data || !data.token) {
      console.error('Invalid session data');
      return;
    }

    this.token = data.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    console.log(RequestEnviarMsg);
    try {
      const response = await this.http
        .post<any>(this.ApiUrlUnico, RequestEnviarMsg, { headers })
        .toPromise();

      return response;
    } catch (error) {
      console.error('Error sending request:', error);
      throw error; // Propaga o erro para o chamador lidar com ele
    }
  }

  async Mute(RequestMute: RequestMute): Promise<any> {
    this.session = this.cookie.get('session');

    const data = JSON.parse(this.session);

    this.token = data.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    console.log(RequestMute);
    try {
      return await this.http
        .post<any>(this.ApiUrlMute, RequestMute, { headers: headers })
        .toPromise();
    } catch (error) {
      console.log(error);
    }
  }

  async Teste(RequestMute: RequestMute): Promise<any> {
    this.session = this.cookie.get('session');

    const data = JSON.parse(this.session);

    this.token = data.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    console.log(RequestMute);
    try {
      return await this.http
        .post<any>(this.ApiUrlTeste, RequestMute, { headers: headers })
        .toPromise();
    } catch (error) {
      console.log(error);
    }
  }
}
