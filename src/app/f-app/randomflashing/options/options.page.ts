import { Component, OnInit, ViewChild } from '@angular/core';
import { FApp } from 'src/app/core/state/models/f-app';
import { State } from 'src/app/core/state/state.service';
import { OptionsService } from 'src/app/core/f-app/options.service';
import { TrakingService } from 'src/app/core/plugins/tracking.service';
import { RandomflashingListComponent } from 'src/app/components/fapp/randomflashing/randomflashing.component';

@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss'],
})
export class OptionsPage implements OnInit {
  fApp: FApp;
  @ViewChild('randomFlashing') randomFlashing: RandomflashingListComponent;

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

  startFApp() {
    const color = this.randomFlashing.colors.get(this.randomFlashing.list.value);
    this.options.startFapp(
      {
        name: this.fApp.name,
        params: {
          colors: [
            color.h,
            color.s,
            color.v
          ]
        },
      },
      '/f-app/randomflashing'
    );
  }


  startForcedApp() {
    const color = this.randomFlashing.colors.get(this.randomFlashing.list.value);

    this.options.startForcedFApp(
      {
        name: this.fApp.name,
        params: {
          colors: [
            color.h,
            color.s,
            color.v
          ]
        },
      },
      '/f-app/randomflashing'
    );
  }
}
