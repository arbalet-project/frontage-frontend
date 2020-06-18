import { Vibration } from '@ionic-native/vibration';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationProvider } from './../../providers/authentication/authentication';
import { AdminHoursSettings } from './../../models/admin-hours-settings';
import { AdminProvider } from './../../providers/admin/admin';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataFAppsProvider } from '../../providers/data-f-apps/data-f-apps';
import { WebsocketMessageHandlerProvider } from './../../providers/websocket-message-handler/websocket-message-handler';

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage implements OnInit {
  timeUTCoffset: number;
  selectedFrontageState: boolean = false;
  timeOnList: string[] = [];
  timeOffList: string[] = [];
  frontageStateList: any[] = [];
  selectedTimeOn: string;
  selectedTimeOff: string;
  offsetTimeOptions: Map<string, [string, number]>;
  lifetime: number;

  constructor(public navCtrl: NavController,
    public websocketMessageHandlerProvider: WebsocketMessageHandlerProvider,
    public navParams: NavParams,
    public adminProvider: AdminProvider,
    public authentication: AuthenticationProvider,
    public translateService: TranslateService,
    public dataFAppsProvider: DataFAppsProvider,
    public vibration: Vibration) {

    this.translateService.get("ON_MESSAGE").subscribe(res => {
      let on = {
        value: "on",
        label: res
      };
      this.frontageStateList.push(on);
    });
    this.translateService.get("OFF_MESSAGE").subscribe(res => {
      let off = {
        value: "off",
        label: res
      };
      this.frontageStateList.push(off);
    });
    this.translateService.get("SCHEDULER_MESSAGE").subscribe(res => {
      let scheduled = {
        value: "scheduled",
        label: res
      };
      this.frontageStateList.push(scheduled);
    });

    this.initTimeLists();
  }

  /**
   * Init data
   */
  ngOnInit() {
    this.adminProvider.getCurrentSunsetAndSunSet()
      .subscribe((hoursSettings: AdminHoursSettings) => {
        if(hoursSettings.time_on == "sunset" || hoursSettings.time_on == "sunrise") {
          for(let sunIcon in this.offsetTimeOptions) {
            let type : string = this.offsetTimeOptions[sunIcon][0];
            let value : number = this.offsetTimeOptions[sunIcon][1];
            if(hoursSettings.time_on == type && hoursSettings.offset_time_on == value) {
              this.selectedTimeOn = sunIcon;
              break;
            }
          }
        }
        else {
          this.selectedTimeOn = this.initHoursFormat(this.toLocal(hoursSettings.time_on));
        }
      if(hoursSettings.time_off == "sunset" || hoursSettings.time_off == "sunrise") {
        for(let sunIcon in this.offsetTimeOptions) {
          let type : string = this.offsetTimeOptions[sunIcon][0];
          let value : number = this.offsetTimeOptions[sunIcon][1];
          if(hoursSettings.time_off == type && hoursSettings.offset_time_off == value) {
            this.selectedTimeOff = sunIcon;
            break;
          }
        }
      }
      else {
        this.selectedTimeOff = this.initHoursFormat(this.toLocal(hoursSettings.time_off));
      }
    });

    this.authentication.isFacadeUp()
      .subscribe(res => {
        this.selectedFrontageState = res.state;
      });
    this.adminProvider.getLifetime()
      .subscribe(res => {
        this.lifetime = res;
      });
  }

  private initHoursFormat(hoursFromBack: string) {
    return hoursFromBack.substring(0, 2) + ':00';
  }

  private toUTC(time:string) {
    // Convert time e.g. "22:00" to UTC e.g. "21:00" according to current locale e.g; UTC+1
    let times = time.split(":");
    let hr = parseInt(times[0]);
    let mn = parseInt(times[1]);
    let dateConvert = new Date(2000, 1, 1, hr, 0, 0, 0);
    let hrUTC = dateConvert.getUTCHours();
    let timeUTC = (hrUTC < 10 ? "0" : "") + hrUTC.toString() + ":" + (mn < 10 ? "0" : "") + mn.toString();
    return timeUTC;
  }

  private toLocal(time:string) {
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

  private initTimeLists() {
    // All times are UTC
    let sunset_label: string, sunrise_label: string;
    this.translateService.get("SUNSET_LABEL").subscribe(res => {
      sunset_label = "🌇 " + res;
    });
    this.translateService.get("SUNRISE_LABEL").subscribe(res => {
      sunrise_label = "🌅 " + res;
    });

    this.offsetTimeOptions = new Map<string, [string, number]>();
    this.offsetTimeOptions[sunset_label] = ["sunset", 0];
    this.offsetTimeOptions[sunrise_label] = ["sunrise", 0];
    this.offsetTimeOptions["🌇 - 2hr"] = ["sunset", -7200];
    this.offsetTimeOptions["🌇 - 1hr"] = ["sunset", -3600];
    this.offsetTimeOptions["🌇 - 30mn"] = ["sunset", -1800];
    this.offsetTimeOptions["🌇 - 15mn"] = ["sunset", -900];
    this.offsetTimeOptions["🌇 + 15mn"] = ["sunset", 900];
    this.offsetTimeOptions["🌇 + 30mn"] = ["sunset", 1800];
    this.offsetTimeOptions["🌇 + 1hr"] = ["sunset", 3600];
    this.offsetTimeOptions["🌇 + 2hr"] = ["sunset", 7200];
    this.offsetTimeOptions["🌅 - 2hr"] = ["sunrise", -7200];
    this.offsetTimeOptions["🌅 - 1hr"] = ["sunrise", -3600];
    this.offsetTimeOptions["🌅 - 30mn"] = ["sunrise", -1800];
    this.offsetTimeOptions["🌅 - 15mn"] = ["sunrise", -900];
    this.offsetTimeOptions["🌅 + 15mn"] = ["sunrise", 900];
    this.offsetTimeOptions["🌅 + 30mn"] = ["sunrise", 1800];
    this.offsetTimeOptions["🌅 + 1hr"] = ["sunrise", 3600];
    this.offsetTimeOptions["🌅 + 2hr"] = ["sunrise", 7200];

    for(let sunIcon in this.offsetTimeOptions) {
      this.timeOnList.push(sunIcon);
      this.timeOffList.push(sunIcon);
    }

    let i: number
    for (i = 0; i < 24; ++i) {
      let hourToPush: string = i + ":00";
      if (i < 10) {
        hourToPush = "0" + hourToPush;
      }
      this.timeOnList.push(hourToPush);
      this.timeOffList.push(hourToPush);
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
    this.adminProvider.updateFrontageState(this.selectedFrontageState).subscribe();
  }

  updateLifetime() {
    this.adminProvider.updateLifetime(this.lifetime).subscribe();
  }

  setTimeOn() {
    // For some reason .has() does not work
    let hasTime: boolean = false;
    for(let time in this.offsetTimeOptions) {
      if(time == this.selectedTimeOn) hasTime = true;
    }
    if(hasTime) {
        // Based on Sun + offset
        this.adminProvider.setFrontageTimeOn(this.offsetTimeOptions[this.selectedTimeOn][0],
          this.offsetTimeOptions[this.selectedTimeOn][1]).subscribe();
      }
      else {
        // Fixed time
        this.adminProvider.setFrontageTimeOn(this.toUTC(this.selectedTimeOn), 0).subscribe();
      }
  }

  setTimeOff() {
    // For some reason .has() does not work
    let hasTime: boolean = false;
    for(let time in this.offsetTimeOptions) {
      if(time == this.selectedTimeOff) hasTime = true;
    }
    if(hasTime) {
      // Based on Sun + offset
      this.adminProvider.setFrontageTimeOff(this.offsetTimeOptions[this.selectedTimeOff][0],
        this.offsetTimeOptions[this.selectedTimeOff][1]).subscribe();
    }
    else {
      // Fixed time
      this.adminProvider.setFrontageTimeOff(this.toUTC(this.selectedTimeOff), 0).subscribe();
    }
  }

  unForceFApp() {
    this.vibration.vibrate(50)
    this.adminProvider.unForceFApp().subscribe();
  }
}
