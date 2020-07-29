import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FAppService } from 'src/app/core/api/app.service';
import { ApiService } from 'src/app/core/api/api.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  public timeOnList: Array<string> = [];
  public timeList: Array<[string, number]> = [['15mn', 900], ['30mn', 1800], ['1h', 3600], ['2hr', 7200]];
  public timeListOptions: Map<string, [string, number]> = new Map<string, [string, number]>();

  constructor(public translate: TranslateService, public api: ApiService, public http: FAppService) { }

  ngOnInit() {
    this.initList();
    this.getStartStopTime();
  }

  initList() {
    this.timeListOptions.set('🌇 ' + this.translate.instant('admin.settings.label.sunset'), ['sunset', 0]);
    this.timeListOptions.set('🌅 ' + this.translate.instant('admin.settings.label.sunrise'), ['sunrise', 0]);

    // Sunset
    this.timeList.forEach(time => this.timeListOptions.set('🌇 - ' + time[0], ['sunset', -time[1]]));
    this.timeList.forEach(time => this.timeListOptions.set('🌇 + ' + time[0], ['sunset', +time[1]]));

    // Sunrise
    this.timeList.forEach(time => this.timeListOptions.set('🌅 - ' + time[0], ['sunrise', -time[1]]));
    this.timeList.forEach(time => this.timeListOptions.set('🌅 + ' + time[0], ['sunrise', +time[1]]));

    // Hour
    for (let i = 0; i < 24; i++) {
      const hour = (i < 10 ? '0' + i : i) + ':00';
      this.timeListOptions.set(hour, [this.toUTC(hour), 0]);
    }
  }

  getStartStopTime() {
    this.api.getCalendar().subscribe((calendar) => {
      console.log(calendar);
    })
  }

  // TODO : We can improve this.
  private toUTC(time: string) {
    // Convert time e.g. "22:00" to UTC e.g. "21:00" according to current locale e.g; UTC+1
    const times = time.split(':');
    const hr = parseInt(times[0]);
    const mn = parseInt(times[1]);
    const dateConvert = new Date(2000, 1, 1, hr, 0, 0, 0);
    const hrUTC = dateConvert.getUTCHours();
    const timeUTC = (hrUTC < 10 ? '0' : '') + hrUTC.toString() + ':' + (mn < 10 ? '0' : '') + mn.toString();
    return timeUTC;
  }

  public toLocal(time: string) {
    // Convert UTC time e.g. "22:00" to local e.g. "23:00" according to current locale e.g; UTC+1
    let times = time.split(":");
    let hr = parseInt(times[0]);
    let mn = parseInt(times[1]);
    let dateConvert = new Date(2000, 1, 1, 0, 0, 0, 0);
    dateConvert.setUTCHours(hr, mn);
    let hrLocale = dateConvert.getHours();
    let timeLocale = (hrLocale < 10 ? "0" : "") + hrLocale.toString() + ":" + (mn < 10 ? "0" : "") + mn.toString();
    return timeLocale;
  }

  getKeysTime() {
    return Array.from(this.timeListOptions.keys());
  }


  clearUserQueue() {
    this.http.clearUserQueue();
  }

  setTimeOn(event) {

  }
  setTimeOff(event) {

  }

  updateLifeTime(event) {

  }
}
