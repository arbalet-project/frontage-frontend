import { Component, OnInit } from '@angular/core';
import { FApp } from 'src/app/core/state/models/f-app';
import { State } from 'src/app/core/state/state.service';
import { OptionsService } from 'src/app/core/f-app/options.service';
import { TrakingService } from 'src/app/core/plugins/tracking.service';
import { ColorEvent } from 'ngx-color';

@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss'],
})
export class OptionsPage implements OnInit {
  fApp: FApp;
  color = {h: 2.01158940397351, s: 0, v: 1, a: 1};

  constructor(
    public state: State,
    public options: OptionsService,
    public tracker: TrakingService,
  ) {
    this.tracker.selectEvent('RandomFlashing');
  }

  ngOnInit() {
    this.fApp = this.state.fAppList.findByName('RandomFlashing');
  }

  handleChange(event: ColorEvent) {
    this.color =  event.color.hsv;
  }

  startFApp() {
    this.options.startFapp(
      {
        name: this.fApp.name,
        params: {
          colors: [
            this.color.h,
            this.color.s,
            this.color.v
          ]
        },
      },
      '/f-app/randomflashing'
    );
  }


  startForcedApp() {
    this.options.startForcedFApp(
      {
        name: this.fApp.name,
        params: {
          colors: [
            this.color.h,
            this.color.s,
            this.color.v
          ]
        },
      },
      '/f-app/randomflashing'
    );
  }
}
