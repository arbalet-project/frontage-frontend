import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  public timeOnList: Array<string> = [];
  public timeList: Array<[string, number]> = [["15mn", 900], ["30mn", 1800], ["1h", 3600], ["2hr", 7200]];
  public timeListOptions: Map<string, [string, number]> = new Map<string, [string, number]>();

  constructor(public translate: TranslateService) { }

  ngOnInit() {
    this.initList();
  }

  initList() {
    this.timeListOptions.set("🌇 " + this.translate.instant("admin.settings.label.sunset"), ["sunset", 0]);
    this.timeListOptions.set("🌅 " + this.translate.instant("admin.settings.label.sunrise"), ["sunrise", 0]);

    // Sunrise 
    this.timeList.forEach(time => this.timeListOptions.set("🌇 - " + time[0], ["sunset", -time[1]]));
    this.timeList.forEach(time => this.timeListOptions.set("🌇 + " + time[0], ["sunset", +time[1]]));

    // Sunset
    this.timeList.forEach(time => this.timeListOptions.set("🌅 - " + time[0], ["sunrise", -time[1]]));
    this.timeList.forEach(time => this.timeListOptions.set("🌅 + " + time[0], ["sunrise", +time[1]]));

    // Hour
    for (let i = 0; i < 24; i++) {
      let hour = (i < 10 ? "0" + i : i) + ":00";
      this.timeListOptions.set(hour, [this.toUTC(hour), 0]);
    }

  }

  // TODO : We can improve this.
  private toUTC(time: string) {
    // Convert time e.g. "22:00" to UTC e.g. "21:00" according to current locale e.g; UTC+1
    let times = time.split(":");
    let hr = parseInt(times[0]);
    let mn = parseInt(times[1]);
    let dateConvert = new Date(2000, 1, 1, hr, 0, 0, 0);
    let hrUTC = dateConvert.getUTCHours();
    let timeUTC = (hrUTC < 10 ? "0" : "") + hrUTC.toString() + ":" + (mn < 10 ? "0" : "") + mn.toString();
    return timeUTC;
  }

  getKeysTime() {
    return Array.from(this.timeListOptions.keys());
  }


  clearUserQueue() {

  }

  setTimeOn(event) {

  }
  setTimeOff(event) {

  }

  updateLifeTime(event) {
    
  }
}
