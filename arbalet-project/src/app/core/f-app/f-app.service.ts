import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FApp } from './models/f-app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FAppService {
  private baseUrl = environment.backEndBaseUrl;
  private listUrl = '/b/apps';
  constructor(public http: HttpClient) { }

  public getList(): Observable<[FApp]>{
    return this.http.get<[FApp]>(this.baseUrl + this.listUrl);
  }
}
