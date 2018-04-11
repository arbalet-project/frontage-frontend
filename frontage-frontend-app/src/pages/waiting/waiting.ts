import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { Subscription, Observable } from 'rxjs/Rx';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-waiting',
  templateUrl: 'waiting.html',
})
export class WaitingPage {

  state: string = "waiting";
  position: number;
  message: string = 'En attente du serveur';
  isLaunched: boolean = false;
  isWaitingServer: boolean = false;

  joystickPage: any;
  joystickParams: any;

  positionSubscription: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataFAppsProvider: DataFAppsProvider) {

    this.joystickPage = navParams.get('joystick');
    this.joystickParams = navParams.get('joystickParams')

    //Check if the user is the owner of the current app
    let currentApp: any = this.dataFAppsProvider.getCurrentApp().subscribe();
    console.log("hoyes : " + currentApp.username);

    let serverResponse: any = navParams.get('info');

    //If queued then periodically check the position in the queue 
    if (serverResponse.status === 400) {
      this.startApp();
    }

    if (serverResponse.queued) {
      this.state = "queued";
      this.positionSubscription = Observable.interval(1000)
        .subscribe(x => this.positionSubscriptionStart(x));
    } else if (serverResponse.status === 403) {
      this.state = "error";
      this.message = "Vous ne pouvez lancer qu'une seule application à la fois. Vous êtes déjà dans la queue.";
    } else if (serverResponse.status === 200) {
      this.startApp();
    } else {
      this.message = ""
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

    this.message = "Vous êtes dans la queue à la position : " + this.position;

    this.isWaitingServer = false;
    if (this.position === -1) {
      if (!this.isLaunched) {
        this.isLaunched = true;
        this.message = "L'application est en train de se lancer !";

        this.startApp();
      }
    }
  }

  backButtonClick() {
    this.backButtonAction();
  }

  backButtonAction(){
    this.dataFAppsProvider.quitQueue();
    this.navCtrl.pop();
  }
  
  ionViewWillLeave() {
    if (this.positionSubscription) {
      this.positionSubscription.unsubscribe();
      this.positionSubscription = undefined;
    }
  }

  ionViewWillAppear() {
    this.isLaunched = false;
    this.isWaitingServer = false;
  }

  startApp() {
    this.navCtrl.push(this.joystickPage, { joystickParams: this.joystickParams }).then(() => {
      this.navCtrl.remove(this.navCtrl.getPrevious().index);
    });
  }
}
