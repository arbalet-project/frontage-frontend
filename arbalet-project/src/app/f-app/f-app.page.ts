import { Component, OnInit } from '@angular/core';
import { FAppService } from '../core/api/app.service';
import { State } from '../core/state/state.service';

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

  constructor(private fApp: FAppService, public state: State) {}

  ionViewWillEnter() {
    this.state.fAppList.reset();
    this.fApp.getList().subscribe((fAppList) => {
      fAppList.forEach((fApp) => {
        if (this.fAppKnow.includes(fApp.name)) {
          this.state.fAppList.push(fApp);
        } else {
          console.error(
            `This app '${fApp.name}' is not know to the frontend, skipping`
          );
        }
      });
    });
  }
}
