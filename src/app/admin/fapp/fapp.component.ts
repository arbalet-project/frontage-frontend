import { Component } from '@angular/core';
import { State } from 'src/app/core/state/state.service';

@Component({
  selector: 'app-fapp',
  templateUrl: './fapp.component.html'})
export class FappComponent {

  constructor(public state: State) { }
}
