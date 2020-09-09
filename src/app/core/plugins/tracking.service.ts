import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TrakingService {
  baseUrl = `${environment.trackingUrl}`;
  baseTracker = `/matomo.php?rec=1&idsite=${environment.idTrackingSite}`;

  constructor(public http: HttpClient) {}

  public connection() {
    this.http
      .post(this.baseUrl + this.baseTracker + '&action_name=Connection', '')
      .subscribe(null, (_) => {});
  }

  public selectEvent(name: string) {
    this.http
      .post(
        this.baseUrl + this.baseTracker + '&e_c=' + name + '&e_a=Select',
        ''
      )
      .subscribe(null, (_) => {});
  }

  public playEvent(name: string) {
    this.http
      .post(this.baseUrl + this.baseTracker + '&e_c=' + name + '&e_a=Play', '')
      .subscribe(null, (_) => {});
  }
}
