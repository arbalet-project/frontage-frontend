import { Component, OnInit } from '@angular/core';
import { FApp } from 'src/app/core/state/models/f-app';
import { WebsocketService } from 'src/app/core/websocket/websocket.service';
import { NavController } from '@ionic/angular';
import { FAppService } from 'src/app/core/api/app.service';
import { State } from 'src/app/core/state/state.service';

@Component({
  selector: 'app-flags',
  templateUrl: './flags.page.html',
  styleUrls: ['./flags.page.scss'],
})
export class FlagsPage implements OnInit {
  public fApp: FApp;
  public value: string;

  constructor(
    private state: State,
    public websocket: WebsocketService,
    public nav: NavController,
    public http: FAppService
  ) {}

  ngOnInit() {
    this.fApp = this.state.fAppList.findByName('Flags');
    this.websocket.init();
  }

  sendOption(event) {
    this.value = event.detail.value;
    const parameters = {
      flag: this.value,
    };
    this.websocket.sendMessage(parameters);
  }

  stopFApp() {
    this.nav.pop();
  }

  ionViewDidLeave() {
    // Stop connection.
    this.websocket.close();
    this.http.stopApp();
  }
}
