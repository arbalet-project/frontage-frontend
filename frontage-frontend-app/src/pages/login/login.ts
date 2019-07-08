import { OfflineTetrisPage } from './../offline-tetris/offline-tetris';
import { VersionObsoletePage } from './../version-obsolete/version-obsolete';
import { environment } from './../../app/environment';
import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocalStorageProvider } from './../../providers/local-storage/local-storage';
import { FAppListPage } from './../f-app-list/f-app-list';
import { TimeProvider } from './../../providers/time/time';
import { Observable, Subscription } from 'rxjs/Rx';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { NicknameGeneratorProvider } from '../../providers/nickname-generator/nickname-generator';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  isServerUp: boolean = false;
  isFacadeUp: boolean = false;
  isStateOff: Boolean = false;
  isForced: Boolean = false;
  isPwdDisplayed: boolean = false;
  nbHeaderTapped: number = 0;

  exception: any;
  nextTime: Date;
  userName: string;
  password: string = "";
  isRefused: Boolean = false;

  serverUpSubscription: Subscription;

  constructor(private navCtrl: NavController, private authentication: AuthenticationProvider, private time: TimeProvider,
    nicknameGeneratorProvider: NicknameGeneratorProvider, public localStorageProvider: LocalStorageProvider,
    public tranlation: TranslateService) {

    this.userName = nicknameGeneratorProvider.generateNickname();
  }

  ionViewWillEnter() {
    this.isServerUp=false;
    this.checkServerStatus();
    //If the server is not up check periodicaly his status
    if (!this.isServerUp) {
      this.serverUpSubscription = Observable.interval(2500).subscribe(() => {
        this.checkServerStatus();
      });
    }
  }

  checkServerStatus() {
    this.authentication.isServerUp()
      .subscribe(isServerUp => this.checkFacade(isServerUp), e => console.log(e));
  }

  checkFacade(response: any) {
    let protocolVersion: Number = response.protocol_version;
    let isServerUp: boolean = response.is_up;

    if (protocolVersion === environment.protocol_version) {
      if (isServerUp) {
        this.isServerUp = isServerUp;

        this.authentication.isFacadeUp()
          .subscribe(response => this.handleFacadeStatus(response));
      }
    } else {
      this.navCtrl.push(VersionObsoletePage);
    }
  }

  handleFacadeStatus(response: any) {
    if (response) {
      if (response.state == "off") {
        this.isStateOff = true;
      }
      else if (response.is_usable) {
        this.isFacadeUp = true;
      }
      else {
        this.time.getNextTimeUp().subscribe(response => this.handleHour(response));
        this.isFacadeUp = false;
      }
      this.isForced = response.is_forced;
    }
  }

  handleHour(time: string) {
    let splitted_time: string[] = time.split("T");

    let splitted: string[] = splitted_time[1].split(":");
    let date: Date = new Date();


    date.setHours(parseInt(splitted[0]));
    date.setMinutes(parseInt(splitted[1]));

    this.nextTime = date;
  }

  start() {

    //Ask for an authentication token
    if (this.isPwdDisplayed) {
      this.authentication
        .adminAuth(this.userName.trim(), this.password.trim())
        .subscribe(isAuthenticated =>
          this.pushPage(isAuthenticated), err => console.log(err));
    } else {
      this.authentication
        .normalAuth(this.userName)
        .subscribe(isAuthenticated =>
          this.pushPage(isAuthenticated));
    }
  }

  /**
   * If the user is authenticated, proceed to the fapp list
   * @param isAuthenticated
   */
  pushPage(isAuthenticated: boolean) {
    if (isAuthenticated) {
      //Save the user name in the local storage
      this.localStorageProvider.setUserName(this.userName);

      //Change page
      this.navCtrl.push(FAppListPage);
    } else {
      this.isRefused = true;
    }
  }

  displayPwd() {
    this.isPwdDisplayed = !this.isPwdDisplayed;
    if (!this.isPwdDisplayed) {
      this.password = '';
    }
  }

  /**
   * If the user tap the header more than 7, display the password field
   * If the user keep tapping, the field will hide/show depending on its state.
   * @param event
   */
  headerTapEvent(event) {
    this.nbHeaderTapped++;

    if (this.nbHeaderTapped > 8) {
      this.displayPwd();
      this.userName = '';
    }
  }

  ionViewWillLeave() {
    //Stop checking the server status
    this.serverUpSubscription.unsubscribe();
  }

  startTetrisBlock() {
    this.navCtrl.push(OfflineTetrisPage);
  }
}
