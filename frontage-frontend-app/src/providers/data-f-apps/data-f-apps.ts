import { FAppOptions } from './../../models/f-app-options';
import { FApp } from './../../models/fapp';
import { AuthenticationProvider } from './../authentication/authentication';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import * as _ from "lodash";

/*
  Generated class for the DataFAppsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataFAppsProvider {

  baseUrl:string;

  constructor(public http: Http, public authentication: AuthenticationProvider) {
    this.baseUrl = "/server";
  }

  public getList() : Observable<FApp[]>{
    let token: string = 'Bearer ' + this.authentication.token;
    let headers= new Headers({'Content-Type':'application/json', 'Authorization': token});
    let options = new RequestOptions({ headers: headers });

    return this.http
      .get(this.baseUrl + "/b/apps", options)
      .map((data:any) => JSON.parse(data._body))
      .map((data:any) => data as FApp[])
      .map((fAppList: FApp[]) =>_.chain(fAppList)
      .orderBy("name", "asc")
      .value());
  }

  public launchFApp (fAppOptions:FAppOptions) : Observable<any>{
    let token: string = 'Bearer ' + this.authentication.token;
    let headers= new Headers({'Content-Type':'application/json', 'Authorization': token});
    let options = new RequestOptions({ headers: headers });

    let body = fAppOptions;

    return this.http
      .post(this.baseUrl + "/b/apps/running", body, options)
      .map(response => response.json())
      .catch(error => Observable.of(error));
  }

  public checkPosition () : Observable<any> {
    
    let token: string = 'Bearer ' + this.authentication.token;
    let headers= new Headers({'Content-Type':'application/json', 'Authorization': token});
    let options = new RequestOptions({ headers: headers });

    return this.http
      .get(this.baseUrl + "/b/apps/position", options)
      .map(response => response.json());
  }

  public stopApp() : Observable<any> {
    
    return this.http.delete(this.baseUrl + "/b/apps/position");
  }
}
