import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-footer-options',
  templateUrl: './footer-options.component.html'
})
export class FooterOptionsComponent implements OnInit {
  @Input() name: string;
  @Input() disabled: boolean;

  @Output() launch = new EventEmitter();
  constructor() { }

  ngOnInit() { }

}
