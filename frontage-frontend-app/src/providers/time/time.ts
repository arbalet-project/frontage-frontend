import { AuthenticationProvider } from './../authentication/authentication';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the TimeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TimeProvider {

  baseUrl:string = "/server";

  constructor(public http: Http, public authentication: AuthenticationProvider) {}

  getNextTimeUp() :Observable<string>{
    return this.http.get(this.baseUrl+"/b/admin/cal")
                    .map(response => response.json().on);
  }

}
