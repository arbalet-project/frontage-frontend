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

  baseUrl:string;
  authEndpoint:string;
  token:string;

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

  public refreshToken() : Observable<boolean> {
    let headers= new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({ headers: headers });

    console.log("send request")
    return this.http.post(this.baseUrl+this.authEndpoint, '{"username": "frontageadmin", "password": "frontagepassword"}', options)
                    .map(response => this.extractToken(response));
  }

  private extractToken(response): boolean {
    let token = response.json().token;
    if(token){
      console.log("auth token "+ token);
      this.token = token;
      return true;
    }else {
      return false;
    }
  }
}