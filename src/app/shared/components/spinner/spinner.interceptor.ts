import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

import { SpinnerService } from './spinner.service';
import { API_URL } from '../../url.const';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
    noneSpinedRequestUrls = [
        `${API_URL.BASE}${API_URL.USER}${API_URL.SEARCH}`
    ];
    constructor(private spinner: SpinnerService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let isNoneSpinedRequestUrl = false;
        this.noneSpinedRequestUrls.forEach(url => {
            if (req.url.indexOf(url) !== -1) {
                isNoneSpinedRequestUrl = true;
            }
        });
        if(isNoneSpinedRequestUrl){
            return next.handle(req);
        }
        else{
            this.spinner.addTask();
            return next.handle(req).finally(() => this.spinner.removeTask());
        }
    }

}
