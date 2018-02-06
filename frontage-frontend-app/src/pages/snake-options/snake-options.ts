import { SnakeJoystickPage } from './../snake-joystick/snake-joystick';
import { WaitingPage } from './../waiting/waiting';
import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { FAppOptions } from './../../models/f-app-options';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-snake-options',
  templateUrl: 'snake-options.html',
})
export class SnakeOptionsPage {

  fAppOptions: FormGroup;
  fAppPosition: number;

  constructor(public navCtrl: NavController, public dataFAppsProvider: DataFAppsProvider, public formBuilder: FormBuilder) {
    console.log("snake option")

    this.fAppOptions = formBuilder.group({
      fAppColor: ""
    });
  }

  launchApp() {

    let options: FAppOptions = {
      name: "Snake",
      params: {
      }
    }

    
    this.dataFAppsProvider.launchFApp(options)
      .subscribe(response => this.navCtrl.push(WaitingPage, {info:response, joystick: SnakeJoystickPage}));
  }

}
