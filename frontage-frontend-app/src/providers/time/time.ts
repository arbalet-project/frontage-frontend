import { HttpClient } from '@angular/common/http';
import { AuthenticationProvider } from './../authentication/authentication';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the TimeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TimeProvider {

  baseUrl:string = "/server";

  constructor(public http: HttpClient, public authentication: AuthenticationProvider) {}

  getNextTimeUp() :Observable<string>{
    return this.http.get<any>(this.baseUrl+"/b/admin/cal")
                    .map(response => response.on);
  }

}
