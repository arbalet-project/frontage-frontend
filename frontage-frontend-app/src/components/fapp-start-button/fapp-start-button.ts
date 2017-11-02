import { NavController } from 'ionic-angular';
import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { Observable, Subscription } from 'rxjs/Rx';
import { Component } from '@angular/core';

/**
 * Generated class for the FappStartButtonComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'fapp-start-button',
  templateUrl: 'fapp-start-button.html'
})
export class FappStartButtonComponent {

  fAppPosition : number;
  private inQueueSubscription: Subscription;

  constructor(private navCtrl: NavController, public fAppsData: DataFAppsProvider, ) {
    console.log('Hello FappStartButtonComponent Component');
  }

  launchApp(fappName: string) {
    this.fAppsData.launchFApp(fappName).subscribe(response => {
      //If queued then periodicly check the position in the queue
      if (response.queued) {
        console.log();
        this.inQueueSubscription = Observable.interval(response.keep_alive_delay * 500).subscribe(x => {
          this.fAppsData.checkPosition().subscribe(response => this.fAppPosition = response.position);
        });
      }
      //TODO : Launch the joystick to start playing
    });
    this.navCtrl.push("FlagsOptionsPage");
  }
}
