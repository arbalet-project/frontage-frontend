import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-radio-list',
  templateUrl: './radio-list.component.html',
  styleUrls: ['./radio-list.component.scss'],
})
export class RadioListComponent {

  @Input() defaultValue: string;
  @Input() keyLabel: string;
  @Input() list: string;

  constructor() { }
}
