import { Component, OnInit } from '@angular/core';
import { State } from 'src/app/core/state/state.service';
import { FAppService } from 'src/app/core/api/app.service';
import { FApp } from 'src/app/core/state/models/f-app';

@Component({
  selector: 'app-randomflashing',
  templateUrl: './randomflashing.component.html',
  styleUrls: ['./randomflashing.component.scss'],
})
export class RandomflashingComponent implements OnInit {
  public fApp: FApp;

  constructor(public state: State, public http: FAppService) { }

  ngOnInit() {
    this.fApp = this.state.fAppList.findByName('RandomFlashing');
  }
  
  updateScheduled(event: CustomEvent) {
    this.http.setScheduled(this.fApp.name, event.detail.checked);
  }

  sendParameters() {
      // this.http.sendParameters({
      //   name: this.fApp.name,
      //   params: {
      //     uapp: this.flags.list.value
      //   }
      // }).subscribe((res) => {
      //   console.log(res);
      //   // TODO : Make this a popup like before !
      // });
  }
}
