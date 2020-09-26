import { Component, OnInit, ViewChild } from '@angular/core';
import { State } from 'src/app/core/state/state.service';
import { FAppService } from 'src/app/core/api/app.service';
import { FApp } from 'src/app/core/state/models/f-app';
import { RandomflashingListComponent } from 'src/app/components/fapp/randomflashing/randomflashing.component';
import { VibrationService } from 'src/app/core/plugins/vibration.service';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-randomflashing',
  templateUrl: './randomflashing.component.html',
  styleUrls: ['./randomflashing.component.scss'],
})
export class RandomflashingComponent implements OnInit {
  public fApp: FApp;
  @ViewChild('randomFlashing') randomFlashing: RandomflashingListComponent;

  constructor(
    public state: State,
    public http: FAppService,
    public vibration: VibrationService,
    public alertCtrl: AlertController,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.fApp = this.state.fAppList.findByName('RandomFlashing');
  }

  updateScheduled(event: CustomEvent) {
    this.http.setScheduled(this.fApp.name, event.detail.checked);
  }

  ionViewWillLeave() {
    this.state.fAppList.update();
  }

  sendParameters() {
    const color = this.randomFlashing.colors.get(
      this.randomFlashing.list.value
    );
    this.http
      .sendParameters({
        name: this.fApp.name,
        params: {
          colors: [color.h, color.s, color.v],
        },
      })
      .subscribe(async (res) => {
        if (!res.done) { return; }
        this.vibration.vibrate();
        const alert = await this.alertCtrl.create({
          header: this.translate.instant('f_app.parameters.title'),
          message: this.translate.instant('f_app.parameters.message'),
          buttons: [
            {
              text: 'Ok',
              handler: () => {
                alert.dismiss();
              }
            },
          ],
        });
        alert.present();
      });
  }
}
