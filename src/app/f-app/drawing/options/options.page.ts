import { Component, OnInit } from '@angular/core';
import { FApp } from 'src/app/core/state/models/f-app';
import { State } from 'src/app/core/state/state.service';
import { OptionsService } from 'src/app/core/f-app/options.service';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { TrakingService } from 'src/app/core/plugins/tracking.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
})
export class OptionsPage implements OnInit {
  public fApp: FApp;

  constructor(
    public state: State,
    public options: OptionsService,
    public auth: AuthenticationService,
    public tracker: TrakingService
  ) {}

  ngOnInit() {
    this.fApp = this.state.fAppList.findByName('Drawing');
    this.tracker.selectEvent('Drawing');
  }

  startFApp() {
    this.options.startFapp(
      {
        name: this.fApp.name,
        hideParams: true,
        params: {
          model: '',
        },
      },
      '/f-app/drawing'
    );
  }
}
