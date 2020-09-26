import { Component, OnInit } from '@angular/core';
import { State } from 'src/app/core/state/state.service';
import { FApp } from 'src/app/core/state/models/f-app';
import { FAppService } from 'src/app/core/api/app.service';

@Component({
  selector: 'app-drawing',
  templateUrl: './drawing.component.html',
  styleUrls: ['./drawing.component.scss'],
})
export class DrawingComponent implements OnInit {
  public fApp: FApp;

  constructor(public state: State, public http: FAppService) { }

  ngOnInit() {
    this.fApp = this.state.fAppList.findByName('Drawing');
  }

  updateScheduled(event) {
    this.http.setScheduled(this.fApp.name, event.detail.checked);
  }

  ionViewWillLeave() {
    this.state.fAppList.update();
  }
}
