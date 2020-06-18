import { LocalStorageProvider } from './../../providers/local-storage/local-storage';
import { DrawingJoystickPage } from './../drawing-joystick/drawing-joystick';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TrackingProvider } from '../../providers/tracking/tracking';
@Component({
  selector: 'page-drawing-options',
  templateUrl: 'drawing-options.html',
})
export class DrawingOptionsPage {

  isAdmin: boolean = false;
  fAppOptions: any;
  joystickPage: any = DrawingJoystickPage;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public localStorageProvider: LocalStorageProvider, public tracker: TrackingProvider) {
    this.isAdmin = this.localStorageProvider.isAdmin();
    this.tracker.selectEvent("Drawing");
    this.fAppOptions = {
      name: "Drawing",
      hideParams: true,  // Send params to the backend but do not let the user changing them
      params: {
        "model": ""  // Empty string for model tells backend to start real-time drawing instead of replaying the saved one
      }
    }
  }

  ionViewDidLoad() {

  }

}
