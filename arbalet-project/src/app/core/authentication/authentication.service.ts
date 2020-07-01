import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthAnswer } from "./models/auth";
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private baseUrl = environment.backEndBaseUrl;
  private authUrl = "/b/login";
  private authAdminUrl = "/b/adminlogin";
  // private admin: boolean = false;
  // private username: string;

  constructor(private http: HttpClient, private jwt: JwtHelperService) {}

  public userAuth(username: string): Observable<boolean> {
    return this.http
      .post<AuthAnswer>(this.baseUrl + this.authUrl, { username: username })
      .pipe(map((r) => this.login(r)));
  }

  public login(r: AuthAnswer): boolean {
    if (r.token) {
      localStorage.setItem("token", r.token);
      console.log(this.jwt.decodeToken(r.token));
      localStorage.setItem('token', r.token);
      return true;
    } else {
      return false;
    }
  }

  public adminAuth(username: string, password: string) {
    return this.http
      .post<AuthAnswer>(this.baseUrl + this.authAdminUrl, {
        username: username,
        password: password,
      })
      .pipe(map((r) => this.login(r)));
  }

  get token() {
    return localStorage.getItem("token");
  }
}
