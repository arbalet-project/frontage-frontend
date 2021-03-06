import { Component, OnInit } from '@angular/core';
import { FApp } from 'src/app/core/state/models/f-app';
import { WebsocketService } from 'src/app/core/websocket/websocket.service';
import { NavController } from '@ionic/angular';
import { FAppService } from 'src/app/core/api/app.service';
import { State } from 'src/app/core/state/state.service';
import { OptionsService } from 'src/app/core/f-app/options.service';
import { TrakingService } from 'src/app/core/plugins/tracking.service';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-flags',
  templateUrl: './flags.page.html'
})
export class FlagsPage implements OnInit {
  public fApp: FApp;
  public defaultValue = '';

  constructor(
    private state: State,
    public websocket: WebsocketService,
    public nav: NavController,
    public http: FAppService,
    public options: OptionsService,
    public tracker: TrakingService,
    public auth: AuthenticationService
  ) { }

  ngOnInit() {
    this.tracker.playEvent('Flags');
    this.fApp = this.state.fAppList.findByName('Flags');
    this.websocket.init();
    this.defaultValue = this.options.current.params.flags;
  }

  sendOption(event) {
    this.websocket.sendMessage({
      flags: event.detail.value
    });
  }

  stopFApp() {
    let url = '/f-app';
    if (this.auth.admin) {
      url = '/admin/tabs/fapp';
    }
    this.nav.navigateBack(url);
  }

  ionViewDidLeave() {
    // Stop connection.
    if (!this.websocket.externalClose) {
      this.http.stopApp();
      this.websocket.close();
    }
  }
}
