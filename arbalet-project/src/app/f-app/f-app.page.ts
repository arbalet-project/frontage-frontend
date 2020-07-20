import { Component, OnInit } from '@angular/core';
import { State } from '../core/state/state.service';

@Component({
  selector: 'app-f-app',
  templateUrl: './f-app.page.html',
  styleUrls: ['./f-app.page.scss'],
})
export class FAppPage {
  constructor(public state: State) {}
}
