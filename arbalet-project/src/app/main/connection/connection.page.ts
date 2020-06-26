import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/core/http/http.service";
import { environment } from "src/environments/environment";
import { AlertController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { FrontageService } from "src/app/core/frontage/frontage.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NicknameGeneratorService } from "src/app/core/nickname_generator/nickname-generator.service";

@Component({
  selector: "app-connection",
  templateUrl: "./connection.page.html",
  styleUrls: ["./connection.page.scss"],
})
export class ConnectionPage implements OnInit {
  public statusServer: boolean = false;
  public facadeUp: boolean = false;
  public messageKey = "";
  public subMessage = "";
  public form: FormGroup;

  constructor(
    private api: HttpService,
    public alertCtrl: AlertController,
    public translate: TranslateService,
    public frontage: FrontageService,
    private nickname: NicknameGeneratorService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl(this.nickname.generateNickname(), {
        updateOn: "blur",
        validators: [Validators.required],
      }),
    });
  }

  ionViewWillEnter() {
    this.update();
    // if (!this.isServerUp) {
    //  TODO : Periodically
    // }
    console.log("TODO");
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

  /**
   * @remarks Update app with the api status.
   */
  public updateStatus(): void {
    this.statusServer = true;
    this.api.statusFacade().subscribe((status) => {
      if (status.state == "off") {
        this.messageKey = "connection.message.not_available";
        this.subMessage = "";
      } else if (status.is_usable) this.facadeUp = true;
      else if (status.is_forced) {
        this.messageKey = "connection.message.forced";
        this.subMessage = "";
      } else {
        this.facadeUp = false;
        this.updateHour(status.next_on_time);
        this.messageKey = "connection.message.down_alert";
      }

      this.frontage.height = status.height;
      this.frontage.width = status.width;
      this.frontage.disabled = status.disabled;
    });
  }

  public updateHour(time: string) {
    console.log("TODO");
  }

  /**
   * @remarks Show an alert controller if the user has not updated the app.
   */
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
