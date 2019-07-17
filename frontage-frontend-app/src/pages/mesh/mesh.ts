// import { Vibration } from '@ionic-native/vibration';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationProvider } from './../../providers/authentication/authentication';
import { AdminProvider } from './../../providers/admin/admin';
import { Component } from '@angular/core';
import { LocalStorageProvider } from './../../providers/local-storage/local-storage';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { WebsocketMessageHandlerProvider } from './../../providers/websocket-message-handler/websocket-message-handler';
import { GridPage } from '../grid/grid';
// import { RacPage } from '../rac/rac';


@Component({
  selector: 'page-mesh',
  templateUrl: 'mesh.html',
})


export class MeshPage {

    fAppOptions: any;
    buildingWidth: number;
    buildingHeight: number;
    totalAmount: number;
    badDimensions: boolean = false;
    dimensionsAccepted: boolean = false;

    loading: boolean = false;

    popupMessage: string;

    constructor(public navCtrl: NavController,
      public websocketMessageHandlerProvider: WebsocketMessageHandlerProvider,
      public navParams: NavParams,
      public adminProvider: AdminProvider,
      public authentication: AuthenticationProvider,
      public translateService: TranslateService,
      public dataFAppsProvider: DataFAppsProvider,
      private alertCtrl: AlertController,
      public localStorageProvider : LocalStorageProvider) {

      this.fAppOptions = {
        name: "Ama",
        params: {
          mode: "",
        }
      }

    }
    /**
     * Init data
     */
    ngOnInit() {

        this.translateService.get("MESH_LOAD_ADDRESSING").subscribe(resp => {
            this.popupMessage = resp;
        });

        this.adminProvider.getBuildingDimensions().subscribe(resp => {
            if (resp['height'] > 0)
              this.buildingHeight = resp['height'];
            if (resp['width'] > 0)
              this.buildingWidth = resp['width'];
            if (resp['amount'] > 0)
              this.totalAmount = resp['amount'];
          });
    }

    /**
     * Navigation
     */
    goToSettings() {
      this.navCtrl.pop();
    }

    goToGridPage() {
      this.fAppOptions.params.mode = "ama";
      console.log(this.fAppOptions);
      this.adminProvider.launchForcedFApp(this.fAppOptions)
          .subscribe(response => this.navCtrl.push(GridPage), err => console.log(err));
      }
    /*
    goToRacPage() {
        this.fAppOptions.params.mode = "rac";
        console.log(this.fAppOptions);
        this.adminProvider.launchForcedFApp(this.fAppOptions)
            .subscribe(response => this.navCtrl.push(RacPage), err => console.log(err));
    }
    */
    skip() {
        this.fAppOptions.params.mode = "skip";
        this.adminProvider.launchForcedFApp(this.fAppOptions)
            .subscribe(response => this.showSkipPopUp(), err => console.log(err));

    }

    showSkipPopUp() {

        this.loading = true;
        let loader = document.getElementById("loader");
        loader.style.visibility = "visible";

      setTimeout(() => {

          loader.style.visibility = "hidden";
          this.loading = false;

          const popUp = this.alertCtrl.create({
            message: this.popupMessage,
            enableBackdropDismiss: false,
            buttons: [{
              text: 'Ok',
              handler: () => {
              popUp.dismiss().then(() => {
                  this.dataFAppsProvider.stopApp();
                  this.navCtrl.pop();
                });
                return false;
              }
            }]
          });

          popUp.present();

    }, this.totalAmount*100);

    }


    validateDimensions() {
        if (this.buildingHeight > 0 && this.buildingWidth > 0 && this.totalAmount > 0
        && this.totalAmount <= this.buildingHeight * this.buildingWidth) {

            let dimensions = {
                width: this.buildingWidth,
                height: this.buildingHeight,
                amount: this.totalAmount
            }

            this.adminProvider.setBuildingDimensions(dimensions).subscribe(resp => {
                this.badDimensions = false;
                this.dimensionsAccepted = true;
            });
            this.localStorageProvider.setHeight(this.buildingHeight);
            this.localStorageProvider.setWidth(this.buildingWidth);
            this.localStorageProvider.setAmount(this.totalAmount);
        }
        else {
            this.badDimensions = true;
        }
    }
}
