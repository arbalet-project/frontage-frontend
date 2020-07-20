import { Component, OnInit } from '@angular/core';
import { FApp } from 'src/app/core/state/models/f-app';
import { State } from 'src/app/core/state/state.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss'],
})
export class OptionsPage implements OnInit {
  public fApp : FApp;
  constructor(private state : State) { }

  ngOnInit() {
    this.fApp = this.state.fAppList.findByName('Snake');
  }

  startFApp() {
    
  }

}
