import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { API_URL } from '../url.const';

import { Headers, RequestOptions } from '@angular/http';
import { NgAnalyzedFile } from '@angular/compiler';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class AudioService {

  constructor(
    private http: HttpClient
  ) { }

  sendAudio(data): Observable<any> {
    return this.http.post(`${API_URL.BASE}${API_URL.AUDIO}`, data);
  }

  getUserAudios(userId): Observable<any> {
    return this.http.get(`${API_URL.BASE}${API_URL.AUDIO}/${userId}`);
  }

}
