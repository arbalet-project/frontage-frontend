import { Component, OnInit, ViewChild } from '@angular/core';
import { State } from 'src/app/core/state/state.service';
import { FAppService } from 'src/app/core/api/app.service';
import { FApp } from 'src/app/core/state/models/f-app';
import { RandomflashingListComponent } from 'src/app/components/fapp/randomflashing/randomflashing.component';

@Component({
  selector: 'app-randomflashing',
  templateUrl: './randomflashing.component.html',
  styleUrls: ['./randomflashing.component.scss'],
})
export class RandomflashingComponent implements OnInit {
  public fApp: FApp;
  @ViewChild('randomFlashing') randomFlashing: RandomflashingListComponent;

  constructor(public state: State, public http: FAppService) { }

  ngOnInit() {
    this.fApp = this.state.fAppList.findByName('RandomFlashing');
  }

  updateScheduled(event: CustomEvent) {
    this.http.setScheduled(this.fApp.name, event.detail.checked);
  }

  sendParameters() {
    const color = this.randomFlashing.colors.get(this.randomFlashing.list.value);
      this.http.sendParameters({
        name: this.fApp.name,
        params: {
          colors: [
            color.h,
            color.s,
            color.v
          ]
        }
      }).subscribe((res) => {
        console.log(res);
        // TODO : Make this a popup like before !
      });
  }
}
