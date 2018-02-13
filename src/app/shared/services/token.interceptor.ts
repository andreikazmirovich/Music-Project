import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { LoginService } from './login.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request.clone({
            setHeaders: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })).catch(error => {
            if (error.error.statusText === 'Unauthorized') {
                localStorage.clear();
                return Observable.throw(error);
            }
        });
    }
}