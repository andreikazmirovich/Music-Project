import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { API_URL } from '../url.const';

import {Headers, RequestOptions} from '@angular/http';

@Injectable()
export class AudioService {

  constructor(
    private http: HttpClient
  ) { }

  sendAudio(file): Observable<any> {
    return this.http.post(`${API_URL.BASE}test`, {file: file});
  }

}
