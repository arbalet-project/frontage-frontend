import { WebsocketMessageHandlerProvider } from './../../providers/websocket-message-handler/websocket-message-handler';
import { LocalStorageProvider } from './../../providers/local-storage/local-storage';
import { TranslateService } from '@ngx-translate/core';
import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { Subscription, Observable } from 'rxjs/Rx';
import { Component } from '@angular/core';
import { Vibration } from '@ionic-native/vibration';
import { NavController, NavParams, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-waiting',
  templateUrl: 'waiting.html',
})
export class WaitingPage {
  WAITING_SERVER: string = "";
  QUEUED: string = "";
  STARTING: string = "";

  alertMessage: string = "";
  alertTitle: string = "";

  position: number;
  message: string;

  isAdmin: boolean = false;
  isLaunched: boolean = false;
  isLeavingQueue: boolean = false;
  isWaitingServer: boolean = false;
  username: string;
  userid: string;
  token: string;

  joystickPage: any;
  joystickParams: any;

  positionSubscription: Subscription;

  constructor(private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public dataFAppsProvider: DataFAppsProvider,
    public localStorage: LocalStorageProvider, public translateService: TranslateService,
    public vibration: Vibration,
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

    this.translateService.get("WAITING_SERVER").subscribe(t => {
      this.WAITING_SERVER = t;
    });
    this.translateService.get("QUEUED").subscribe(t => {
      this.QUEUED = t;
    });
    this.translateService.get("STARTING").subscribe(t => {
      this.STARTING = t;
    });

    this.message = this.WAITING_SERVER;

    this.joystickPage = navParams.get('joystick');
    this.joystickParams = navParams.get('joystickParams')

    this.positionSubscription = Observable.interval(500).subscribe(() => {
      this.positionSubscriptionStart();
    });
    
  }

  positionSubscriptionStart() {
    if(this.websocketHandler.isInterruptedApp()) {
        this.positionSubscriptionStop();
    } else {
      this.dataFAppsProvider.checkPosition()
        .subscribe(response => this.analyzePosition(response), e => console.log(e));
    }
  }

  positionSubscriptionStop() {
    if (this.positionSubscription) {
      this.positionSubscription.unsubscribe();
      this.positionSubscription = undefined;
    }
  }

  analyzePosition(response: any) {
    this.position = response.position;

    if (!this.isLaunched && this.position === -1) {
      this.isLaunched = true;
      this.startApp();
      this.message = this.STARTING;
    }
    else {
      this.message = this.QUEUED + this.position;
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
      this.isLeavingQueue = true;
      this.dataFAppsProvider.quitQueue();
    }
    this.positionSubscriptionStop();
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
        this.navCtrl.push(this.joystickPage, { joystickParams: this.joystickParams }).then(() => {
          this.navCtrl.remove(this.navCtrl.getPrevious().index);
          if(!(res.is_forced)) {
              this.vibration.vibrate([100, 100, 100, 100, 600]);
          }
        });
      } else if (!this.isLeavingQueue) {
        this.positionSubscriptionStop();

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

