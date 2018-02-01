import { LocalStorageProvider} from './../local-storage/local-storage';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpInterceptor } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http/src/backend';
import { HttpRequest } from '@angular/common/http/src/request';
import { Observable } from 'rxjs/Observable';
import { HttpEvent } from '@angular/common/http/src/response';

@Injectable()
export class HttpInterceptorProvider implements HttpInterceptor {

  constructor(public localStorageProvider: LocalStorageProvider) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentToken = this.localStorageProvider.getAuthToken();
    if (currentToken) {
      let token: string = 'Bearer ' + currentToken;
      return next.handle(req.clone({
        setHeaders: {
          'Content-Type': 'application/json', 
          'Authorization': token
        }
      }));
    }

    return next.handle(req);
  }

}
