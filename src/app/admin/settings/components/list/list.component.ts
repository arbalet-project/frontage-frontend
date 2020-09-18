import { Component, OnInit, Input } from '@angular/core';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() labelKey: string;
  @Input() list: Map<String,String>;
  @Input() default: string;

  public orderTime = (a: KeyValue<string, string>, b: KeyValue<string, string>): number => {
    return 0;
  }
}
