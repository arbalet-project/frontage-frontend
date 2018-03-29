import { environment } from './../../app/environment';
import { LocalStorageProvider } from './../local-storage/local-storage';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/toPromise';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthenticationProvider {

  baseUrl: string;
  authEndpoint: string;

  constructor(public http: HttpClient, public localStorageProvider: LocalStorageProvider) {
    this.baseUrl = `${environment.backEndBaseUrl}`;
    this.authEndpoint = "/b/login";
  }

  public isServerUp(): Observable<boolean> {
    return this.http.get<any>(this.baseUrl + "/status/is_up")
      .map(response => response.is_up);
  }

  public isFacadeUp(): Observable<boolean> {
    return this.http.get<any>(this.baseUrl + "/frontage/status")
      .map(response => response.is_usable);
  }

  public auth(userName: string, password: string): Observable<boolean> {

    let body;
    //If the user wishes to log as and admin send the password
    if (password) {
      body = { "username": userName, "password": password };
    } else {
      body = { "username": userName };
    }

    return this.http.post(this.baseUrl + this.authEndpoint, body)
      .map(response => this.finalizeLogin(response));
  }

  /**
   * Convert the token in a readable state
   * @param token 
   */
  private parseJwt(token): any {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

  private isAdmin(parsedToken): boolean {
    return parsedToken.is_admin;
  }

  /**
   * Save the token and check if the user is an admin
   * @param response 
   */
  private finalizeLogin(response): boolean {
    let token = response.token;
    if (token) {
      this.localStorageProvider.setAuthToken(token);
      let parsedToken = this.parseJwt(token);
      this.localStorageProvider.setAdmin("false");
      if (this.isAdmin(parsedToken)) {
        this.localStorageProvider.setAdmin("true");
      }
      return true;
    } else {
      return false;
    }
  }
}