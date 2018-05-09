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
  isStateOff:Boolean=false;
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
    this.authentication.isServerUp()
      .subscribe(response => this.checkFacade(response), e => e);

    //If the server is not up check periodicaly his status
    if (!this.isServerUp) {
      this.serverUpSubscription = Observable.interval(5000).subscribe(() => {
        this.authentication.isServerUp()
          .subscribe(isServerUp => this.checkFacade(isServerUp), e => e);
      });
    }
  }

  checkFacade(response: any) {
    let protocolVersion: Number = response.protocol_version;
    let isServerUp: boolean = response.is_up;

    if (protocolVersion === environment.protocol_version) {
      if (isServerUp) {
        this.isServerUp = isServerUp;
        this.authentication.isFacadeUp()
          .subscribe(response => this.handleFacadeStatus(response.is_usable));
      }
    } else {
      this.navCtrl.push(VersionObsoletePage);
    }
  }

  handleFacadeStatus(response: any) {

    if (response) {
      if(response.state == "off") {
        this.isStateOff = true;
      }
      this.isFacadeUp = true;
    } else {
      this.time.getNextTimeUp().subscribe(response => this.handleHour(response));
      this.isFacadeUp = false;
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

    //FIXME : Remove for PROD§§§§§
    // if (this.password
    //   && this.password.length > 0) {
    //   this.password = "frontagepassword";
    //   this.userName = "frontageadmin";
    // }

    //Ask for an authentication token
    if (this.isPwdDisplayed) {
      this.authentication
        .adminAuth(this.userName, this.password)
        .subscribe(isAuthenticated =>
          this.pushPage(isAuthenticated));
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
    }
  }

  ionViewWillLeave() {
    //Stop checking the server status
    this.serverUpSubscription.unsubscribe();
  }
}