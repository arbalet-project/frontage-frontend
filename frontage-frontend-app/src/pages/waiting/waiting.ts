import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { Subscription, Observable } from 'rxjs/Rx';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the WaitingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-waiting',
  templateUrl: 'waiting.html',
})
export class WaitingPage {

  position: number;
  message: string = 'En attente du serveur';
  errorMessage:string = '';


  constructor(public navCtrl: NavController, public navParams: NavParams, public dataFAppsProvider: DataFAppsProvider) {
    console.log('parameters : ' + JSON.stringify(navParams));

    let serverResponse: any = navParams.get('info');
    //If queued then periodically check the position in the queue 
    if (serverResponse.queued) {
      let positionSubscription: Subscription = Observable.interval(serverResponse.keep_alive_delay * 50)
        .subscribe(x => {
          this.dataFAppsProvider.checkPosition()
            .subscribe(response => this.checkPosition(response, positionSubscription))
        });
    } else if (serverResponse.status === 403) {
      this.errorMessage = "Erreur : Vous ne pouvez lancer qu'une seule applicaiotn à la fois. Vois êtes déjà dans la queue.";
    } else {
      this.errorMessage = "Une erreur inconnue s'est produite. Tenter de redémarrer l'application."
      console.log(JSON.stringify(serverResponse));
    }

  }

  checkPosition(response: any, positionSubscription: Subscription) {

    let position: number = response.position;
    this.position = position + 1;

    this.message = "Vous êtes dans la queue à la position : " + this.position;

    if (position === -1) {
      this.message = "L'application est en train de se lancer !"
      positionSubscription.unsubscribe();
      console.log("Lance l'appli ! ");
    }

  }

  test() {
    console.log("test");
    console.log(this.message);
    console.log(this.errorMessage);
  }

  cancel() {

  }

}
