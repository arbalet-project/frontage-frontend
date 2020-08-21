import { Component, Input, TemplateRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
})
export class TemplateComponent {

  @Input() headerTemplate: TemplateRef<any>;
  @Input() titleKey: string;
  @Input() default: string;

  @Input() footerTemplate: TemplateRef<any>;
  @Input() displayFooter = true;
  @Input() footerKey: string;
  @Input() footerIcon: string;

  @Output() clickButton = new EventEmitter();

  constructor() {
  }
}
