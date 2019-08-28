import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../app/environment';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the TrackingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TrackingProvider {

  baseUrl: string;
  baseTracker: string;

  constructor(public http: HttpClient) {
    this.baseUrl = `${environment.trackingUrl}`;
    this.baseTracker = "/matomo.php?rec=1&idsite=3";
  }

  public selectEvent(name:string){
    this.http.post(this.baseUrl + this.baseTracker + "&e_c="+ name + "&e_a=Select", "").subscribe(response => console.log("ok"));
  }

  public playEvent(name: string){
    this.http.post(this.baseUrl + this.baseTracker + "&e_c="+ name + "&e_a=Play", "").subscribe(response => console.log("ok"));
  }

  public connection(){
    this.http.post(this.baseUrl + this.baseTracker + "&action_name=Connection", "").subscribe(response => console.log("ok"));
  }
}
