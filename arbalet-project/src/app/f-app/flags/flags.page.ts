import { Component, OnInit } from '@angular/core';
import { FAppListService } from 'src/app/core/f-app/f-app-list.service';
import { FApp } from 'src/app/core/f-app/models/f-app';
import { OptionsService } from 'src/app/core/f-app/options.service';
import { WebsocketService } from 'src/app/core/websocket/websocket.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-flags',
  templateUrl: './flags.page.html',
  styleUrls: ['./flags.page.scss'],
})
export class FlagsPage implements OnInit {
  public fApp: FApp;

  constructor(private fAppList: FAppListService, public websocket: WebsocketService, public nav: NavController) { }

  ngOnInit() {
    this.fApp = this.fAppList.findByName('Flags');
    this.websocket.init();
  }

  sendOption() {
    let params = {
      flag: "France"
    }
    console.log(params.toString());
    this.websocket.sendMessage(params.toString());
  }

  stopFApp() {
    this.nav.pop();
  }

  ionViewDidLeave() {
    // Stop connection.
    console.log("Bye");
  }

}
