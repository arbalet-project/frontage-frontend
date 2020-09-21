import { Injectable } from '@angular/core';
import { Frontage } from './models/frontage';
import { FAppList } from './f-app-list.service';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class State {
  public frontage: Frontage = {} as Frontage;

  constructor(public fAppList: FAppList, private api: ApiService) { }

  updateState(): Observable<void> {
    return this.api.statusFacade().pipe(map(status => {
      this.frontage.currentApp = status.current_app;
      this.frontage.currentTime = status.current_time;
      this.frontage.height = status.height;
      this.frontage.width = status.width;
      this.frontage.disabled = status.disabled;
      this.frontage.forced = status.is_forced;
      this.frontage.usable = status.is_usable;
      this.frontage.state = status.state;
      this.frontage.nextOnTime = status.next_on_time;
    }));
  }
}
