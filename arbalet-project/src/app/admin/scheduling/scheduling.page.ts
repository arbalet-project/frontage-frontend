import { Component, OnInit } from '@angular/core';
import { State } from 'src/app/core/state/state.service';
import { FApp } from 'src/app/core/state/models/f-app';

@Component({
  selector: 'app-admin-scheduling',
  templateUrl: './scheduling.page.html',
})
export class SchedulingPage implements OnInit {
  public filterList: Array<FApp>;
  private fAppScheduled: Array<string> = [
    'Flags',
    'RandomFlashing',
    'SweepRand',
    'SweepAsync',
    'Drawing'
  ];
  constructor(public state: State) { }

  ngOnInit() {
    this.filterList = this.state.fAppList.list.filter((fApp) => {
      return this.fAppScheduled.includes(fApp.name);
    });
  }

}
