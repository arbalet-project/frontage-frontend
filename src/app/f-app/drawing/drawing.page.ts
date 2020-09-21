import { Component, OnInit } from '@angular/core';
import { TrakingService } from 'src/app/core/plugins/tracking.service';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { State } from 'src/app/core/state/state.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { WebsocketService } from 'src/app/core/websocket/websocket.service';
import { FApp } from 'src/app/core/state/models/f-app';
import { FAppService } from 'src/app/core/api/app.service';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { VibrationService } from 'src/app/core/plugins/vibration.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-drawing',
  templateUrl: './drawing.page.html',
  styleUrls: ['./drawing.page.scss'],
})
export class DrawingPage {
  public fApp: FApp;

  constructor(
    private tracker: TrakingService,
    private platform: Platform,
    public screen: ScreenOrientation,
    public state: State,
    public websocket: WebsocketService,
    public nav: NavController,
    public http: FAppService,
    public auth: AuthenticationService,
    public vibration: VibrationService,
    public alert: AlertController,
    public translate: TranslateService
  ) {
    this.tracker.playEvent('Drawing');
    this.fApp = this.state.fAppList.findByName('Drawing');
    if (this.platform.is('mobile')) {
      this.screen.lock(
        this.screen.ORIENTATIONS.LANDSCAPE
      );
    }

    this.websocket.init();
  }

  setColor(event: any) {
    console.log(event);
    this.websocket.sendMessage({pixel: { x : event.i, y : event.j}, color: {
      red : event.color.red,
      blue : event.color.blue,
      green : event.color.green
    }});
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

  changeModel() {
    this.http.sendScheduledDrawing().subscribe(async (resp) => {
      if (resp.done) {
        this.vibration.vibrate();
        const alert = await this.alert.create({
          header: this.translate.instant('f_app.' + this.fApp.name + '.admin.title'),
          message: this.translate.instant('f_app.' + this.fApp.name + '.admin.message'),
          buttons: [{
            text: 'OK',
            handler: async () => {
                await alert.dismiss();
                this.nav.pop();
              }
          }]
        });
        alert.present();
      }
    });
  }
}
