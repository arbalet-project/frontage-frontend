import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FApp, ResponseLaunch } from './models/f-app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FAppService {
  private baseUrl = environment.backEndBaseUrl;
  private listUrl = '/b/apps';
  private launchUrl = '/b/apps/running';

  constructor(public http: HttpClient) { }

  public getList(): Observable<[FApp]>{
    return this.http.get<[FApp]>(this.baseUrl + this.listUrl);
  }

  public launchFApp(fAppOptions: any): Observable<ResponseLaunch> { // TODO : remove any
    return this.http.post<ResponseLaunch>(this.baseUrl + this.launchUrl, fAppOptions);
  }
}
