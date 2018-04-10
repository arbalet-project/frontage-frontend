import { AdminHoursSettings } from './../../models/admin-hours-settings';
import { FApp } from './../../models/fapp';
import { Observable } from 'rxjs/Observable';
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

  /**
   * Hours setup
   */
  public getCurrentSunsetAndSunDown(): Observable<AdminHoursSettings> {
    return this.http
      .get<AdminHoursSettings>(this.baseUrl + "/b/admin/cal");
  }

  public setFrontageOpeningHour(openingHour: String): Observable<any> {
    let body = {
      sunrise: openingHour
    }
    return this.http.patch(this.baseUrl + '/b/admin/state', body);
  }

  public setFrontageClosingHour(closingHour: String): Observable<any> {
    let body = {
      sundown: closingHour
    }
    return this.http.patch(this.baseUrl + '/b/admin/state', body);
  }

  public setFrontageOpeningOffset(openingOffset: String): Observable<any> {
    let body = {
      sundown_offset: openingOffset
    }
    return this.http.patch(this.baseUrl + '/b/admin/state', body);
  }

  public setFrontageClosingOffset(closingOffset: String): Observable<any> {
    let body = {
      sunrise_offset: closingOffset
    }
    return this.http.patch(this.baseUrl + '/b/admin/state', body);
  }

  /**
   * Settings part
   */
  public clearUserQueue(): Observable<any> {
    return this.http
      .delete(this.baseUrl + "/b/apps/queue")
      .catch(error => Observable.of(error));
  }

  public updateFrontageState(state: boolean) {
    let body = {
      enabled: state
    }
    return this.http
      .post(this.baseUrl + "/b/admin/enabled", body)
      .catch(error => Observable.of(error));
  }

  /**
   * FApp launching
   */
  public launchForcedFApp(fAppOptions): Observable<any> {
    let body = fAppOptions;
    return this.http
      .post(this.baseUrl + "/b/apps/admin/running", body)
      .catch(error => Observable.of(error));
  }

  public setScheduledFApp(fApp: FApp): Observable<any> {
    let body = {
      app_name: fApp.name,
      app_state: fApp.scheduled
    }
    return this.http
      .post(this.baseUrl + "/b/apps/default/", body)
      .catch(error => Observable.of(error));
  }

  public sendScheduledFAppOptions(fAppOptions): Observable<any> {
    let body = fAppOptions;
    return this.http
      .post(this.baseUrl + "/b/apps/default/" + fAppOptions.name, body)
      .catch(error => Observable.of(error));
  }
}
