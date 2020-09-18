import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { State } from 'src/app/core/state/state.service';
import { FApp } from 'src/app/core/state/models/f-app';
import { OptionsService } from 'src/app/core/f-app/options.service';
import { ColorlistComponent } from 'src/app/components/fapp/sweeprand/colorlist/colorlist.component';
import { TrakingService } from 'src/app/core/plugins/tracking.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
})
export class OptionsPage implements OnInit {
  public fApp: FApp;

  @ViewChild('colorList') colorList: ColorlistComponent;

  constructor(
    public state: State,
    public options: OptionsService,
    public tracker: TrakingService
  ) {
    this.tracker.selectEvent('SweepRand');
  }

  ngOnInit() {
    this.fApp = this.state.fAppList.findByName('SweepRand');
  }

  startFApp() {
    this.options.startFapp(
      {
        name: this.fApp.name,
        params: {
          uapp: this.colorList.radio.value,
        },
      },
      '/f-app/sweeprand'
    );
  }

  startForcedApp() {
    this.options.startForcedFApp(
      {
        name: this.fApp.name,
        params: {
          uapp: this.colorList.radio.value,
        },
      },
      '/f-app/sweeprand'
    );
  }
}
