import { FAppListPage } from './../f-app-list/f-app-list';
import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { Subscription, Observable } from 'rxjs/Rx';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the WaitingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-waiting',
  templateUrl: 'waiting.html',
})
export class WaitingPage {

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
    if (serverResponse.queued) {
      this.positionSubscription = Observable.interval(serverResponse.keep_alive_delay * 50)
        .subscribe(x => {
          this.dataFAppsProvider.checkPosition()
            .subscribe(response => this.checkPosition(response))
        });
    } else if (serverResponse.status === 403) {

      this.message = "Erreur : Vous ne pouvez lancer qu'une seule application à la fois. Vous êtes déjà dans la queue.";
    } else {
      this.message = "Une erreur inconnue s'est produite. Tenter de redémarrer l'application."
    }

  }

  checkPosition(response: any) {

    let position: number = response.position;
    this.position = position + 1;

    this.message = "Vous êtes dans la queue à la position : " + this.position;

    if (position === -1) {
      this.message = "L'application est en train de se lancer !";
      this.positionSubscription.unsubscribe();

      this.navCtrl.push(this.joystickPage, {joystickParams:this.joystickParams});
    }

  }

  cancel() {
    this.dataFAppsProvider.stopApp().subscribe(response => this.navCtrl.push(FAppListPage));
    this.positionSubscription.unsubscribe();
  }

}
