import { TimeProvider } from './../../providers/time/time';
import { FAppListPage } from './../f-app-list/f-app-list';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  isServerUp:boolean=false;
  isFacadeUp:boolean=false;
  exception: any;
  nextTime: Date;


  constructor(public navCtrl: NavController, public authentication: AuthenticationProvider, public time:TimeProvider) {

    authentication.isServerUp()
                  .subscribe(isServerUp => this.checkFacade(isServerUp), e => this.handleError(e));

  }

  checkFacade(isServerUp:boolean) {
    if (isServerUp) {
      console.log("server up ? " + isServerUp);
      this.isServerUp = isServerUp;
      this.authentication.isFacadeUp()
                         .subscribe(isFacadeUp => this.handleFacadeStatus(isFacadeUp));
    }
  }

  

  handleFacadeStatus(isFacadeUp:boolean) {

    let tagada:number = 5;

    if (isFacadeUp) {
      console.log("isFacadeUp " + isFacadeUp);
      this.isFacadeUp = true;
    } else {
      this.time.getNextTimeUp().subscribe(response => console.log("Heure : " + JSON.stringify(response)));
      this.time.getNextTimeUp().subscribe(response => this.handleHour(response));


      
    }
  }

  handleHour(time:string) {
    
    let splitted:string[] = time.split(":");
    let date:Date=new Date();
    console.log("Date 1: " + JSON.stringify(date));

    date.setUTCHours(parseInt(splitted[0]));
    date.setUTCMinutes(parseInt(splitted[1]));
    console.log("Date 2: " + JSON.stringify(date));

    this.nextTime=date;
  }

  start() {
    
    this.authentication.refreshToken()
                       .subscribe(isAuthenticated => this.pushPage(isAuthenticated));
    console.log('Token : ' + JSON.stringify(this.authentication.token));
  }

  pushPage(isAuthenticated:boolean) {
    if(isAuthenticated) {
      this.navCtrl.push(FAppListPage)
    }
  }

  handleError(e: any): any {
    this.exception = e;
    console.log("Error status : " + e.status);
  }

}