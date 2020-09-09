import { Component, OnInit, Input } from '@angular/core';
import { FApp } from 'src/app/core/state/models/f-app';
import { State } from 'src/app/core/state/state.service';
import { FAppService } from 'src/app/core/api/app.service';
import { TrakingService } from 'src/app/core/plugins/tracking.service';
import { OptionsService } from 'src/app/core/f-app/options.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
})
export class OptionsComponent implements OnInit {
  public fApp: FApp;

  constructor(
    public state: State,
    public tracker: TrakingService,
    public options: OptionsService
  ) {
    this.tracker.selectEvent('Live');
  }

  ngOnInit() {
    this.fApp = this.state.fAppList.findByName('Snap');
  }

  startFApp() {
    this.options.startForcedFApp(
      {
        name: this.fApp.name,
      },
      '/f-app/snap'
    );
  }
}
