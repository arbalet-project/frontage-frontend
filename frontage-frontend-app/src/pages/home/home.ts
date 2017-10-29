import { FAppListPage } from './../f-app-list/f-app-list';
import { TimeProvider } from './../../providers/time/time';
import { Observable } from 'rxjs/Rx';
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
  public userName: string = "PainAuChocolat";

  constructor(public navCtrl: NavController, public authentication: AuthenticationProvider, public time:TimeProvider) {

    authentication.isServerUp()
    .subscribe(isServerUp => this.checkFacade(isServerUp), e => this.handleError(e));

    Observable.interval(500 * 60).subscribe(x => {
      authentication.isServerUp()
                    .subscribe(isServerUp => this.checkFacade(isServerUp), e => this.handleError(e));
     });
  }

  checkFacade(isServerUp:boolean) {
    console.log("server up ? " + isServerUp);
    if (isServerUp) {
      this.isServerUp = isServerUp;
      this.authentication.isFacadeUp()
                         .subscribe(isFacadeUp => this.handleFacadeStatus(isFacadeUp));
    }
  }

  

  handleFacadeStatus(isFacadeUp:boolean) {
    console.log("isFacadeUp ? " + isFacadeUp);

    if (isFacadeUp) {
      this.isFacadeUp = true;
    } else {
      this.time.getNextTimeUp().subscribe(response => console.log("Heure : " + JSON.stringify(response)));
      this.time.getNextTimeUp().subscribe(response => this.handleHour(response));
      
      this.isFacadeUp = true;
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
    this.authentication.refreshToken(this.userName)
                       .subscribe(isAuthenticated => this.pushPage(isAuthenticated));
  }

  pushPage(isAuthenticated:boolean) {
    if(isAuthenticated) {
      this.navCtrl.push(FAppListPage)
    } else {
      console.log("Stay here ! ")
    }
  }

  handleError(e: any): any {
    this.exception = e;
    console.log("Error status : " + e.status);
  }

}