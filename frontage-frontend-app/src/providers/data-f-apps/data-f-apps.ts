import { FAppOptions } from './../../models/f-app-options';
import { FApp } from './../../models/fapp';
import { AuthenticationProvider } from './../authentication/authentication';
import { Injectable } from '@angular/core';
import { RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import * as _ from "lodash";
import { HttpClient } from '@angular/common/http';

/*
  Generated class for the DataFAppsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataFAppsProvider {

  baseUrl: string;

  constructor(public http: HttpClient, public authentication: AuthenticationProvider) {
    this.baseUrl = "/server";
  }

  public getList(): Observable<FApp[]> {

    return this.http
      .get<any>(this.baseUrl + "/b/apps")
      .map((data: any) => data as FApp[])
      .map((fAppList: FApp[]) => _.chain(fAppList)
        .orderBy("name", "asc")
        .value());
  }

  public launchFApp(fAppOptions: FAppOptions): Observable<any> {
    let body = fAppOptions;
    return this.http
      .post<any>(this.baseUrl + "/b/apps/running", body)
      .catch(error => Observable.of(error));
  }

  public checkPosition(): Observable<any> {
    return this.http
      .get<any>(this.baseUrl + "/b/apps/position");
  }
}
