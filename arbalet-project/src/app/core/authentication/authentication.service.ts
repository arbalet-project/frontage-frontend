import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthAnswer } from "./models/auth";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private baseUrl = environment.backEndBaseUrl;
  private authUrl = "/b/login";
  public token : string;
  private admin: boolean = false;
  private username: string;

  constructor(private http: HttpClient) {}

  public userAuth(username: string): Observable<boolean> {
    return this.http
    .post<AuthAnswer>(this.baseUrl + this.authUrl, { "username" : username })
    .pipe(map((r) => this.login(r, username)));
  }


  public login(r : AuthAnswer, username : string) : boolean {
    let token = r.token;
    if(token) {
      this.token = token;
      this.admin = false;
      this.username = username;
      console.log(username);
      // TODO : See jwt
      return true;
    } else {
      return true;
    }
  }
}
