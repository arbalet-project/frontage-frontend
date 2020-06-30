import { Component } from "@angular/core";
import { ActionSheetController } from "@ionic/angular";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage {
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

  constructor(public actionSheet: ActionSheetController) {}

  async changeLanguage() {
    const actionSheet = await this.actionSheet.create({
      header: "Langues",
      buttons: [
        { text: "French", icon: "flag-sharp", handler: () => { console.log("test 1")}},
        { text : "English", icon: "flag-sharp" },
        { text: "Cancel", icon: "close", role: "cancel" }
      ],
    });

    actionSheet.present();
  }
}
