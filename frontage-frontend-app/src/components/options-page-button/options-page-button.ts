import { WaitingPage } from './../../pages/waiting/waiting';
import { NavController } from 'ionic-angular';
import { FAppOptions } from './../../models/f-app-options';
import { AdminProvider } from './../../providers/admin/admin';
import { LocalStorageProvider } from './../../providers/local-storage/local-storage';
import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'options-page-button',
  templateUrl: 'options-page-button.html'
})
export class OptionsPageButtonComponent {

  @Input()
  options: FAppOptions;

  @Input()
  isAdmin: boolean;

  @Input()
  joystick: any;

  @Input()
  joystickParams: any;

  constructor(public navCtrl: NavController,
    public dataFAppsProvider: DataFAppsProvider,
    public localStorageProvider: LocalStorageProvider,
    public adminProvider: AdminProvider) {
  }

  /**
   * Button actions
   */
  startFapp() {
    this.dataFAppsProvider.launchFApp(this.options)
      .subscribe(response => this.goToNextPage(response));
  }

  forceFapp() {
    this.adminProvider.launchForcedFApp(this.options)
      .subscribe(response => response);
  }

  sendScheduledFappOptions() {
    this.adminProvider.sendScheduledFAppOptions(this.options)
      .subscribe(response => this.goToNextPage(response));
  }

  /**
   * Navigation
   */
  goToNextPage(response) {
    this.navCtrl.pop();
    this.navCtrl.push(WaitingPage, { info: response, joystick: this.joystick, joystickParams: this.joystickParams })
  }
}
