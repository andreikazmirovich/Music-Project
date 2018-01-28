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

  public getUser(): Observable<any>{
    return this.http.get(`${API_URL.BASE}${API_URL.USER}`);
  }

  public getToken() {
    return localStorage.getItem('token');
  }

}
