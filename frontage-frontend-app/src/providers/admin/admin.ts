import { AdminHoursSettings } from './../../models/admin-hours-settings';
import { FApp } from './../../models/fapp';
import { Observable } from 'rxjs/Observable';
import { FAppOptions } from './../../models/f-app-options';
import { AuthenticationProvider } from './../authentication/authentication';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { environment } from '../../app/environment';

@Injectable()
export class AdminProvider {

  baseUrl: String;

  constructor(public http: HttpClient, public authentication: AuthenticationProvider) {
    this.baseUrl = `${environment.backEndBaseUrl}`;
  }

  public getCurrentSunsetAndSunDown(): Observable<AdminHoursSettings> {
    return this.http
      .get<any>(this.baseUrl + "/b/admin/cal");
  }

  public clearUserQueue() : Observable<any>{
    return this.http
      .delete<any>(this.baseUrl + "/b/apps/queue")
      .catch(error => Observable.of(error));
  }

  public updateSchedulerState(state: boolean) {
    let body = {
      enabled : state
    }
    return this.http
      .post<any>(this.baseUrl + "/b/admin/enabled", body)
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
}
