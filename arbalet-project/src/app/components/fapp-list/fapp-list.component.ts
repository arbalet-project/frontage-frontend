import { Component, OnInit, Input } from '@angular/core';
import { State } from 'src/app/core/state/state.service';

@Component({
  selector: 'app-fapp-list',
  templateUrl: './fapp-list.component.html',
  styleUrls: ['./fapp-list.component.scss'],
})
export class FappListComponent implements OnInit {

  @Input() adminView;

  constructor(public state: State) {
   }

  ngOnInit() {
    console.log(this.adminView)
  }

}
