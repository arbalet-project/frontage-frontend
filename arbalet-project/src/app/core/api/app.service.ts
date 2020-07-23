import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FApp } from '../state/models/f-app';
import { Observable } from 'rxjs';
import { Launch, CurrentFApp, Position, KeepAlive } from './models/f-app';

@Injectable({
  providedIn: 'root'
})
export class FAppService {
  private baseUrl = environment.backEndBaseUrl;
  private listUrl = '/b/apps';
  private launchUrl = '/b/apps/running';
  private positionUrl = '/b/apps/position';
  private quitUrl = '/b/queue/quit';
  private keepUrl = '/b/apps/iamalive';

  constructor(private http: HttpClient) { }

  public getList(): Observable<[FApp]>{
    return this.http.get<[FApp]>(this.baseUrl + this.listUrl);
  }

  public launchFApp(fAppOptions: any): Observable<Launch> { // TODO : remove any
    return this.http.post<Launch>(this.baseUrl + this.launchUrl, fAppOptions);
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
    this.http.get(this.baseUrl + "/b/queue/quit");
  }

}
