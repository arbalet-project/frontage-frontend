import { Component, OnInit, ViewChild } from '@angular/core';
import { TrakingService } from 'src/app/core/plugins/tracking.service';
import { WebsocketService } from 'src/app/core/websocket/websocket.service';
import { State } from 'src/app/core/state/state.service';
import { FApp } from 'src/app/core/state/models/f-app';
import { NavController } from '@ionic/angular';
import { FAppService } from 'src/app/core/api/app.service';
import { OptionsService } from 'src/app/core/f-app/options.service';
import { RandomflashingListComponent } from 'src/app/components/fapp/randomflashing/randomflashing.component';

@Component({
  selector: 'app-randomflashing',
  templateUrl: './randomflashing.page.html',
  styleUrls: ['./randomflashing.page.scss'],
})
export class RandomflashingPage {
  public fApp: FApp;
  @ViewChild('randomFlashing') randomFlashing: RandomflashingListComponent;
  
  public defaultValue = "";

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
  }

  sendOption() {
    const color = this.randomFlashing.colors.get(this.randomFlashing.list.value);
    this.websocket.sendMessage({
      colors: [
        color.h,
        color.s,
        color.v
      ]
    });
  }

  stopFApp() {
    this.nav.navigateBack('/f-app');
  }

  ionViewDidLeave() {
    // Stop connection.
    if (!this.websocket.externalClose) {
      this.http.stopApp();
      this.websocket.close();
    }
  }
}
