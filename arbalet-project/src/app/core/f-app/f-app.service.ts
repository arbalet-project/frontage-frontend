import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FAppService {
  private baseUrl = environment.backEndBaseUrl;
  private listUrl = "/b/apps";
  constructor(public http: HttpClient) { }

  public getList() {
    return this.http.get(this.baseUrl + this.listUrl);
  }
}
