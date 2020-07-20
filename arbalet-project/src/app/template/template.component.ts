import { Component, OnInit, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
})
export class TemplateComponent {

  @Input() headerTemplate: TemplateRef<any>;

  constructor() {}
}
