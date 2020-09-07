import { Component, OnInit } from '@angular/core';
import { FApp } from 'src/app/core/state/models/f-app';
import { OptionsService } from 'src/app/core/f-app/options.service';
import { State } from 'src/app/core/state/state.service';
import { TrakingService } from 'src/app/core/plugins/tracking.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
})
export class OptionsPage implements OnInit {
  fApp: FApp;
  value = 'french';

  constructor(
    public state: State,
    public options: OptionsService,
    public tracker: TrakingService
  ) {}

  ngOnInit() {
    this.tracker.selectEvent('Flags');
    this.fApp = this.state.fAppList.findByName('Flags');
  }

  onChange(event) {
    this.value = event.detail.value;
  }

  startFApp() {
    this.options.startFapp(
      {
        name: this.fApp.name,
        params: {
          uapp: this.value,
        },
      },
      '/f-app/flags'
    );
  }
}
