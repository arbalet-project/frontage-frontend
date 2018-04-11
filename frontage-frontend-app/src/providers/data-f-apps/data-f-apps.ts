import { Observable } from 'rxjs/Observable';
import { FApp } from './../../models/fapp';
import { AuthenticationProvider } from './../authentication/authentication';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import * as _ from "lodash";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../app/environment';

@Injectable()
export class DataFAppsProvider {

  baseUrl: string;

  constructor(public http: HttpClient, public authentication: AuthenticationProvider) {
    this.baseUrl = `${environment.backEndBaseUrl}`;
  }

  public getList(): Observable<FApp[]> {

    return this.http
      .get<any>(this.baseUrl + "/b/apps")
      .map((data: any) => data as FApp[])
      .map((fAppList: FApp[]) => _.chain(fAppList)
        .orderBy("name", "asc")
        .value());
  }

  public launchFApp(fAppOptions): Observable<any> {
    let body = fAppOptions;
    return this.http
      .post<any>(this.baseUrl + "/b/apps/running", body)
      .catch(error => Observable.of(error));
  }

  public getCurrentApp(): Observable<any> {
    return this.http
      .get<any>(this.baseUrl + "/b/apps/running")
      .catch(error => Observable.of(error));
  }

  public checkPosition(): Observable<any> {
    return this.http
      .get<any>(this.baseUrl + "/b/apps/position")
      .timeout(4000);
  }

  public stopApp() {
    this.http.delete(this.baseUrl + "/b/apps/running").subscribe(
      response => console.log("ok")
    );
  }

  public quitQueue() {
    this.http.delete(this.baseUrl + "/b/apps/position").subscribe(
      response => console.log("ok")
    );
  }
}