import { Component } from '@angular/core';
import { TrakingService } from 'src/app/core/plugins/tracking.service';
import { WebsocketService } from 'src/app/core/websocket/websocket.service';
import { State } from 'src/app/core/state/state.service';
import { FApp } from 'src/app/core/state/models/f-app';
import { NavController } from '@ionic/angular';
import { FAppService } from 'src/app/core/api/app.service';
import { OptionsService } from 'src/app/core/f-app/options.service';
import { ColorEvent } from 'ngx-color';

@Component({
  selector: 'app-randomflashing',
  templateUrl: './randomflashing.page.html',
  styleUrls: ['./randomflashing.page.scss'],
})
export class RandomflashingPage {
  public fApp: FApp;
  public parameters: { h: number, s: number, v: number };
  constructor(
    public websocket: WebsocketService,
    private state: State,
    public nav: NavController,
    public http: FAppService,
    public options: OptionsService,
    public tracker: TrakingService
  ) {
    this.fApp = this.state.fAppList.findByName('RandomFlashing');

    this.tracker.playEvent('RandomFlashing');
    this.websocket.init();
    const colors = this.options.current.params.colors;
    console.log(colors);
    this.parameters = { h : colors[0], s: colors[1], v: colors[2]};
  }

  sendOption(event: ColorEvent) {
    this.websocket.sendMessage({
      colors: [
        event.color.hsv.h,
        event.color.hsv.s,
        event.color.hsv.v
      ]
    });
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
