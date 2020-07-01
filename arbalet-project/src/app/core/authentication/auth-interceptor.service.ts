import { Injectable } from "@angular/core";
import { AuthenticationService } from "./authentication.service";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(public auth: AuthenticationService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.auth.token;
    return next.handle(
      token
        ? req.clone({
            headers: req.headers.set("Authorization", "Bearer " + token),
          })
        : req
    );
  }
}
