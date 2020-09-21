import { Injectable } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationFormComponent } from './authentication-form/authentication-form.component';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AdminFormService {
  private nbActive = 0;
  private nbActiveMax = 9;

  constructor(
    private modalController: ModalController,
    public translate: TranslateService,
    public auth: AuthenticationService,
  ) { }

  public activate() {
    this.nbActive++;

    if (this.nbActive > this.nbActiveMax) {
      this.displayForm();
    }
  }

  public async displayForm() {
    const modal = await this.modalController.create({
      component: AuthenticationFormComponent,
    });
    return await modal.present();
  }
}
