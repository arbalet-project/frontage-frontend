import { Platform } from 'ionic-angular';
import { LocalStorageProvider } from './../local-storage/local-storage';
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

  constructor(public http: HttpClient, public authentication: AuthenticationProvider,
    public localStorageProvider: LocalStorageProvider,
    public platform: Platform) {

    this.baseUrl = `${environment.backEndBaseUrl}`;
  }

  public getList(): Observable<FApp[]> {

    return this.http
      .get<any>(this.baseUrl + "/b/apps")
      .map((data: any) => data as FApp[])
      .map((fAppList: FApp[]) => _.chain(fAppList)
      .value());
  }

  public launchFApp(fAppOptions): Observable<any> {
    let body = fAppOptions;
    return this.http
      .post<any>(this.baseUrl + "/b/apps/running", body);
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
    this.http.get(this.baseUrl + "/b/apps/quit").subscribe();
  }

  public quitQueue() {
    this.http.get(this.baseUrl + "/b/queue/quit").subscribe();
  }

  public sendKeepAlive() {

    this.http.post(this.baseUrl + "/b/apps/iamalive", "pouet").subscribe();
  }
}
