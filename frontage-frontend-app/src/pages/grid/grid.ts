import { TranslateService } from '@ngx-translate/core';
import { AuthenticationProvider } from './../../providers/authentication/authentication';
import { AdminProvider } from './../../providers/admin/admin';
// import { Component, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { WebsocketMessageHandlerProvider } from './../../providers/websocket-message-handler/websocket-message-handler';


@Component({
  selector: 'page-grid',
  templateUrl: 'grid.html',
})


export class GridPage {

  lifetime: number;
  totalAmount: number;
  addressedAmount: number;
  buildingWidth: number;
  buildingHeight: number;
  grid: Array<Array<number>>; //array of arrays
  markedPixel: HTMLButtonElement;
  fAppOptions: any;
  isRefused: Boolean = false;
  enableValidation:boolean=false;
  finished:boolean=false;

  popupMessage:string;



  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public adminProvider: AdminProvider,
    public authentication: AuthenticationProvider,
    public translateService: TranslateService,
    public dataFAppsProvider: DataFAppsProvider,
    public websocketMessageHandler: WebsocketMessageHandlerProvider,
    public alertController: AlertController) {


    this.totalAmount = 0;
    this.addressedAmount = 0;
    this.buildingWidth = 0;
    this.buildingHeight = 0;
    this.markedPixel = null;

    this.translateService.get("MESH_ADDRESSING_COMPLETE").subscribe(resp => {
        this.popupMessage = resp;
    });

    this.adminProvider.getBuildingDimensions().subscribe(resp => {
        if (resp['height'] > 0)
          this.buildingHeight = resp['height'];
        if (resp['width'] > 0)
          this.buildingWidth = resp['width'];
        if (resp['amount'] > 0)
          this.totalAmount = resp['amount'];

        this.createGrid();
      });

      let initialised = {
          initialised: 0
      };

      this.adminProvider.setInitialised(initialised).subscribe();

      setTimeout(() => {
          websocketMessageHandler.initSocket(navCtrl);
          this.enableValidation = true;}, 5000);

  }
  /**
   * Init data
   */
  ngOnInit() {
  }

  createGrid() {

      this.grid = new Array(this.buildingHeight);

      for (let i = 0; i < this.buildingHeight; i++) {
          this.grid[i] = new Array(this.buildingWidth);
          for (let j = 0; j < this.buildingWidth; j++) {
              this.grid[i][j] = i*this.buildingWidth+j;
          }
      }
  }

  matrixTouched(element: number, event: Event) {
      let targetElement : HTMLButtonElement = event.target as HTMLButtonElement;

      if (!this.finished && this.markedPixel == null && targetElement.style.backgroundColor != 'rgb(128, 128, 128)') { // i couldnt find where the default color is defined
          let row : number = Math.floor(element/this.buildingWidth);
          let column : number = Math.floor(element%this.buildingWidth);

          this.markedPixel = targetElement;
          targetElement.style.background = '#299a29';

          console.log(JSON.stringify({x:column, y:row}))
          console.log(this.websocketMessageHandler.send(JSON.stringify({x:column, y:row})));
          this.adminProvider.getInitialised().subscribe(resp => {
              console.log(resp);
          });

      }
  }

  confirmPixels() {
     if (this.markedPixel) {
         this.websocketMessageHandler.send(JSON.stringify({action:1}));
         this.markedPixel.style.background = '#808080';
         this.markedPixel = null;
         this.addressedAmount++;

         if (this.addressedAmount == this.totalAmount) {
            this.finished = true;

            // let initialised = 0;
                    this.adminProvider.getInitialised().subscribe(resp => {
                        console.log(resp);
                    });
            const alert = this.alertController.create({
                message: this.popupMessage,
                buttons: [{
                    text: 'Ok',
                    handler: () => {
                        this.dataFAppsProvider.stopApp();
                        this.websocketMessageHandler.closeSocket();
                        this.websocketMessageHandler.stopKeepAliveSender();
                        this.navCtrl.pop();
                    }
                }
            ]
            });
            alert.present();
        }
     }
  }

  undoPixel() {
      if (this.markedPixel) {
          this.websocketMessageHandler.send(JSON.stringify({action:-1}));
          this.markedPixel.style.background = '#ffffff';
          this.markedPixel = null;
      }
  }


  /**
   * Navigation
   */
  goToMeshPage() {
    this.navCtrl.pop();
  }

  ionViewDidLeave(){
    console.log("stopping everything");
    this.dataFAppsProvider.stopApp();
    this.websocketMessageHandler.closeSocket();
    this.websocketMessageHandler.stopKeepAliveSender();
  }


}
