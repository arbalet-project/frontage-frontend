import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fapp-list',
  templateUrl: './fapp-list.component.html',
  styleUrls: ['./fapp-list.component.scss'],
})
export class FappListComponent {

  @Input() adminView;
  @Input() list;
  constructor() {
   }

}
