import { WebsocketMessageHandlerProvider } from './../../providers/websocket-message-handler/websocket-message-handler';
import { Vibration } from '@ionic-native/vibration';
import { WaitingPage } from './../../pages/waiting/waiting';
import { NavController, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { AdminProvider } from './../../providers/admin/admin';
import { LocalStorageProvider } from './../../providers/local-storage/local-storage';
import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'options-page-button',
  templateUrl: 'options-page-button.html'
})
export class OptionsPageButtonComponent {
  /**
   * Component inputs
   */
  @Input()
  fAppOptions: any;

  @Input()
  isAdmin: boolean;

  @Input()
  joystickPage: any;

  @Input()
  parametersList: any;

  @Input()
  selectedParameter: any;

  @Input()
  iconKey: any;

  /**
   * Local variable
   */
  mdIcon: String;
  iosIcon: String;
  failureTitle: String;
  failureMessage: String;
  forcedTitle: String;
  forcedMessage: String;
  optionsSentTitle: String;
  optionsSentMessage: String;

  constructor(public navCtrl: NavController,
    public websocketMessageHandlerProvider: WebsocketMessageHandlerProvider,
    public dataFAppsProvider: DataFAppsProvider,
    public localStorageProvider: LocalStorageProvider,
    public adminProvider: AdminProvider,
    public translateService: TranslateService,
    private alertCtrl: AlertController,
    public vibration: Vibration) {

    this.translateService.get("OPTIONS_PAGE_ACTION_FAILED_ALERT_TITLE").subscribe(translatedMesssage => {
      this.failureTitle = translatedMesssage;
    });

    this.translateService.get("OPTIONS_PAGE_ACTION_FAILED_ALERT").subscribe(translatedMesssage => {
      this.failureMessage = translatedMesssage;
    });

    this.translateService.get("OPTIONS_PAGE_APP_FORCED_ALERT_TITLE").subscribe(translatedMesssage => {
      this.forcedTitle = translatedMesssage;
    });

    this.translateService.get("OPTIONS_PAGE_APP_FORCED_ALERT").subscribe(translatedMesssage => {
      this.forcedMessage = translatedMesssage;
    });

    this.translateService.get("OPTIONS_PAGE_OPTIONS_SENT_ALERT_TITLE").subscribe(translatedMesssage => {
      this.optionsSentTitle = translatedMesssage;
    });

    this.translateService.get("OPTIONS_PAGE_OPTIONS_SENT_ALERT").subscribe(translatedMesssage => {
      this.optionsSentMessage = translatedMesssage;
    });
  }

  validateActionSucceeded(success, title, message, navigateBack) {
    if(success) {
        this.vibration.vibrate(50);
        let popUp = this.alertCtrl.create({
          title: title,
          message: message,
          buttons: [{
            text: 'Ok',
            handler: () => {
              if(navigateBack) {
                  popUp.dismiss().then(() => {
                    this.navCtrl.pop();
                  });
                  return false;
              }
            }
          }]
        });
        popUp.present();
    }
  }

  /**
   * Button actions
   */
  startFapp() {
    this.vibration.vibrate(50);
    this.websocketMessageHandlerProvider.resetFlags();
    this.dataFAppsProvider.launchFApp(this.fAppOptions)
      .subscribe(response => this.goToNextPage(response), err => console.log(err));
  }

  forceFapp() {
    this.vibration.vibrate(20);
    this.websocketMessageHandlerProvider.resetFlags();
    this.adminProvider.launchForcedFApp(this.fAppOptions)
      .subscribe(response => this.validateActionSucceeded(response.forced, this.forcedTitle, this.forcedMessage, true),
                 err => console.log(err));
  }

  sendScheduledFappOptions() {
    this.vibration.vibrate(20);
    this.adminProvider.sendScheduledFAppOptions(this.fAppOptions)
      .subscribe(response => this.validateActionSucceeded(response.done, this.optionsSentTitle, this.optionsSentMessage, false),
                 err => console.log(err));
  }

  /**
   * Navigation
   */
  goToNextPage(response) {
    this.navCtrl.push(WaitingPage, {
      info: response,
      joystick: this.joystickPage,
      joystickParams:
      {
        parametersList: this.parametersList,
        selectedParameter: this.selectedParameter
      }
    }).then(() => {
      this.navCtrl.remove(this.navCtrl.getPrevious().index);
    });
  }
}
