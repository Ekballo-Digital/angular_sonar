import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Login } from '../models/Login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private ApiUrl = `${environment.ApiUrl}/Login/Authentication`;

  constructor(private http: HttpClient) {}

  LoginAuthentication(Login: Login): Observable<any> {
    return this.http.post<any>(this.ApiUrl, Login).pipe(
      catchError((error) => {
        //console.error('Ocorreu um erro:', error);
        return throwError(error);
      })
    );
  }
}
