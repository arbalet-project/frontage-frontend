import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
})
export class TemplateComponent {

  @Input() headerTemplate: TemplateRef<any>;
  @Input() footerTemplate: TemplateRef<any>;
  @Input() displayFooter = true;
  @Input() titleKey: string;
  @Input() default: string;

  constructor() {
  }
}
