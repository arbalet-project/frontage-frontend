import { AdminProvider } from './../../providers/admin/admin';
import { LocalStorageProvider } from './../../providers/local-storage/local-storage';
import { SnakeJoystickPage } from './../snake-joystick/snake-joystick';
import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TrackingProvider } from '../../providers/tracking/tracking';

@Component({
  selector: 'page-snake-options',
  templateUrl: 'snake-options.html',
})
export class SnakeOptionsPage {

  fAppPosition: number;
  joystickPage: any = SnakeJoystickPage
  isAdmin: boolean = false;
  fAppOptions: any;

  constructor(public navCtrl: NavController,
    public dataFAppsProvider: DataFAppsProvider,
    public formBuilder: FormBuilder,
    public localStorageProvider: LocalStorageProvider,
    public adminProvider: AdminProvider,
    public tracker: TrackingProvider) {

    //Check if the connected user is admin
    this.isAdmin = this.localStorageProvider.isAdmin();
      this.tracker.selectEvent("Snake");
    //Init the snake options to send to the back
    this.fAppOptions = {
      name: "Snake"
    }
  }
}
