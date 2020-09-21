import { Component, OnInit, ViewChild } from '@angular/core';
import { FApp } from 'src/app/core/state/models/f-app';
import { OptionsService } from 'src/app/core/f-app/options.service';
import { State } from 'src/app/core/state/state.service';
import { WebsocketService } from 'src/app/core/websocket/websocket.service';
import { NavController } from '@ionic/angular';
import { FAppService } from 'src/app/core/api/app.service';
import { ColorlistComponent } from 'src/app/components/fapp/sweeprand/colorlist/colorlist.component';
import { TrakingService } from 'src/app/core/plugins/tracking.service';

@Component({
  selector: 'app-sweeprand',
  templateUrl: './sweeprand.page.html',
})
export class SweeprandPage implements OnInit {
  public fApp: FApp;
  public defaultValue: string;
  @ViewChild('colorList') colorList: ColorlistComponent;

  constructor(
    private state: State,
    public websocket: WebsocketService,
    public nav: NavController,
    public http: FAppService,
    public options: OptionsService,
    public tracker: TrakingService
  ) {
    this.tracker.playEvent('SweepRand');
  }

  ngOnInit() {
    this.fApp = this.state.fAppList.findByName('SweepRand');
    this.websocket.init();
    this.defaultValue = this.options.current.params.uapp;
  }

  sendValue() {
    this.websocket.sendMessage({
      uapp: this.colorList.radio.value,
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
