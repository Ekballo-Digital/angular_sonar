import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { FuncaoMenus } from '../models/FuncaoMenus';

@Injectable({
  providedIn: 'root',
})
export class OpcoesService {
  private token: string = '';
  private session: string = '';

  private ApiUrl = `${environment.ApiUrl}/Login/FuncaoMenuGenerate`;

  constructor(private cookie: CookieService, private http: HttpClient) {}

  async GetFucaoMenus(FuncaoMenus: FuncaoMenus): Promise<any> {
    this.session = this.cookie.get('session');

    const data = JSON.parse(this.session);

    this.token = data.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return await this.http
      .post<any>(this.ApiUrl, FuncaoMenus, { headers: headers })
      .toPromise();
  }
}
