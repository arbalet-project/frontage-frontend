import { Component, Input, TemplateRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
})
export class TemplateComponent implements OnInit  {

  @Input() headerTemplate: TemplateRef<any>;
  @Input() footerTemplate: TemplateRef<any>;
  @Input() displayFooter: boolean = true;
  @Input() titleKey: string;
  @Input() default: string;

  constructor() {
  }
  ngOnInit() {
    console.log(this.displayFooter)
    console.log("test")
  }

}
