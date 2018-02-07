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
    let isAdmin = this.localStorageProvider.isAdmin();
    //If the user is admin send the password
    if (isAdmin) {
      body = { "username": userName, "password": password };
    } else {
      body = { "username": userName };
    }

    return this.http.post(this.baseUrl + this.authEndpoint, body)
      .map(response => this.finalizeLogin(response));

    // Call as an admin
    // return this.http.post(this.baseUrl + this.authEndpoint, '{"username": "frontageadmin", "password": "frontagepassword"}', options)
    //   .map(response => this.extractToken(response));
  }

  private finalizeLogin(response): boolean {
    let token = response.token;
    if (token) {
      this.localStorageProvider.setAuthToken(token);
      return true;
    } else {
      return false;
    }
  }
}