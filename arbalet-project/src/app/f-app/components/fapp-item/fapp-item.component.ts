import { Component, OnInit, Input } from '@angular/core';
import { FApp } from 'src/app/core/f-app/models/f-app';

@Component({
  selector: 'app-fapp-item',
  templateUrl: './fapp-item.component.html',
  styleUrls: ['./fapp-item.component.scss'],
})
export class FappItemComponent implements OnInit {
  @Input() fApp : FApp;

  constructor() { }

  ngOnInit() {}

}
