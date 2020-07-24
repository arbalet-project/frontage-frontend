import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { State } from 'src/app/core/state/state.service';
import { FApp } from 'src/app/core/state/models/f-app';
import { WebsocketService } from 'src/app/core/websocket/websocket.service';
import { FAppService } from 'src/app/core/api/app.service';

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
  ) {
  }

  ngOnInit() {
    this.fApp = this.state.fAppList.findByName('Tetris');
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
