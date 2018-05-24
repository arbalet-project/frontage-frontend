import { WebsocketMessageHandlerProvider } from './../../providers/websocket-message-handler/websocket-message-handler';
import { LocalStorageProvider } from './../../providers/local-storage/local-storage';
import { TranslateService } from '@ngx-translate/core';
import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { Subscription, Observable } from 'rxjs/Rx';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-waiting',
  templateUrl: 'waiting.html',
})
export class WaitingPage {
  WAITING_SERVER: string = "";
  ALREADY_QUEUED: string = "";
  QUEUED: string = "";
  STARTING: string = "";

  alertMessage: string = "";
  alertTitle: string = "";

  position: number;
  message: string;

  isAdmin: boolean = false;
  isLaunched: boolean = false;
  isWaitingServer: boolean = false;
  username: string;
  userid: string;
  token: string;

  joystickPage: any;
  joystickParams: any;

  positionSubscription: Subscription;

  constructor(private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public dataFAppsProvider: DataFAppsProvider,
    public tranlation: TranslateService, public localStorage: LocalStorageProvider, public translateService: TranslateService,
    public websocketHandler: WebsocketMessageHandlerProvider) {

    //Get the user login
    this.username = this.localStorage.getUserName();
    this.userid = this.localStorage.getUserId();
    this.isAdmin = this.localStorage.isAdmin();

    this.translateService.get("WAITING_KICK_FROM_QUEUE_MESSAGE").subscribe(translatedMesssage => {
      this.alertMessage = translatedMesssage;
    });
    this.translateService.get("WAITING_KICK_FROM_QUEUE_TITLE").subscribe(translatedMesssage => {
      this.alertTitle = translatedMesssage;
    });

    tranlation.get("WAITING_SERVER").subscribe(t => {
      this.WAITING_SERVER = t;
    });
    tranlation.get("ALREADY_QUEUED").subscribe(t => {
      this.ALREADY_QUEUED = t;
    });
    tranlation.get("QUEUED").subscribe(t => {
      this.QUEUED = t;
    });
    tranlation.get("STARTING").subscribe(t => {
      this.STARTING = t;
    });

    this.message = this.WAITING_SERVER;

    this.joystickPage = navParams.get('joystick');
    this.joystickParams = navParams.get('joystickParams')

    let serverResponse: any = navParams.get('info');

    //If queued then periodically check the position in the queue
    if (serverResponse.status === 400) {
      this.startApp();
    }

    if (serverResponse.queued) {
      this.positionSubscription = Observable.interval(1000)
        .subscribe(x => this.positionSubscriptionStart(x));
    } else if (serverResponse.status === 403) {
      this.message = this.ALREADY_QUEUED;
    } else if (serverResponse.status === 200) {
      this.startApp();
    } else {
      throw "WaitingPage : erreur la reponse HTTP du serveur est [" + serverResponse.status + "]";
    }
  }

  positionSubscriptionStart(x) {
    if (!this.isWaitingServer) {
      this.isWaitingServer = true;
      this.dataFAppsProvider.checkPosition()
        .subscribe(response => this.checkPosition(response));
    }
  }

  checkPosition(response: any) {
    this.position = response.position;

    this.message = this.QUEUED + this.position;

    this.isWaitingServer = false;
    if (this.position === -1) {
      if (!this.isLaunched) {
        this.isLaunched = true;
        this.startApp();
      }
    }
  }

  backButtonClick() {
    if (this.message !== this.WAITING_SERVER) {
      this.navCtrl.pop();
    }
  }

  backButtonAction() {
    if (this.message !== this.WAITING_SERVER) {
      this.navCtrl.pop();
    }
  }

  ionViewWillLeave() {
    if (!this.isLaunched && this.message !== this.WAITING_SERVER) {
      this.dataFAppsProvider.quitQueue();
    }

    if (this.positionSubscription) {
      this.positionSubscription.unsubscribe();
      this.positionSubscription = undefined;
    }

    this.navCtrl.swipeBackEnabled = true;
  }

  ionViewWillAppear() {
    this.navCtrl.swipeBackEnabled = false;
    this.isLaunched = false;
    this.isWaitingServer = false;
  }

  startApp() {
    this.dataFAppsProvider.getCurrentApp().subscribe(res => {
      //Check if the user is the owner of the current app
      if (this.userid == res.userid || res.is_forced && this.isAdmin) {
        this.message = this.STARTING;
        this.navCtrl.push(this.joystickPage, { joystickParams: this.joystickParams }).then(() => {
          this.navCtrl.remove(this.navCtrl.getPrevious().index);
        });
      } else {
        let popup = this.alertCtrl.create({
          title: this.alertTitle,
          message: this.alertMessage,
          enableBackdropDismiss: false,
          buttons: [{
            text: 'Ok',
            handler: () => {
              popup.dismiss().then(() => {
                this.navCtrl.pop();
              });
              return false;
            }
          }]
        });

        popup.present();
      }
    });
  }
}
