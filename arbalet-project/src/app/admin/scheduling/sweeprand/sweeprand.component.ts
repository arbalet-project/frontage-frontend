import { Component, OnInit } from '@angular/core';
import { FApp } from 'src/app/core/state/models/f-app';
import { State } from 'src/app/core/state/state.service';
import { ApiService } from 'src/app/core/api/api.service';
import { FAppService } from 'src/app/core/api/app.service';

@Component({
  selector: 'app-sweeprand',
  templateUrl: './sweeprand.component.html',
  styleUrls: ['./sweeprand.component.scss'],
})
export class SweeprandComponent implements OnInit {
  public fApp: FApp;

  constructor(public state: State, public http: FAppService) { }

  ngOnInit() {
    this.fApp = this.state.fAppList.findByName('SweepRand');
  }

  updateScheduled(event: CustomEvent) {
    this.http.setScheduled(this.fApp.name, event.detail.checked);
  }
}
