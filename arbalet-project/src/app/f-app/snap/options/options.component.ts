import { Component, OnInit, Input } from '@angular/core';
import { FApp } from 'src/app/core/state/models/f-app';
import { State } from 'src/app/core/state/state.service';
import { FAppService } from 'src/app/core/api/app.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
})
export class OptionsComponent implements OnInit {

  public fApp: FApp;

  constructor(public state: State, public http: FAppService) { }

  ngOnInit() {
    this.fApp = this.state.fAppList.findByName('Snap');
  }

  startFApp() {
    this.http.launchForcedFApp({
      name: this.fApp.name
    }).subscribe((res) => {
      console.log(res);
    });
  }
}
