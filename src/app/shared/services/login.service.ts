import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { UserRegistration } from './UserRegistration';
import { UserLogin } from './UserLogin';
import { API_URL } from '../url.const';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }

  public registration(regData: UserRegistration): Observable<any> {
    const newUser = {
      name: regData.name,
      username: regData.username,
      email: regData.email,
      style: regData.musicStyle,
      description: regData.description,
      photo: regData.photo,
      password: regData.password,
      c_password: regData.rePassword
    };
    return this.http.post<any>(`${API_URL.BASE}${API_URL.REGISTRATION}`, newUser);
  }

  public login(logData: UserLogin): Observable<any> {
    return this.http.post<any>(`${API_URL.BASE}${API_URL.LOGIN}`, logData)
      .do(response => {
        localStorage.setItem('token', response.token);
      });
  }

  public logout() {
    localStorage.clear();
    location.reload();
  }

  public isLoggedIn(): Observable<{data: boolean}> {
    return this.http.get<{data: boolean}>(`${API_URL.BASE}${API_URL.USER}${API_URL.IS_LOGGED_IN}`);
  }

  public getUser(): Observable<any> {
    return this.http.get(`${API_URL.BASE}${API_URL.USER}`);
  }

  public getToken() {
    return localStorage.getItem('token');
  }

}
