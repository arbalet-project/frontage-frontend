import { Component } from '@angular/core';
import { State } from '../core/state/state.service';
import { TrakingService } from '../core/plugins/tracking.service';

@Component({
  selector: 'app-f-app',
  templateUrl: './f-app.page.html'
})
export class FAppPage {
  constructor(public state: State, public tracker: TrakingService) {
    this.tracker.connection();
   }
}
