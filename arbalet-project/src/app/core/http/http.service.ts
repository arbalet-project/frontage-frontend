import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Status } from './models/status';
import { StatusFacade } from './models/facade';


@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseUrl = environment.backEndBaseUrl;
  private statusServerUrl = '/status/is_up';
  private statusFacadeUrl = '/frontage/status';

  constructor(private http: HttpClient) {}

  public statusServer(): Observable<Status> {
    return this.http.get<Status>(this.baseUrl + this.statusServerUrl);
  }

  public statusFacade(): Observable<StatusFacade> {
    return this.http.get<StatusFacade>(this.baseUrl + this.statusFacadeUrl);
  }
}
