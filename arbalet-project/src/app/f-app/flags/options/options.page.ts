import { Component, OnInit } from '@angular/core';
import { FApp } from 'src/app/core/f-app/models/f-app';
import { FAppListService } from 'src/app/core/f-app/f-app-list.service';
import { OptionsService } from 'src/app/core/f-app/options.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss'],
})
export class OptionsPage implements OnInit {
  fApp: FApp;
  chooseValue = true;
  constructor(public fAppList: FAppListService, public fAppOptions: OptionsService) { }

  ngOnInit() {
    this.fApp = this.fAppList.findByName('Flags');
    this.fAppOptions.name = this.fApp.name;
  }

  onChange(event) {
   this.fAppOptions.parameters.flags = event.detail.value;
   this.chooseValue = false;
  }

  start() {

  }
}
