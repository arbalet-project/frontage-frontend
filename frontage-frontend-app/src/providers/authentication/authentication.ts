import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

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
    console.log('Hello AuthenticationProvider Provider');

    this.baseUrl = "/server";
    this.authEndpoint = "/b/login";

  }

  public isUp(): Observable<boolean> {
    return this.http.get(this.baseUrl + "/status/is_up")
      .map(response => response.json().is_up);
  }

  public getToken() : any {
    return this.token;
  }

  public refreshToken() {
    let headers= new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({ headers: headers });
    this.http.post(this.baseUrl+this.authEndpoint, '{"username": "frontageadmin", "password": "frontagepassword"}', options)
                    .map(response => response.json())
                    .subscribe(response => this.token = response.token);
  }
}
