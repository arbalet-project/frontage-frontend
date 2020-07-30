import { Component } from '@angular/core';
import { State } from '../core/state/state.service';

@Component({
  selector: 'app-f-app',
  templateUrl: './f-app.page.html'
})
export class FAppPage {
  constructor(public state: State) { }
}
