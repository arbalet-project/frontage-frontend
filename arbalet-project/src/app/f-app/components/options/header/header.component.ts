import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-options',
  templateUrl: './header.component.html',
})
export class HeaderOptionsComponent {
  @Input() name: string;

  constructor() { }
}
