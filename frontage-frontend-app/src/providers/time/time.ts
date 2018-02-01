import { environment } from './../../app/environment';
import { HttpClient } from '@angular/common/http';
import { AuthenticationProvider } from './../authentication/authentication';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class TimeProvider {

  baseUrl:string = `${environment.backEndBaseUrl}`;

  constructor(public http: HttpClient, public authentication: AuthenticationProvider) {}

  getNextTimeUp() :Observable<string>{
    return this.http.get<any>(this.baseUrl+"/b/admin/cal")
                    .map(response => response.on);
  }

}
