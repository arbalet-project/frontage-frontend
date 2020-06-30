import { Component, OnInit } from "@angular/core";
import { ActionSheetController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  slideOpts = {
    speed: 1500,
    loop: true,
    autoplay: {
      delay: 1500,
      stopOnLastSlide: false,
    },
  };

  images = [
    { path: "assets/img/slides/1.jpg" },
    { path: "assets/img/slides/2.jpg" },
    { path: "assets/img/slides/3.jpg" },
    { path: "assets/img/slides/4.jpg" },
    { path: "assets/img/slides/5.jpg" },
    { path: "assets/img/slides/6.jpg" },
  ];

  public selectedLanguage = "fr";

  constructor(
    public actionSheet: ActionSheetController,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    this.translate.onLangChange.subscribe((event) => {
      this.selectedLanguage = event.lang;
    });
  }

  async changeLanguage() {
    const actionSheet = await this.actionSheet.create({
      header: "Langues",
      buttons: [
        {
          text: "French",
          icon: "flag-sharp",
          handler: () => {
            this.translate.use("fr");
          },
        },
        {
          text: "English",
          icon: "flag-sharp",
          handler: () => {
            this.translate.use("en");
          },
        },
        { text: "Cancel", icon: "close", role: "cancel" },
      ],
    });

    actionSheet.present();
  }
}
