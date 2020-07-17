import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() labelKey: string;
  @Input() list: Array<string>;

  constructor() {
    console.log(this.list);
    console.log("blabal")
   }

  ngOnInit() {
    console.log("blabal")
  }

}
