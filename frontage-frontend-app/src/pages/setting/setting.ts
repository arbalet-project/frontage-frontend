import { AuthenticationProvider } from './../../providers/authentication/authentication';
import { AdminHoursSettings } from './../../models/admin-hours-settings';
import { AdminProvider } from './../../providers/admin/admin';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage implements OnInit {

  frontageState: boolean = false;
  openingHourList: String[] = [];
  closingHourList: String[] = [];
  selectedOpeningHour: String;
  selectedClosingHour: String;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public adminProvider: AdminProvider,
    public authentication: AuthenticationProvider) {

    this.initHourList("sunset+", this.openingHourList);
    this.initHourList("sunrise-", this.closingHourList);
  }

  /**
   * Init data
   */
  ngOnInit() {
    this.adminProvider.getCurrentSunsetAndSunDown()
      .subscribe((hoursSettings: AdminHoursSettings) => {
        this.selectedOpeningHour = this.initHoursFormat(hoursSettings.on);
        this.selectedClosingHour = this.initHoursFormat(hoursSettings.off);
      });

    this.authentication.isFacadeUp()
      .subscribe(res => this.frontageState = res.state);
  }

  private initHoursFormat(hoursFromBack: String): String {
    return hoursFromBack.substring(0, 2) + ':00';
  }

  private initHourList(sunValue: String, listToInit: String[]) {
    let j: number;
    for (j = 0; j <= 5; j++) {
      listToInit.push(sunValue + j.toString());
    }
    let i: number
    for (i = 0; i <= 23; i++) {
      let hourToPush: String = i + ":00";
      if (i < 10) {
        hourToPush = "0" + hourToPush;
      }
      listToInit.push(hourToPush);
    }
  }

  /**
   * Navigation
   */
  goToFappList() {
    this.navCtrl.pop();
  }

  /**
   * Admin Actions
   */
  clearUserQueue() {
    this.adminProvider.clearUserQueue().subscribe();
  }

  updateFrontageState() {
    this.adminProvider.updateFrontageState(this.frontageState).subscribe();
  }

  setOpeningHour() {
    //Check if the admin choosed an offset or an hour
    if (this.selectedOpeningHour
      && this.selectedOpeningHour.length > 7
      && this.selectedOpeningHour.substring(0, 7) == 'sunset+') {
      let offset: String = this.selectedOpeningHour.substring(7);
      this.adminProvider.setFrontageOpeningOffset(offset).subscribe();
    } else {
      this.adminProvider.setFrontageOpeningHour(this.selectedOpeningHour).subscribe();
    }
  }

  setClosingHour() {
    //Check if the admin choosed an offset or an hour
    if (this.selectedClosingHour
      && this.selectedClosingHour.length > 8
      && this.selectedClosingHour.substring(0, 8) == 'sunrise-') {
      let offset: String = this.selectedClosingHour.substring(7,9);
      this.adminProvider.setFrontageClosingOffset(offset).subscribe();
    } else {
      this.adminProvider.setFrontageClosingHour(this.selectedClosingHour).subscribe();
    }
  }
}
