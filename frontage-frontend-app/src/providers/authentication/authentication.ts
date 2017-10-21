import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
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

  constructor(public http: Http) {
    console.log('Hello AuthenticationProvider Provider');

    this.baseUrl = "/yo"
  }

  public isUp(): Observable<boolean> {
    return this.http.get(this.baseUrl + "/status/is_up")
      .map(resource => resource.json().is_up);
  }

}
