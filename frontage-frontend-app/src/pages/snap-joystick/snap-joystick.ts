import { WebsocketMessageHandlerProvider } from './../../providers/websocket-message-handler/websocket-message-handler';
import { Observable, Subscription } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { environment } from './../../app/environment';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core'


/**
 * Generated class for the SnapJoystickPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-snap-joystick',
  templateUrl: 'snap-joystick.html',
})
export class SnapJoystickPage {
  selectedClient: string;
  clientsList: string[];

  baseUrl: string;
  authorizeEndpoint: string = "/authorize";
  clientsEndpoint: string = "/clients";

  updateListSubscription: Subscription;
  isWaiting: Boolean = false;
  isClosedExternaly: Boolean=false;

  inexistingClientMessage : string = "";
  inexistingClientTitle : string = "";
  snapClosedTitle : string = "";
  snapClosedMessage: string = "";

  offNickname: string = "";
  offCode: string = "turnoff";

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataFAppsProvider: DataFAppsProvider,
              public translateService: TranslateService, public http: HttpClient, private alertCtrl: AlertController,
              public websocketMessageHandler: WebsocketMessageHandlerProvider) {
    this.baseUrl = `${environment.snapBaseUrl}`;

    this.updateListSubscription = Observable.interval(500)
      .subscribe(() => this.updateList());

    this.translateService.get("INEXISTING_SNAP_CLIENT").subscribe(translatedMesssage => {
      this.inexistingClientMessage = translatedMesssage;
    });

    this.translateService.get("INEXISTING_SNAP_CLIENT_TITLE").subscribe(translatedMesssage => {
      this.inexistingClientTitle = translatedMesssage;
    });

    this.translateService.get("SNAP_APP_NOT_RUNNING_TITLE").subscribe(translatedMesssage => {
      this.snapClosedTitle = translatedMesssage;
    });

    this.translateService.get("SNAP_APP_NOT_RUNNING").subscribe(translatedMesssage => {
      this.snapClosedMessage = translatedMesssage;
    });

    this.translateService.get("SNAP_OFF_NICKNAME").subscribe(translatedMesssage => {
      this.offNickname = translatedMesssage;
    });

    websocketMessageHandler.initSocket(navCtrl);
  }

  showPopUp(title, message, navCtrl) {
    let popUp = this.alertCtrl.create({
      title: title,
      message: message,
      enableBackdropDismiss: false,
      buttons: [{
        text: 'Ok',
        handler: () => {
          popUp.dismiss().then(() => {
            navCtrl.pop();
          });
          return false;
        }
      }]
    });

    popUp.present();
    }

  updateList() {
    if (!this.isWaiting) {
      this.isWaiting = true;
      this.getClientsInfo();
    }
  }

  getClientsInfo() {
    this.http.get<any>(this.baseUrl + this.clientsEndpoint)
      .subscribe(
        response => this.handleGetClientsInfoResponse(response),
        err => this.dataFAppsProvider.getCurrentApp().subscribe(response => this.checkSnapIsStillRunning(response))
      );
  }

  handleGetClientsInfoResponse(response) {
    this.selectedClient = response.selected_client == this.offCode? this.offNickname : response.selected_client;
    this.clientsList = [this.offNickname].concat(response.list_clients);
    this.isWaiting = false;
  }

  authorize() {
    let body = {
      selected_client: this.selectedClient == this.offNickname? this.offCode : this.selectedClient
    };

    this.http.post<any>(this.baseUrl + this.authorizeEndpoint, body)
      .subscribe(
        response => this.handleAuthorizeResponse(response.success)
      );
  }

  handleAuthorizeResponse(success) {
    if(!success) {
        let popUp = this.alertCtrl.create({
          title: this.inexistingClientTitle,
          message: this.inexistingClientMessage,
          buttons: [{
            text: 'OK'
          }]
        });

        popUp.present();
    }
  }

  checkSnapIsStillRunning(response) {
     if(response != "Snap") {
         this.showPopUp(this.snapClosedTitle, this.snapClosedMessage, this.navCtrl);
     }
  }

  ionViewWillEnter() {
    this.isWaiting = false;
  }

  ionViewDidLeave() {
    if (!this.websocketMessageHandler.isExternalyClaused()) {
      this.websocketMessageHandler.closeSocket();
    }
    if (this.updateListSubscription) {
      this.updateListSubscription.unsubscribe();
      this.updateListSubscription = undefined;
    }

    this.websocketMessageHandler.stopKeepAliveSender();
  }

  stopFApp() {
    this.navCtrl.pop();
  }
}
