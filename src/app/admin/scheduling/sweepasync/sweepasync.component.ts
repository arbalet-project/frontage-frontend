import { Component, OnInit } from '@angular/core';
import { State } from 'src/app/core/state/state.service';
import { FApp } from 'src/app/core/state/models/f-app';
import { ApiService } from 'src/app/core/api/api.service';
import { FAppService } from 'src/app/core/api/app.service';

@Component({
  selector: 'app-sweepasync',
  templateUrl: './sweepasync.component.html',
  styleUrls: ['./sweepasync.component.scss'],
})
export class SweepasyncComponent implements OnInit {

  public fApp: FApp;

  constructor(public state: State, public http: FAppService) { }

  ngOnInit() {
    this.fApp = this.state.fAppList.findByName('SweepAsync');
   }

  ionViewWillLeave() {
    this.state.fAppList.update();
  }
  updateScheduled(event) {
    this.http.setScheduled(this.fApp.name, event.detail.checked);
  }
}
