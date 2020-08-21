import { Injectable } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AdminFormService {
  private nbActive = 0;
  private nbActiveMax = 0;

  constructor(
    private alertCtrl: AlertController,
    public translate: TranslateService,
    public auth: AuthenticationService,
    private navCtrl: NavController
  ) {}

  public activate() {
    this.nbActive++;

    if (this.nbActive > this.nbActiveMax) {
      this.displayForm();
    }
  }

  public async displayForm() {
    const alert = await this.alertCtrl.create({
      header: this.translate.instant('admin.form.title'),
      inputs: [
        {
          name: 'username',
          placeholder: this.translate.instant(
            'admin.form.username_placeholder'
          ),
          type: 'text',
        },
        {
          name: 'password',
          type: 'password',
          placeholder: this.translate.instant(
            'admin.form.password_placeholder'
          ),
        },
      ],
      buttons: [
        {
          text: this.translate.instant('action.cancel'),
        },
        {
          text: this.translate.instant('action.login'),
          handler: (data) => {
            this.auth
              .adminAuth(data.username, data.password)
              .subscribe((res: boolean) => {
                if (res) {
                  this.navCtrl.navigateForward('/admin'); // TODO : NavControl !
                } else {
                  // TODO : Error
                }
              });
          },
        },
      ],
    });

    await alert.present();
  }
}
