import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { API_URL } from '../shared/url.const';
import { User } from './User';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  public getUserByUsername(data: {username: string}): Observable<{user:User}> {
    return this.http.post<{user: User}>(`${API_URL.BASE}${API_URL.GET_USER_BY_USERNAME}`, data);
  }

}
