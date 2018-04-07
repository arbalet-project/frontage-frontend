import { AdminHoursSettings } from './../../models/admin-hours-settings';
import { AdminProvider } from './../../providers/admin/admin';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage implements OnInit {

  frontageState: boolean = true;
  hoursSettings: AdminHoursSettings;
  openingHourList: String[] = [];
  closingHourList: String[] = [];
  selectedOpeningHour: String;
  selectedClosingHour: String;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public adminProvider: AdminProvider) {

    this.initClosingHourList();
    this.initOpeningHourList();
  }

  /**
   * Init data
   */
  ngOnInit() {
    this.adminProvider.getCurrentSunsetAndSunDown()
      .subscribe((hoursSettings: AdminHoursSettings) => {
        this.selectedOpeningHour = hoursSettings.on;
        this.selectedClosingHour = hoursSettings.off;
      });
  }

  private initOpeningHourList() {
    let j: number;
    for (j = 0; j <= 5; j++) {
      this.openingHourList.push("sunset+" + j);
    }
    let i: number;
    for (i = 0; i <= 23; i++) {
      this.openingHourList.push(i + "h00");
    }
  }

  private initClosingHourList() {
    let j: number;
    for (j = 0; j <= 5; j++) {
      this.closingHourList.push("sunrise-" + j);
    }

    var i: number;
    for (i = 0; i <= 23; i++) {
      this.closingHourList.push(i + "h00");
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
    this.adminProvider.updateFrontageState(this.frontageState);
  }

  setOpeningHour() {
    this.adminProvider.setFrontageOpeningHour(this.selectedOpeningHour);
  }  

  setClosingHour(){
    this.adminProvider.setFrontageClosingHour(this.selectedClosingHour);
  }
}
