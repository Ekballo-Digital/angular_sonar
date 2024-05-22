import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Paineis } from '../models/Paineis';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class PaineisService {
  private token: string = '';
  private session: string = '';

  private ApiUrl = `${environment.ApiUrl}/Login/PainelGenerate`;

  constructor(private http: HttpClient, private cookie: CookieService) {}

  async GetPaineis(Paineis: Paineis): Promise<any> {
    this.session = this.cookie.get('session') || '';

    const data = JSON.parse(this.session);
    this.token = data.token || '';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return await this.http
      .post<any>(this.ApiUrl, Paineis, { headers: headers })
      .toPromise();
  }
}
