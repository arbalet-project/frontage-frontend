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
    }
  }

  checkPosition(response: any, positionSubscription:Subscription) {

    console.log("response checkPsition : " + JSON.stringify(response));
    let position:number = response.position;
    console.log("Position dans la queue : " + position);
    if (position === -1) {
      positionSubscription.unsubscribe();
      console.log("Lance l'appli ! ");
    } else {
      this.position = position+1;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WaitingPage');
  }

}
