import { Component, OnInit } from '@angular/core';
import { FApp } from 'src/app/core/state/models/f-app';
import { State } from 'src/app/core/state/state.service';
import { OptionsService } from 'src/app/core/f-app/options.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
})
export class OptionsPage implements OnInit {
  public fApp: FApp;

  constructor(public state: State, public options: OptionsService) { }

  ngOnInit() {
    this.fApp = this.state.fAppList.findByName('SweepAsync');
  }

  startFApp() {
    this.options.startFapp({
      name: this.fApp.name,
    }, '/f-app/sweepasync');
  }

}
