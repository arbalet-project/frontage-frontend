import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/core/http/http.service";
import { environment } from 'src/environments/environment';

@Component({
  selector: "app-connection",
  templateUrl: "./connection.page.html",
  styleUrls: ["./connection.page.scss"],
})
export class ConnectionPage {
  public statusServer: boolean = false;

  constructor(private api: HttpService) {}

  ionViewWillEnter() {
    this.update();
    // if (!this.isServerUp) {
    //  TODO : Periodically
    // }
  }

  public update(): void {
    this.api.statusServer().subscribe(status => {
      if(status.protocol_version == environment.protocol_version && status.is_up) {
        this.updateStatus();
      }
    });
  }

  public updateStatus(): void {
    this.statusServer = true;
    this.api.statusFacade().subscribe(status => {
      // TODO : Make update here
    });
  }
}
