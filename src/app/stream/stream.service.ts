import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { API_URL } from '../shared/url.const';
import { Stream } from './Stream';

@Injectable()
export class StreamService {

  constructor(private http: HttpClient) {}

  createStream(stream: Stream): Observable<{status: string}> {
    return this.http.post<{status: string}>(`${API_URL.BASE}${API_URL.STREAM}`, stream);
  }

  getStream(streamOwnerUsername: string): Observable<{data: Stream}> {
    return this.http.get<{data: Stream}>(`${API_URL.BASE}${API_URL.STREAM}/${streamOwnerUsername}`);
  }

  deleteStream(streamOwnerUsername: string): Observable<{status: string}> {
    return this.http.delete<{status: string}>(`${API_URL.BASE}${API_URL.STREAM}/${streamOwnerUsername}`);
  }

  addNewMember(streamOwnerUsername: string, memberUsername: string): Observable<{status: string}> {
    return this.http.post<{status: string}>(`${API_URL.BASE}${API_URL.STREAM}${API_URL.MEMBER}/${streamOwnerUsername}`, {newMemberUsername: memberUsername});
  }

  getLastMember(streamOwnerUsername: string): Observable<{lastMember: string}> {
    return this.http.get<{lastMember: string}>(`${API_URL.BASE}${API_URL.STREAM}${API_URL.MEMBER}/${streamOwnerUsername}`);
  }
}
