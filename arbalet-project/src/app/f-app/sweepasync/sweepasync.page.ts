import { Component, OnInit } from '@angular/core';
import { State } from 'src/app/core/state/state.service';
import { FApp } from 'src/app/core/state/models/f-app';
import { WebsocketService } from 'src/app/core/websocket/websocket.service';
import { FAppService } from 'src/app/core/api/app.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-sweepasync',
  templateUrl: './sweepasync.page.html',
  styleUrls: ['./sweepasync.page.scss'],
})
export class SweepasyncPage implements OnInit {

  public fApp: FApp;

  constructor(public state: State, public websocket: WebsocketService, public http: FAppService, public nav: NavController) { }

  ngOnInit() {
    this.fApp = this.state.fAppList.findByName('SweepAsync');
    this.websocket.init();
  }

  stopFApp() {
    this.nav.pop();
  }

  ionViewDidLeave() {
    // Stop connection.
    this.websocket.close();
    if (!this.websocket.externalClose) {
      this.http.stopApp();
    }
  }

}
