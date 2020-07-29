import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

// Models
import { Status, StatusFacade } from './models/status';
import { CalendarResponse, LifeTimeResponse } from './models/settings';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.backEndBaseUrl;
  private statusServerUrl = '/status/is_up';
  private statusFacadeUrl = '/frontage/status';
  private calendarUrl = '/b/admin/cal';
  private timeUrl = '/b/admin/state';
  private lifeTimeUrl = '/b/admin/settings';
  constructor(private http: HttpClient) {}

  public statusServer(): Observable<Status> {
    return this.http.get<Status>(this.baseUrl + this.statusServerUrl);
  }

  public statusFacade(): Observable<StatusFacade> {
    return this.http.get<StatusFacade>(this.baseUrl + this.statusFacadeUrl);
  }

  public getCalendar(): Observable<CalendarResponse> {
    return this.http.get<CalendarResponse>(this.baseUrl + this.calendarUrl);
  }

  public setTime(on: boolean, time: string, offset: number) {
    this.http
      .patch(
        this.baseUrl + this.timeUrl,
        on
          ? { time_on: time, offset_time_on: offset }
          : { time_off: time, offset_time_off: offset }
      )
      .subscribe();
  }


  public getLifeTime(): Observable<LifeTimeResponse> {
    return this.http.get<LifeTimeResponse>(this.baseUrl + this.lifeTimeUrl);

  }

  public updateLifeTime(lifetime: number) {
    this.http.post(this.baseUrl + this.lifeTimeUrl, {
      default_lifetime: lifetime,
    }).subscribe();
  }

}
