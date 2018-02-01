import { FAppListPage } from './../f-app-list/f-app-list';
import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { Subscription, Observable } from 'rxjs/Rx';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-waiting',
  templateUrl: 'waiting.html',
})
export class WaitingPage {

  state:string = "waiting";
  position: number;
  message: string = 'En attente du serveur';
  
  joystickPage:any;
  joystickParams:any;

  positionSubscription: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataFAppsProvider: DataFAppsProvider) {

    this.joystickPage = navParams.get('joystick');
    this.joystickParams = navParams.get('joystickParams');

    let serverResponse: any = navParams.get('info');
    //If queued then periodically check the position in the queue 
    if (serverResponse.status === 400) {
      this.startApp();
    }

    if (serverResponse.queued) {
      this.state="queued";
      this.positionSubscription = Observable.interval(serverResponse.keep_alive_delay * 50)
        .subscribe(x => {
          this.dataFAppsProvider.checkPosition()
            .subscribe(response => this.checkPosition(response))
        });
    } else if (serverResponse.status === 403) {
      this.state="error";
      this.message = "Erreur : Vous ne pouvez lancer qu'une seule application à la fois. Vous êtes déjà dans la queue.";
    } else if (serverResponse.status === 200) {
      this.startApp();
    } else {
      this.state="error";
      this.message = "Une erreur inconnue s'est produite. Tentez de redémarrer l'application."
    }

  }

  checkPosition(response: any) {

    this.position = response.position;

    this.message = "Vous êtes dans la queue à la position : " + this.position;

    if (this.position === -1) {
      this.message = "L'application est en train de se lancer !";
      this.positionSubscription.unsubscribe();

      this.startApp();
    }
  }

  cancel() {
    this.dataFAppsProvider.stopApp().subscribe(response => this.navCtrl.push(FAppListPage));
    this.positionSubscription.unsubscribe();
  }

  startApp() {
      this.navCtrl.push(this.joystickPage, {joystickParams:this.joystickParams});
  }
}
