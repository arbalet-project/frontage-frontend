import { Observable } from 'rxjs/Rx';
import { Component } from '@angular/core';
import { ModalController, NavParams } from 'ionic-angular';

@Component({
    selector: 'waiting-component',
    templateUrl: 'waiting-component.html',
})
export class WaitingComponent {
    response: any;

    constructor(public params: NavParams) {
        this.response = params.get('serverInfo');

        //If queued then periodically check the position in the queue 
        // if (response.queued) {
        //     let positionSubscription: Subscription = Observable.interval(response.keep_alive_delay * 250).subscribe(x => {
        //         this.dataFAppsProvider.checkPosition().subscribe(response => this.fAppPosition = response.position);

        //         if (this.fAppPosition === -1) {
        //             positionSubscription.unsubscribe();
        //         }
        //     });
        // }
    }
}