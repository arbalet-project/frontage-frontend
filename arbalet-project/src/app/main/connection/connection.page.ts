import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/core/http/http.service";
import { environment } from "src/environments/environment";
import { AlertController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-connection",
  templateUrl: "./connection.page.html",
  styleUrls: ["./connection.page.scss"],
})
export class ConnectionPage {
  public statusServer: boolean = false;
  public statusOff: boolean = false;
  public facadeUp: boolean = false;
  public forced : boolean = false;

  constructor(
    private api: HttpService,
    public alertCtrl: AlertController,
    public translate: TranslateService
  ) {}

  ionViewWillEnter() {
    this.update();
    // if (!this.isServerUp) {
    //  TODO : Periodically
    // }
  }

  public update(): void {
    this.api.statusServer().subscribe((status) => {
      if (
        status.protocol_version === environment.protocol_version &&
        status.is_up
      ) {
        this.updateStatus();
      } else if (status.protocol_version !== environment.protocol_version) {
        this.showOutdated();
      }
    });
  }

  public updateStatus(): void {
    this.statusServer = true;
    this.api.statusFacade().subscribe((status) => {
      if (status.state == "off")
        this.statusOff = true;
      else if (status.is_usable)
        this.facadeUp = true;
      else {
        this.updateHour(status.next_on_time);
        this.facadeUp = false;
      }
      this.forced = status.is_forced;
    });
  }

  public updateHour(time : string) {
    
  }

  public showOutdated(): void {
    this.translate
      .get(["outdated.title", "outdated.message"])
      .subscribe((translation) => {
        this.alertCtrl
          .create({
            header: translation["outdated.title"],
            subHeader: translation["outdated.message"],
            buttons: ["OK"],
          })
          .then((altEl) => altEl.present());
      });
  }
}
