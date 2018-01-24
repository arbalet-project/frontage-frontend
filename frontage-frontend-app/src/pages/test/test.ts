import { LocalStorageProvider } from './../../providers/local-storage/local-storage';
import { FAppListPage } from './../f-app-list/f-app-list';
import { TimeProvider } from './../../providers/time/time';
import { Observable, Subscription } from 'rxjs/Rx';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { NicknameGeneratorProvider } from '../../providers/nickname-generator/nickname-generator';
/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {

  color:string="blue";

  constructor(private navCtrl: NavController) { }

  onUp() {
    console.log("^");
  }

  onDown() {
    console.log("v");
  }

  onRight() {
    console.log(">");
  }

  onLeft() {
    console.log("<");
  }

}
