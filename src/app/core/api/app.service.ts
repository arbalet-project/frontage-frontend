import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FApp } from '../state/models/f-app';
import { Observable } from 'rxjs';
import { Launch, CurrentFApp, Position, KeepAlive, ParametersStatus, LaunchForced, UnforceAppResponse } from './models/f-app';

@Injectable({
  providedIn: 'root'
})
export class FAppService {
  private baseUrl = environment.backEndBaseUrl;
  private listUrl = '/b/apps';
  private launchUrl = '/b/apps/running';
  private launchForcedUrl = '/b/apps/admin/running';
  private positionUrl = '/b/apps/position';
  private quitUrl = '/b/queue/quit';
  private keepUrl = '/b/apps/iamalive';
  private quitQueueUrl = '/b/queue/quit';
  private clearQueueUrl = '/b/apps/queue/clear';
  private updateAppUrl = '/b/apps/default/';
  private updateStateUrl = '/b/admin/enabled';
  private forceAppUrl = '/b/apps/admin/quit';
  public snapUserUrl = '/b/admin/snap/users';
  public grantUserUrl = '/b/admin/snap/guser'
  constructor(private http: HttpClient) { }

  public getList(): Observable<[FApp]> {
    return this.http.get<[FApp]>(this.baseUrl + this.listUrl);
  }

  public launchFApp(fAppOptions: any): Observable<Launch> { // TODO : remove any
    return this.http.post<Launch>(this.baseUrl + this.launchUrl, fAppOptions);
  }

  public launchForcedFApp(fAppOptions: any): Observable<LaunchForced> {
    return this.http
      .post<LaunchForced>(this.baseUrl + this.launchForcedUrl, fAppOptions);
  }

  public checkPosition(): Observable<Position> {
    return this.http.get<Position>(this.baseUrl + this.positionUrl);
  }

  public getCurrentFApp(): Observable<CurrentFApp> {
    return this.http.get<CurrentFApp>(this.baseUrl + this.launchUrl);
  }

  public stopApp(): void {
    this.http.get(this.baseUrl + this.quitUrl);
  }

  public keepAlive(): Observable<KeepAlive> {
    return this.http.post<KeepAlive>(this.baseUrl + this.keepUrl, 'heartbeat');
  }

  public quitQueue() {
    this.http.get(this.baseUrl + this.quitQueueUrl);
  }

  public clearUserQueue() {
    this.http.get(this.baseUrl + this.clearQueueUrl).subscribe();
  }


  public setScheduled(name: string, state: boolean) {
    return this.http
      .post(this.baseUrl + this.updateAppUrl, {
        app_name: name,
        app_state: state
      }).subscribe();
  }

  public sendParameters(fAppOptions: any): Observable<ParametersStatus> {
    return this.http
      .post<ParametersStatus>(this.baseUrl + this.updateAppUrl + fAppOptions.name, fAppOptions);
  }

  public updateFrontageState(state: string) {
    return this.http
      .post(this.baseUrl + this.updateStateUrl, {
        state
      }).subscribe();
  }

  public unForceFApp(): Observable<UnforceAppResponse> {
    return this.http
      .get<UnforceAppResponse>(this.baseUrl + this.forceAppUrl);
  }
  
  public getSnapUsers() :  Observable<any> {
    return this.http
       .get(this.baseUrl + this.snapUserUrl);
  }

  public setSnapUsers(body : { selected_client : string}) : Observable<any> {
    return this.http
        .post(this.baseUrl + this.grantUserUrl, body);
  }
}
