import { Component, OnInit } from '@angular/core';
import { State } from 'src/app/core/state/state.service';
import { FAppService } from 'src/app/core/api/app.service';
import { FApp } from 'src/app/core/state/models/f-app';
import { ColorEvent } from 'ngx-color';

@Component({
  selector: 'app-randomflashing',
  templateUrl: './randomflashing.component.html',
  styleUrls: ['./randomflashing.component.scss'],
})
export class RandomflashingComponent implements OnInit {
  public fApp: FApp;
  public color = {h: 2.01158940397351, s: 0, v: 1, a: 1};

  constructor(public state: State, public http: FAppService) { }

  ngOnInit() {
    this.fApp = this.state.fAppList.findByName('RandomFlashing');
  }

  updateScheduled(event: CustomEvent) {
    this.http.setScheduled(this.fApp.name, event.detail.checked);
  }
  handleChange(event: ColorEvent) {
    this.color =  event.color.hsv;
  }

  sendParameters() {
      this.http.sendParameters({
        name: this.fApp.name,
        params: {
          colors: [
            this.color.h,
            this.color.s,
            this.color.v
          ]
        }
      }).subscribe((res) => {
        console.log(res);
        // TODO : Make this a popup like before !
      });
  }
}
