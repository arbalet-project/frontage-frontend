import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CalendarResponse } from './models/times';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimesService {

  private baseUrl = environment.backEndBaseUrl;
  private calendarUrl = '/b/admin/cal';

  constructor(private http: HttpClient) { }

  getCalendar(): Observable<CalendarResponse> {
    return this.http.get<CalendarResponse>(this.baseUrl + this.calendarUrl);
  }
}
