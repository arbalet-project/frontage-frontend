import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-options-template',
  templateUrl: './options.component.html',
})
export class OptionsComponent {
  @Input() name: string;
  @Output() start = new EventEmitter();

  constructor() { }
}
