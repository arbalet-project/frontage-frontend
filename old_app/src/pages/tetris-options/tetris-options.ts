import { LocalStorageProvider } from './../../providers/local-storage/local-storage';
import { AdminProvider } from './../../providers/admin/admin';
import { FormBuilder } from '@angular/forms';
import { TetrisJoystickPage } from './../tetris-joystick/tetris-joystick';
import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TrackingProvider } from '../../providers/tracking/tracking';

@Component({
  selector: 'page-tetris-options',
  templateUrl: 'tetris-options.html',
})
export class TetrisOptionsPage {

  fAppOptions: any;
  fAppPosition: number;
  isAdmin: boolean = false;
  joystickPage: any = TetrisJoystickPage;

  constructor(public navCtrl: NavController,
    public dataFAppsProvider: DataFAppsProvider,
    public formBuilder: FormBuilder,
    public adminProvider: AdminProvider,
    public localStorageProvider: LocalStorageProvider,
    public tracker: TrackingProvider) {

    //Check if the connected user is admin
    this.isAdmin = this.localStorageProvider.isAdmin();
    this.tracker.selectEvent("Tetris");
    //Init the tetris options to send to the back
    this.fAppOptions = {
      name: "Tetris"
    }
  }
}
