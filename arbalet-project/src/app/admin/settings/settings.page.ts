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
  public timeList: Array<[string, number]> = [['15 mn', 900], ['30 mn', 1800], ['1 h', 3600], ['2 h', 7200]];
  public timeListOptions: Map<string, string> = new Map<string, string>();
  public defaultTimeOn: string;
  public defaultTimeOff: string;
  public defaultLifeTime: number;

  constructor(public translate: TranslateService, public api: ApiService, public http: FAppService) { }

  ngOnInit() {
    this.initList();
    this.getStartStopTime();
    this.initTime();
  }

  private initList() {
    this.timeListOptions.set('sunset|0', '🌇 ' + this.translate.instant('admin.settings.label.sunset'), );
    this.timeListOptions.set('sunrise|0', '🌅 ' + this.translate.instant('admin.settings.label.sunrise'));

    // Sunset
    this.timeList.forEach(time => {
      this.timeListOptions.set(`sunset|${time[1]}`, '🌇 + ' + time[0]);
    });

    this.timeList.forEach(time => {
      this.timeListOptions.set(`sunset|-${time[1]}`, '🌇 - ' + time[0]);
    });
    // Sunrise
    this.timeList.forEach(time => {
      this.timeListOptions.set(`sunrise|-${time[1]}`, '🌅 - ' + time[0]);
    });

    this.timeList.forEach(time => {
      this.timeListOptions.set(`sunrise|${time[1]}`, '🌅 + ' + time[0]);
    });

    // Hour
    for (let i = 0; i < 24; i++) {
      this.timeListOptions.set(this.toUTC(i) + '|0', this.fillTime(i));
    }
  }

  private getStartStopTime() {
    this.api.getCalendar().subscribe((calendar) => {
      this.defaultTimeOn = this.getCalendarTime(calendar.time_on, calendar.offset_time_on);
      this.defaultTimeOff = this.getCalendarTime(calendar.time_off, calendar.offset_time_off);
    });
  }

  private initTime() {
    this.api.getLifeTime().subscribe((res) => {
      this.defaultLifeTime = res.default_lifetime;
    });
  }


  fillTime(hour: number): string {
    return (hour < 10 ? '0' + hour : hour) + ':00';
  }



  getCalendarTime(time: string, offset: number) {
    return `${time}|${offset}`;
  }

  // TODO : We can improve this.
  private toUTC(hour: number): string {
    const time = new Date();
    time.setHours(hour);
    return this.fillTime(time.getUTCHours());
  }

  public toLocal(hour: number) {
    const time = new Date();
    time.setUTCHours(hour, 0);
    return this.fillTime(time.getHours());
  }


  clearUserQueue() {
    this.http.clearUserQueue();
  }

  setTime(event, on: boolean) {
    const tmp = event.detail.value.split('|');
    this.api.setTime(on, tmp[0], parseInt(tmp[1], 10));
  }

  updateLifeTime(event) {
    this.api.updateLifeTime(event.detail.value);
  }
}
