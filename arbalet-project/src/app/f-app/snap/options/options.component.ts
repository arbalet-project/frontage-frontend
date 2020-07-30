import { Component, OnInit } from '@angular/core';
import { FApp } from 'src/app/core/state/models/f-app';
import { State } from 'src/app/core/state/state.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class OptionsComponent implements OnInit {

  public fApp: FApp;

  constructor(public state: State) { }

  ngOnInit() {
    this.fApp = this.state.fAppList.findByName('Snap');
  }

  startFApp() {

  }
}
