import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the AuthenticationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenticationProvider {

  baseUrl: string;
  authEndpoint: string;
  token: string;

  constructor(public http: Http) {

    this.baseUrl = "/server";
    this.authEndpoint = "/b/login";
  }

  public isServerUp(): Observable<boolean> {
    return this.http.get(this.baseUrl + "/status/is_up")
                    .map(response => response.json().is_up);
  }

  public isFacadeUp() : Observable<boolean> {
    return this.http.get(this.baseUrl + "/frontage/status")
                    .map(response => response.json().is_usable);
  }

  public auth(userName: string, password: string): Observable<boolean> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let body;
    //If the user is admin send the password
    if(password) {
      body = {"username" : userName, "password": password};
    }else {
      body = {"username" : userName};
    }

    return this.http.post(this.baseUrl + this.authEndpoint, body, options)
      .map(response => this.extractToken(response));

      // Call as an admin
    // return this.http.post(this.baseUrl + this.authEndpoint, '{"username": "frontageadmin", "password": "frontagepassword"}', options)
    //   .map(response => this.extractToken(response));
  }

  private extractToken(response): boolean {
    let token = response.json().token;
    if (token) {
      this.token = token;
      return true;
    } else {
      return false;
    }
  }
}