import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FAppListPage } from '../f-app-list/f-app-list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  toList() {
    console.log('to list ');
    this.navCtrl.push(FAppListPage);
  }

}
