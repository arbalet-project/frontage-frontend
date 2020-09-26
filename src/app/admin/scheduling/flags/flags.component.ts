import { Component, OnInit, ViewChild } from '@angular/core';
import { State } from 'src/app/core/state/state.service';
import { FAppService } from 'src/app/core/api/app.service';
import { FApp } from 'src/app/core/state/models/f-app';
import { FlagListComponent } from 'src/app/components/fapp/flags/flag-list/flag-list.component';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { VibrationService } from 'src/app/core/plugins/vibration.service';

@Component({
  selector: 'app-flags-settings',
  templateUrl: './flags.component.html',
  styleUrls: ['./flags.component.scss'],
})
export class FlagsComponent implements OnInit {
  public fApp: FApp;
  @ViewChild('flags') flags: FlagListComponent;

  constructor(
    public state: State,
    public http: FAppService,
    public vibration: VibrationService,
    public alertCtrl: AlertController,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    this.fApp = this.state.fAppList.findByName('Flags');
  }

  updateScheduled(event: CustomEvent) {
    this.http.setScheduled(this.fApp.name, event.detail.checked);
  }

  ionViewWillLeave() {
    this.state.fAppList.update();
  }

  sendParameters() {
    this.http
      .sendParameters({
        name: this.fApp.name,
        params: {
          flags: this.flags.list.value,
        },
      })
      .subscribe(async (res) => {
        if (!res.done) {
          return;
        }
        this.vibration.vibrate();
        const alert = await this.alertCtrl.create({
          header: this.translate.instant('f_app.parameters.title'),
          message: this.translate.instant('f_app.parameters.message'),
          buttons: [
            {
              text: 'Ok',
              handler: () => {
                alert.dismiss();
              },
            },
          ],
        });
        alert.present();
      });
  }
}
