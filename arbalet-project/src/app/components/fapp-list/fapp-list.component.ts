import { Component, Input } from '@angular/core';
import { State } from 'src/app/core/state/state.service';

@Component({
  selector: 'app-fapp-list',
  templateUrl: './fapp-list.component.html',
  styleUrls: ['./fapp-list.component.scss'],
})
export class FappListComponent {

  @Input() adminView;

  constructor(public state: State) {
   }

}
