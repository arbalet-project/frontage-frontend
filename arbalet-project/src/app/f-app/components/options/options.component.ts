import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-options-template',
  templateUrl: './options.component.html',
})
export class OptionsComponent {
  @Input() name: string;
  @Input() footerKey: string = "options.start_button";

  @Output() startFApp = new EventEmitter();

  constructor() { }
}
