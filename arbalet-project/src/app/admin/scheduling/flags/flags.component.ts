import { Component, OnInit, ViewChild } from '@angular/core';
import { State } from 'src/app/core/state/state.service';
import { FAppService } from 'src/app/core/api/app.service';
import { FApp } from 'src/app/core/state/models/f-app';
import { FlagListComponent } from 'src/app/components/fapp/flags/flag-list/flag-list.component';

@Component({
  selector: 'app-flags-settings',
  templateUrl: './flags.component.html',
  styleUrls: ['./flags.component.scss'],
})
export class FlagsComponent implements OnInit {

  public fApp: FApp;
  @ViewChild('flags') flags: FlagListComponent;

  constructor(public state: State, public http: FAppService) { }

  ngOnInit() {
    this.fApp = this.state.fAppList.findByName('Flags');
  }

  updateScheduled(event: CustomEvent) {
    this.http.setScheduled(this.fApp.name, event.detail.checked);
  }

  sendParameters() {
      this.http.sendParameters({
        name: this.fApp.name,
        params: {
          uapp: this.flags.list.value
        }
      }).subscribe((res) => {
        console.log(res);
        // TODO : Make this a popup like before !
      });
  }
}
