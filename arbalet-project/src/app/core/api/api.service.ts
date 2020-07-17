import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

// Models
import { Status, StatusFacade } from './models/status';
import { CalendarResponse } from './models/calendar';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.backEndBaseUrl;
  private statusServerUrl = '/status/is_up';
  private statusFacadeUrl = '/frontage/status';
  private calendarUrl = '/b/admin/cal';

  constructor(private http: HttpClient) { }

  public statusServer(): Observable<Status> {
    return this.http.get<Status>(this.baseUrl + this.statusServerUrl);
  }

  public statusFacade(): Observable<StatusFacade> {
    return this.http.get<StatusFacade>(this.baseUrl + this.statusFacadeUrl);
  }

  public getCalendar(): Observable<CalendarResponse> {
    return this.http.get<CalendarResponse>(this.baseUrl + this.calendarUrl);
  }
}
