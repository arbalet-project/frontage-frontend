import { Component } from '@angular/core';
import { TrakingService } from 'src/app/core/plugins/tracking.service';
import { FAppService } from 'src/app/core/api/app.service';
import { WebsocketService } from 'src/app/core/websocket/websocket.service';
import { State } from 'src/app/core/state/state.service';
import { FApp } from 'src/app/core/state/models/f-app';
import { TranslateService } from '@ngx-translate/core';
import { interval, Subscription } from 'rxjs';
import { NavController, AlertController } from '@ionic/angular';

export interface SnapUser {
  id: string;
  username: string;
}

@Component({
  selector: 'app-snap',
  templateUrl: './snap.page.html',
  styleUrls: ['./snap.page.scss'],
})
export class SnapPage {
  public clientList: Array<SnapUser> = [];
  public selectedClient: number;
  public fApp: FApp;

  public offNickName;

  public subscribeInterval: Subscription;

  constructor(
    public tracker: TrakingService,
    public api: FAppService,
    public websocket: WebsocketService,
    public state: State,
    public translate: TranslateService,
    public nav: NavController,
    public alertController: AlertController
  ) {
    this.fApp = this.state.fAppList.findByName('Snap');
    this.tracker.playEvent('Live');
    this.offNickName = this.translate.instant(
      'f_app.' + this.fApp.name + '.username_off'
    );
    this.subscribeInterval = interval(2000).subscribe((_) => this.updateList());
  }

  changeUser(event) {
    this.api
      .setSnapUsers({
        selected_client: event.detail.value,
      })
      .subscribe((res) => {
        if (!res.success) {
          this.showPopup(
            this.translate.instant('f_app.' + this.fApp.name + '.inexist_client.title'),
            this.translate.instant('f_app.' + this.fApp.name + '.inexist_client.message')
          );
        }
      });
  }

  updateList() {
    this.api.getCurrentFApp().subscribe((response) => {
      if (response.name !== 'Snap') {
        this.showPopup(
          this.translate.instant('f_app.' + this.fApp.name + '.errors.title'),
          this.translate.instant('f_app.' + this.fApp.name + '.errors.message')
        );
      }
      this.api.getSnapUsers().subscribe((res) => {
        this.selectedClient = res.selected_client.id;
        this.clientList = res.list_clients;
        this.clientList.push({
          id: 'turnoff',
          username: this.translate.instant(
            'f_app.' + this.fApp.name + '.username_off'
          ),
        });
      });
    });
  }

  public async showPopup(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.nav.navigateForward('/f-app');
          },
        },
      ],
    });

    await alert.present();
  }

  ionViewDidLeave() {
    this.subscribeInterval.unsubscribe();
    this.subscribeInterval = undefined;
  }

  public stopFApp() {
    this.api.stopApp();
    this.nav.navigateForward('/f-app/snap/options');
  }
}
