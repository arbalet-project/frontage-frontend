import { Component, OnInit } from '@angular/core';
import { State } from 'src/app/core/state/state.service';
import { FApp } from 'src/app/core/state/models/f-app';
import { WebsocketService } from 'src/app/core/websocket/websocket.service';
import { NavController, Platform } from '@ionic/angular';
import { FAppService } from 'src/app/core/api/app.service';
import { TrakingService } from 'src/app/core/plugins/tracking.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

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
    public tracker: TrakingService,
    private screen: ScreenOrientation,
    private platform: Platform
  ) {
    this.tracker.playEvent('Snake');
    if (this.platform.is('mobile')) {
      this.screen.lock(this.screen.ORIENTATIONS.LANDSCAPE);
    }
  }

  ngOnInit() {
    this.fApp = this.state.fAppList.findByName('Snake');
    this.websocket.init();
  }

  stopFApp() {
    this.nav.navigateBack('/f-app');
  }

  ionViewWillLeave() {
    if (!this.websocket.externalClose) {
      this.http.stopApp();
      this.websocket.close();
    }

    if (this.platform.is('mobile')) {
      this.screen.lock(this.screen.ORIENTATIONS.PORTRAIT);
      this.screen.unlock();
    }
  }
}
