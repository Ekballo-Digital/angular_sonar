import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EditaveisService {
  private token: string = '';
  private session: string = '';

  private ApiUrl = `${environment.ApiUrl}/Alerta/SelectAlerta`;

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
}
