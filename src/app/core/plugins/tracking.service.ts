import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrakingService {
  baseUrl = `${environment.trackingUrl}`;
  baseTracker = '/matomo.php?rec=1&idsite=3';

  constructor(public http: HttpClient) { }

  public connection() {
    this.http.post(this.baseUrl + this.baseTracker + '&action_name=Connection', '').subscribe();
  }

  public selectEvent(name: string) {
    this.http.post(this.baseUrl + this.baseTracker + '&e_c=' + name + '&e_a=Select', '').subscribe();
  }

  public playEvent(name: string) {
    this.http.post(this.baseUrl + this.baseTracker + '&e_c=' + name + '&e_a=Play', '').subscribe();
  }


}
