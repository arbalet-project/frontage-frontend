import { Component, OnInit } from '@angular/core';
import { FApp } from 'src/app/core/f-app/models/f-app';
import { FAppListService } from 'src/app/core/f-app/f-app-list.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss'],
})
export class OptionsPage implements OnInit {
  fApp: FApp;

  constructor(public fAppList: FAppListService) { }

  ngOnInit() {
    this.fApp = this.fAppList.findByName('Flags');
    console.log(this.fApp);
  }

}
