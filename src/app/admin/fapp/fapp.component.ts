import { Component } from '@angular/core';
import { FAppService } from 'src/app/core/api/app.service';
import { State } from 'src/app/core/state/state.service';

@Component({
  selector: 'app-fapp',
  templateUrl: './fapp.component.html'
})
export class FappComponent {

  constructor(public state: State,
    public http: FAppService) { }

  unForceFApp() {
    this.http.unForceFApp().subscribe(res => {

      if (res.removed) {
        setTimeout(() => {
          this.updateStatus();
        }, 1000);
      }
    });
  }

  public updateStatus() {
    this.state.updateState().subscribe();
  }
}
