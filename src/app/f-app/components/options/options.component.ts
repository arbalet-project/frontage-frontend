import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-options-template',
  templateUrl: './options.component.html',
})
export class OptionsComponent {
  @Input() name: string;
  @Input() footerKey = 'options.start_button';
  @Input() enabledForcedFApp = true;

  @Output() startFApp = new EventEmitter();
  @Output() startForcedApp = new EventEmitter();

  constructor(public auth: AuthenticationService) { }
}
