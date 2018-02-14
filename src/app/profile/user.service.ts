import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import { API_URL } from '../shared/url.const';
import { User } from './User';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  public getUserByUsername(data: {username: string}): Observable<{user:User}> {
    return this.http.post<{user: User}>(`${API_URL.BASE}${API_URL.GET_USER_BY_USERNAME}`, data);
  }

  subscribeOrDescribe(username): Observable<{status: string}> {
    return this.http.post<{status: string}>(`${API_URL.BASE}${API_URL.USER}${API_URL.SUBSCRIBE_OR_DESCRIBE}`, {username});
  }

  isSubscribed(username): Observable<{data: boolean}> {
    return this.http.post<{data: boolean}>(`${API_URL.BASE}${API_URL.USER}${API_URL.IS_SUBSCRIBED}`, {username});
  }

  getSubscriptionsAndSubscribersCount(username): Observable<[{data: number}, {data: number}]> {
    return Observable.forkJoin(
      this.http.get<{data: number}>(`${API_URL.BASE}${API_URL.USER}${API_URL.GET_SUBSCRIPTIONS_COUNT}/${username}`),
      this.http.get<{data: number}>(`${API_URL.BASE}${API_URL.USER}${API_URL.GET_SUBSCRIBERS_COUNT}/${username}`)
    );
  }

  getAllSubscriptions(username): Observable<{data: any}> {
    return this.http.get<{data: any}>(`${API_URL.BASE}${API_URL.USER}${API_URL.GET_All_SUBSCRIPTIONS}/${username}`);
  }

}
