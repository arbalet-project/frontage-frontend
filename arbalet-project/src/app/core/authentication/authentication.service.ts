import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthAnswer } from './models/auth';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { State } from '../state/state.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private baseUrl = environment.backEndBaseUrl;
  private authUrl = '/b/login';
  private authAdminUrl = '/b/adminlogin';

  constructor(private http: HttpClient, private jwt: JwtHelperService, public state: State) { }

  public userAuth(username: string): Observable<boolean> {
    return this.http
      .post<AuthAnswer>(this.baseUrl + this.authUrl, { username })
      .pipe(map((r) => this.login(r)));
  }

  public login(r: AuthAnswer): boolean {
    if (r.token) {
      localStorage.setItem('token', r.token);
      console.log("test")
      this.state.fAppList.update();
      return true;
    } else {
      return false;
    }
  }

  public adminAuth(username: string, password: string) {
    return this.http
      .post<AuthAnswer>(this.baseUrl + this.authAdminUrl, {
        username,
        password,
      })
      .pipe(map(r => this.login(r)));
  }

  get token() {
    return localStorage.getItem('token');
  }

  get admin() {
    return this.jwt.decodeToken(this.token).is_admin;
  }

  get userid() {
    return this.jwt.decodeToken(this.token).userid;
  }
}
