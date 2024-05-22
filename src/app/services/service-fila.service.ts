import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServiceFilaService {
  private token: string = '';
  private session: string = '';
  private ApiUrl = `${environment.ApiUrl}/Service/RestartService`;

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private toastr: ToastrService
  ) {}

  async RestartSever(): Promise<any> {
    this.session = this.cookie.get('session');

    const data = JSON.parse(this.session);

    this.token = data.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    try {
      return await this.http
        .post<any>(this.ApiUrl, null, { headers: headers })
        .toPromise();
    } catch (error) {
      console.log(error);
    }
  }
}
