import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/forkJoin';

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
    return Observable.forkJoin(
      this.http.post<any>(`${API_URL.BASE}${API_URL.LOGIN}`, logData)
      .do(response => {
        localStorage.setItem('token', response.token);
      }),
      this.http.get<any>(`${API_URL.BASE}${API_URL.USER}`).do(userResp => {
          localStorage.setItem('name', userResp.user.name);
          localStorage.setItem('username', userResp.user.username);
          localStorage.setItem('photo', userResp.user.photo);
      })
    );
  }

  public getUser(): Observable<any>{
    return this.http.get(`${API_URL.BASE}${API_URL.USER}`);
  }

  public getToken() {
    return localStorage.getItem('token');
  }

}
