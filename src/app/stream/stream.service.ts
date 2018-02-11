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

  getStream(username): Observable<{data: Stream}> {
    return this.http.get<{data: Stream}>(`${API_URL.BASE}${API_URL.STREAM}/${username}`);
  }

}
