import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
})
export class TemplateComponent implements OnInit {
  @Input() name: string;
  @Output() start = new EventEmitter();

  constructor() { }

  ngOnInit() { }

}
