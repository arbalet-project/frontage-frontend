import { Component, OnInit } from '@angular/core';
import { State } from 'src/app/core/state/state.service';
import { FApp } from 'src/app/core/state/models/f-app';
import { WebsocketService } from 'src/app/core/websocket/websocket.service';
import { NavController } from '@ionic/angular';
import { FAppService } from 'src/app/core/api/app.service';
import { TrakingService } from 'src/app/core/plugins/tracking.service';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.page.html',
  styleUrls: ['./snake.page.scss'],
})
export class SnakePage implements OnInit {
  public fApp: FApp;

  constructor(
    public state: State,
    public websocket: WebsocketService,
    public nav: NavController,
    public http: FAppService,
    public tracker: TrakingService
  ) {
    this.tracker.playEvent('Snake');
  }

  ngOnInit() {
    this.fApp = this.state.fAppList.findByName('Snake');
    this.websocket.init();
  }

  stopFApp() {
    this.nav.pop();
  }

  ionViewWillLeave() {
    this.websocket.close();
    if (!this.websocket.externalClose) {
      this.http.stopApp();
    }
  }
}
