import { Component, OnInit } from '@angular/core';
import { State } from 'src/app/core/state/state.service';
import { FApp } from 'src/app/core/state/models/f-app';
import { WebsocketService } from 'src/app/core/websocket/websocket.service';
import { FAppService } from 'src/app/core/api/app.service';
import { NavController } from '@ionic/angular';
import { TrakingService } from 'src/app/core/plugins/tracking.service';

@Component({
  selector: 'app-sweepasync',
  templateUrl: './sweepasync.page.html',
})
export class SweepasyncPage implements OnInit {
  public fApp: FApp;

  constructor(
    public state: State,
    public websocket: WebsocketService,
    public http: FAppService,
    public nav: NavController,
    public tracker: TrakingService
  ) {
    this.tracker.playEvent('SweepAsync');
  }

  ngOnInit() {
    this.fApp = this.state.fAppList.findByName('SweepAsync');
    this.websocket.init();
  }

  stopFApp() {
    this.nav.pop();
  }

  ionViewDidLeave() {
    // Stop connection.
    if (!this.websocket.externalClose) {
      this.http.stopApp();
      this.websocket.close();
    }
  }
}
