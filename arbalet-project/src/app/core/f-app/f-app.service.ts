import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FApp, ResponseLaunch, PositionResponse, CurrentFAppResponse } from './models/f-app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FAppService {
  private baseUrl = environment.backEndBaseUrl;
  private listUrl = '/b/apps';
  private launchUrl = '/b/apps/running';
  private positionUrl = '/b/apps/position';
  private quitUrl = '/b/queue/quit';

  constructor(public http: HttpClient) { }

  public getList(): Observable<[FApp]>{
    return this.http.get<[FApp]>(this.baseUrl + this.listUrl);
  }

  public launchFApp(fAppOptions: any): Observable<ResponseLaunch> { // TODO : remove any
    return this.http.post<ResponseLaunch>(this.baseUrl + this.launchUrl, fAppOptions);
  }

  public checkPosition(): Observable<PositionResponse> {
    return this.http.get<PositionResponse>(this.baseUrl + this.positionUrl);
  }

  public getCurrentFApp(): Observable<CurrentFAppResponse> {
    return this.http.get<CurrentFAppResponse>(this.baseUrl + this.launchUrl);
  }

  public stopApp(): void {
    this.http.get(this.baseUrl + this.quitUrl).subscribe(() => {}, e => console.error);
  }
}
