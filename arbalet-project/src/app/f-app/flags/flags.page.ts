import { Component, OnInit } from '@angular/core';
import { FApp } from 'src/app/core/state/models/f-app';
import { WebsocketService } from 'src/app/core/websocket/websocket.service';
import { NavController } from '@ionic/angular';
import { FAppService } from 'src/app/core/api/app.service';
import { State } from 'src/app/core/state/state.service';
import { OptionsService } from 'src/app/core/f-app/options.service';

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
    public options: OptionsService
  ) { }

  ngOnInit() {
    this.fApp = this.state.fAppList.findByName('Flags');
    this.websocket.init();
    this.defaultValue = this.options.current.params.uapp;
  }

  sendOption(event) {
    this.websocket.sendMessage({
      flag: event.detail.value
    });
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
