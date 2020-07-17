import { Component, OnInit } from '@angular/core';
import { FAppService } from '../core/api/app.service';
import { FAppListService } from '../core/state/f-app-list.service';

@Component({
  selector: 'app-f-app',
  templateUrl: './f-app.page.html',
  styleUrls: ['./f-app.page.scss'],
})
export class FAppPage {
  public fAppKnow: Array<string> = [
    'Flags',
    'RandomFlashing',
    'SweepRand',
    'SweepAsync',
    'Tetris',
    'Snake',
    'Drawing',
    'Snap',
  ];

  constructor(private fApp: FAppService, public fAppList: FAppListService) {}

  ionViewWillEnter() {
    this.fAppList.reset();
    this.fApp.getList().subscribe((fAppList) => {
      fAppList.forEach((fApp) => {
        if (this.fAppKnow.includes(fApp.name)) {
          this.fAppList.push(fApp);
        } else {
          console.error(
            `This app '${fApp.name}' is not know to the frontend, skipping`
          );
        }
      });
    });
  }
}
