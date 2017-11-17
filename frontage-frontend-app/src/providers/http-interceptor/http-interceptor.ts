import { LocalStorageProvider} from './../local-storage/local-storage';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpInterceptor } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http/src/backend';
import { HttpRequest } from '@angular/common/http/src/request';
import { Observable } from 'rxjs/Observable';
import { HttpEvent } from '@angular/common/http/src/response';

/*
  Generated class for the HttpInterceptorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpInterceptorProvider implements HttpInterceptor {

  constructor(public localStorageProvider: LocalStorageProvider) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("begin interceptor"); 
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
