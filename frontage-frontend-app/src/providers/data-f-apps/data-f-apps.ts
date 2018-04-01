import { Observable } from 'rxjs/Observable';
import { FAppOptions } from './../../models/f-app-options';
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

  public launchFApp(fAppOptions: FAppOptions): Observable<any> {
    let body = fAppOptions;
    return this.http
      .post<any>(this.baseUrl + "/b/apps/running", body)
      .catch(error => Observable.of(error));
  }

  public launchForcedFApp(fAppOptions: FAppOptions): Observable<any> {
    let body = fAppOptions;
    return this.http
      .post<any>(this.baseUrl + "/b/apps/admin/running", body)
      .catch(error => Observable.of(error));
  }

  public setScheduledApp(fApp: FApp): Observable<any> {
    let body = {
      app_name: fApp.name,
      app_state: fApp.scheduled
    }
    return this.http
      .post<any>(this.baseUrl + "/b/apps/default/", body)
      .catch(error => Observable.of(error));
  }

  public checkPosition(): Observable<any> {
    return this.http
      .get<any>(this.baseUrl + "/b/apps/position");
  }

  public stopApp(): Observable<any> {
    return this.http.delete(this.baseUrl + "/b/apps/position");
  }
}