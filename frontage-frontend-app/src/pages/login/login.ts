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
  isPwdDisplayed: boolean = false;
  nbHeaderTapped: number = 0;

  exception: any;
  nextTime: Date;
  userName: string;
  password: string;

  serverUpSubscription: Subscription;

  constructor(private navCtrl: NavController, private authentication: AuthenticationProvider, private time: TimeProvider,
    nicknameGeneratorProvider: NicknameGeneratorProvider, public localStorageProvider: LocalStorageProvider) {

    this.userName = nicknameGeneratorProvider.generateNickname();
    authentication.isServerUp()
      .subscribe(isServerUp => this.checkFacade(isServerUp), e => e);

    //If the server is not up check periodicaly his status
    if (!this.isServerUp) {
      this.serverUpSubscription = Observable.interval(500 * 60).subscribe(x => {
        authentication.isServerUp()
          .subscribe(isServerUp => this.checkFacade(isServerUp), e => e);
      });
    }
  }

  checkFacade(isServerUp: boolean) {
    if (isServerUp) {
      this.isServerUp = isServerUp;
      this.authentication.isFacadeUp()
        .subscribe(response => this.handleFacadeStatus(response));
    }
  }

  handleFacadeStatus(response: boolean) {

    if (response) {
      this.isFacadeUp = true;
    } else {
      this.time.getNextTimeUp().subscribe(response => console.log("Heure : " + JSON.stringify(response)));
      this.time.getNextTimeUp().subscribe(response => this.handleHour(response));

      this.isFacadeUp = false;
    }
  }

  handleHour(time: string) {

    let splitted: string[] = time.split(":");
    let date: Date = new Date();

    date.setUTCHours(parseInt(splitted[0]));
    date.setUTCMinutes(parseInt(splitted[1]));

    this.nextTime = date;
  }

  start() {
    //Stop checking the server status
    this.serverUpSubscription.unsubscribe();

    //Ask for an authentication token
    this.authentication
      .auth(this.userName, this.password)
      .subscribe(isAuthenticated =>
        this.pushPage(isAuthenticated));
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
    }
  }

  displayPwd() {
    this.isPwdDisplayed = !this.isPwdDisplayed;
  }

  /**
   * If the user tap the header more than 7, display the password field
   * If the user keep tapping, the field will hide/show depending on its state.
   * @param event 
   */
  headerTapEvent(event) {
    this.nbHeaderTapped++;
    console.log(this.nbHeaderTapped);

    if (this.nbHeaderTapped > 7) {
      this.displayPwd();
    }
  }

}