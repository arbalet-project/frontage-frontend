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
    if (token) {
      req.headers.append("Authorization", "Bearer " + token);
    }
    return next.handle(req);
  }
}
