import { Component, OnInit, ViewChild } from '@angular/core';
import { FApp } from 'src/app/core/state/models/f-app';
import { State } from 'src/app/core/state/state.service';
import { FAppService } from 'src/app/core/api/app.service';
import { ColorlistComponent } from 'src/app/components/fapp/sweeprand/colorlist/colorlist.component';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { VibrationService } from 'src/app/core/plugins/vibration.service';

@Component({
  selector: 'app-sweeprand',
  templateUrl: './sweeprand.component.html',
  styleUrls: ['./sweeprand.component.scss'],
})
export class SweeprandComponent implements OnInit {
  public fApp: FApp;
  @ViewChild('colorList') colorList: ColorlistComponent;

  constructor(
    public state: State,
    public http: FAppService,
    public vibration: VibrationService,
    public alertCtrl: AlertController,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    this.fApp = this.state.fAppList.findByName('SweepRand');
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
          uapp: this.colorList.radio.value,
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
