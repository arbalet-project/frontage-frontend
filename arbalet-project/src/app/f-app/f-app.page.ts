import { Component, OnInit } from '@angular/core';
import { FAppService } from '../core/f-app/f-app.service';

@Component({
  selector: 'app-f-app',
  templateUrl: './f-app.page.html',
  styleUrls: ['./f-app.page.scss'],
})
export class FAppPage {
  public fAppList;

  constructor(private fApp: FAppService) { }

  ionViewWillEnter() {
    this.fApp.getList().subscribe(fAppList => {
      console.log(fAppList);
      for(let fApp in fAppList) {
        console.log(fApp);
      }
    })
  }

}
