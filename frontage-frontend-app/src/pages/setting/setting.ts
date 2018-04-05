import { AdminHoursSettings } from './../../models/admin-hours-settings';
import { AdminProvider } from './../../providers/admin/admin';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage implements OnInit {

  schedulerState: boolean = true;
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

  ngOnInit() {
    this.adminProvider.getCurrentSunsetAndSunDown()
      .subscribe(response => {
        this.hoursSettings = response;
      });
  }

  goToFappList() {
    this.navCtrl.pop();
  }

  clearUserQueue() {
    this.adminProvider.clearUserQueue().subscribe();
  }

  updateScheduler() {
    this.adminProvider.updateSchedulerState(this.schedulerState);
  }

  setOpeningHour() {
    console.log("opening");
  }  

  setClosingHour(){
    console.log("closing");
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
}
