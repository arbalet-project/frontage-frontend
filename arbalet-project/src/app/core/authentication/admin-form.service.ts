import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: "root",
})
export class AdminFormService {
  private nbActive: number = 0;
  private nbActiveMax: number = 8;

  constructor(
    private alertCtrl: AlertController,
    public translate: TranslateService,
    public auth: AuthenticationService
  ) {}

  public activate() {
    this.nbActive++;

    if (this.nbActive > this.nbActiveMax) {
      this.displayForm();
    }
  }

  public async displayForm() {
    let alert = await this.alertCtrl.create({
      header: "Username",
      message: "Enter your username",
      inputs: [
        {
          name: "username",
          type: "text",
          placeholder: "Your admin username",
        },
        { name: "password", type: "password" },
      ],
      buttons: [
        {
          text: "Cancel",
          handler: () => {
            console.log("Cancel clicked");
          },
        },
        {
          text: "Save",
          handler: (data) => {
            this.auth.adminAuth(data.username, data.password);
            // TODO : Error
            // TODO : NavControl !
          },
        },
      ],
    });

    let t = await alert.present();
    console.log(t);
  }
}
