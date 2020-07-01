import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class AdminFormService {
  private nbActive: number = 0;
  private nbActiveMax: number = 8;

  constructor(private alertCtrl: AlertController) {}

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
            console.log(data);
            console.log("Saved clicked");
          },
        },
      ],
    });

    let t = await alert.present();
    console.log(t);
  }
}
