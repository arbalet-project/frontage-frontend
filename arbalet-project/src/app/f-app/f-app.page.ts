import { Component, OnInit } from "@angular/core";
import { FAppService } from "../core/f-app/f-app.service";
import { FApp } from "../core/f-app/models/f-app";

@Component({
  selector: "app-f-app",
  templateUrl: "./f-app.page.html",
  styleUrls: ["./f-app.page.scss"],
})
export class FAppPage {
  public fAppList: Array<FApp> = [];
  public fAppKnow: Array<string> = [
    "Flags",
    "RandomFlashing",
    "SweepRand",
    "SweepAsync",
    "Tetris",
    "Snake",
    "Drawing",
    "Snap",
  ];

  constructor(private fApp: FAppService) {}

  ionViewWillEnter() {
    this.fApp.getList().subscribe((fAppList) => {
      fAppList.forEach((fApp) => {
        if (this.fAppKnow.includes(fApp.name)) {
          this.fAppList.push(fApp);
          console.log(fApp);
        } else {
          console.log(
            "This app '" + fApp.name + "' is not know to the frontend, skipping"
          );
        }
      });
    });
  }
}
