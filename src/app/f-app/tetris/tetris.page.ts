import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { State } from 'src/app/core/state/state.service';
import { FApp } from 'src/app/core/state/models/f-app';
import { WebsocketService } from 'src/app/core/websocket/websocket.service';
import { FAppService } from 'src/app/core/api/app.service';
import { TrakingService } from 'src/app/core/plugins/tracking.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-tetris',
  templateUrl: './tetris.page.html',
  styleUrls: ['./tetris.page.scss'],
})
export class TetrisPage implements OnInit {
  public fApp: FApp;

  constructor(
    public nav: NavController,
    public state: State,
    public websocket: WebsocketService,
    public http: FAppService,
    public tracker: TrakingService,
    private screen: ScreenOrientation,
    private platform: Platform
  ) {
    this.tracker.playEvent('Tetris');
    if (this.platform.is('mobile')) {
      this.screen.lock(this.screen.ORIENTATIONS.LANDSCAPE);
    }
  }

  ngOnInit() {
    this.fApp = this.state.fAppList.findByName('Tetris');
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
