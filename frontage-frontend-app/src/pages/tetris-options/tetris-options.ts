import { FAppOptions } from './../../models/f-app-options';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TetrisJoystickPage } from './../tetris-joystick/tetris-joystick';
import { WaitingPage } from './../waiting/waiting';
import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-tetris-options',
  templateUrl: 'tetris-options.html',
})
export class TetrisOptionsPage {

  fAppOptions: FormGroup;
  fAppPosition: number;

  constructor(public navCtrl: NavController, public dataFAppsProvider: DataFAppsProvider, public formBuilder: FormBuilder) {
  }

  lauchApp() {

    let options: FAppOptions = {
      name: "Tetris",
      params: {
      }
    }

    
    this.dataFAppsProvider.launchFApp(options)
      .subscribe(response => this.navCtrl.push(WaitingPage, {info:response, joystick: TetrisJoystickPage}));
  }
}
