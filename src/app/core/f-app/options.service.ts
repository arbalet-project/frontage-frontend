import { Injectable } from '@angular/core';
import { FAppService } from '../api/app.service';
import { ModalController, AlertController, NavController } from '@ionic/angular';
import { WaitingComponent } from 'src/app/f-app/components/waiting/waiting.component';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CurrentFApp } from '../api/models/f-app';

@Injectable({
  providedIn: 'root',
})
export class OptionsService {

  public current: CurrentFApp;

  constructor(
    public http: FAppService,
    public modal: ModalController,
    public alert: AlertController,
    public router: Router,
    public translate: TranslateService,
    public nav: NavController
  ) { }

  startFapp(parameters: any, url: string) {
    this.http.launchFApp(parameters).subscribe(async (_) => {
      const modal = await this.modal.create({
        component: WaitingComponent,
      });

      modal.onDidDismiss().then(async ({ data }) => {
        if (data.ok) {
          this.router.navigateByUrl(url);
          this.current = data.result;
        }
        else if (data.kicked) {
          const alert = await this.alert.create({
            header: this.translate.instant('waiting.kicked.title'),
            message: this.translate.instant('waiting.kicked.message'),
            buttons: ['Ok'],
          });

          await alert.present();
        }
      });

      return await modal.present();
    });
  }

  startForcedFApp(parameters: any, url: string) {
    this.http.launchForcedFApp(parameters).subscribe(async (response) => {

      if (!response.forced) { return; }
      const alert = await this.alert.create({
        header: this.translate.instant('f_app.forced.title'),
        message: this.translate.instant('f_app.forced.message'),
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              this.nav.navigateForward('/admin/tabs/fapp');
              alert.dismiss();
            },
          },
        ],
      });
      alert.present();
    });
  }
}
