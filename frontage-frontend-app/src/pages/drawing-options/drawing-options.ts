import { LocalStorageProvider } from './../../providers/local-storage/local-storage';
import { DrawingJoystickPage } from './../drawing-joystick/drawing-joystick';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DrawingOptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-drawing-options',
  templateUrl: 'drawing-options.html',
})
export class DrawingOptionsPage {

  parametersList: string[] = ["darkblue", "deeppink", "chartreuse", "gold", "purple", "skyblue", "mediumturquoise", "darkorange", "bordeaux"];
  selectedParameter: string = "darkblue";
  isAdmin: boolean = false;
  fAppOptions: any;
  joystickPage: any = DrawingJoystickPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public localStorageProvider: LocalStorageProvider) {
    this.isAdmin = this.localStorageProvider.isAdmin();

    this.fAppOptions = {
      name: "Drawing",
      params: {
      }
    }
  }

  ionViewDidLoad() {
    
  }

}
