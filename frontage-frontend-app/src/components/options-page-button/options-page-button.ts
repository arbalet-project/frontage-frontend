import { WaitingPage } from './../../pages/waiting/waiting';
import { NavController } from 'ionic-angular';
import { AdminProvider } from './../../providers/admin/admin';
import { LocalStorageProvider } from './../../providers/local-storage/local-storage';
import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'options-page-button',
  templateUrl: 'options-page-button.html'
})
export class OptionsPageButtonComponent {
  /**
   * Component inputs
   */
  @Input()
  fAppOptions: any;

  @Input()
  isAdmin: boolean;

  @Input()
  joystickPage: any;

  @Input()
  parametersList: any;

  @Input()
  selectedParameter: any;

  @Input()
  iconKey: any;

  /**
   * Local variable
   */
  mdIcon: String;
  iosIcon: String;

  constructor(public navCtrl: NavController,
    public dataFAppsProvider: DataFAppsProvider,
    public localStorageProvider: LocalStorageProvider,
    public adminProvider: AdminProvider) {
  }

  /**
   * Button actions
   */
  startFapp() {
    console.log("startFapp");
    this.dataFAppsProvider.launchFApp(this.fAppOptions)
      .subscribe(response => this.goToNextPage(response));
  }

  forceFapp() {
    this.adminProvider.launchForcedFApp(this.fAppOptions)
      .subscribe(response => response);
  }

  sendScheduledFappOptions() {
    this.adminProvider.sendScheduledFAppOptions(this.fAppOptions)
      .subscribe(response => response);
  }

  /**
   * Navigation
   */
  goToNextPage(response) {
    this.navCtrl.push(WaitingPage, {
      info: response,
      joystick: this.joystickPage,
      joystickParams:
        {
          parametersList: this.parametersList,
          selectedParameter: this.selectedParameter
        }
    }).then(() => {
      this.navCtrl.remove(this.navCtrl.getPrevious().index);
    });
  }
}
