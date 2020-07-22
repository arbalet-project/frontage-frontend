import { Component, OnInit } from '@angular/core';
import { FApp } from 'src/app/core/state/models/f-app';
import { WebsocketService } from 'src/app/core/websocket/websocket.service';
import { NavController } from '@ionic/angular';
import { FAppService } from 'src/app/core/api/app.service';
import { State } from 'src/app/core/state/state.service';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-flags',
  templateUrl: './flags.page.html',
  styleUrls: ['./flags.page.scss'],
})
export class FlagsPage implements OnInit {
  public fApp: FApp;
  public defaultValue : string;

  constructor(
    private state: State,
    public websocket: WebsocketService,
    public nav: NavController,
    public http: FAppService,
    public auth: AuthenticationService
  ) {}

  ngOnInit() {
    this.fApp = this.state.fAppList.findByName('Flags');
    this.websocket.init();
    this.start();
  }

  start() {
    this.http.getCurrentFApp().subscribe(res => {
        if (res.userid === this.auth.userid || (res.is_forced && this.auth.admin)) {
          this.defaultValue = res.params.uapp
        } else {
          // Leaving this and ...
        }
      });
  }

  sendOption(event) {
    const parameters = {
      flag: event.detail.value
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
