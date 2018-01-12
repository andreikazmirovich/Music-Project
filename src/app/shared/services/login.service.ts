import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserRegistration } from './UserRegistration';
import { UserLogin } from './UserLogin';
import { API_URL } from '../url.const';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }

  static registration(regData: UserRegistration) {
    console.log(regData);
  }

  public login(logData: UserLogin) {
    console.log(logData);
    this.http.post<any>(`${API_URL.BASE}${API_URL.LOGIN}`, logData).subscribe(response => {
      if (response.token) {
        localStorage.setItem('curentUser', response.token);
        localStorage.getItem('curentUser');
      }
    });
  }

}
