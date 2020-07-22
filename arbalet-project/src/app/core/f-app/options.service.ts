import { Injectable } from "@angular/core";
import { FAppService } from "../api/app.service";
import { ModalController, AlertController } from "@ionic/angular";
import { WaitingComponent } from "src/app/f-app/components/waiting/waiting.component";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root",
})
export class OptionsService {
  
  constructor(
    public http: FAppService,
    public modal: ModalController,
    public alert: AlertController,
    public router: Router,
    public translate: TranslateService
  ) { }

  startFapp(parameters: any, url: string) {
    this.http.launchFApp(parameters).subscribe(async (r) => {
      const modal = await this.modal.create({
        component: WaitingComponent,
      });

      modal.onDidDismiss().then(async ({ data }) => {
        if (data.ok) {
          this.router.navigateByUrl(url);
        } else {
          const alert = await this.alert.create({
            header: this.translate.instant("waiting.kicked.title"),
            message: this.translate.instant("waiting.kicked.message"),
            buttons: ["Ok"],
          });

          await alert.present();
        }
      });

      return await modal.present();
    });
  }
}
