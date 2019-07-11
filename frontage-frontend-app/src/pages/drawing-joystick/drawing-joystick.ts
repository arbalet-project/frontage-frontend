import { LocalStorageProvider } from './../../providers/local-storage/local-storage';
import { TranslateService } from '@ngx-translate/core';
import { AdminProvider } from './../../providers/admin/admin';
import { Vibration } from '@ionic-native/vibration';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { WebsocketMessageHandlerProvider } from './../../providers/websocket-message-handler/websocket-message-handler';
import { Component, Input } from '@angular/core';
import { NavController, NavParams, Platform, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-drawing-joystick',
  templateUrl: 'drawing-joystick.html',
})
export class DrawingJoystickPage {
  @Input()
  isAdmin: boolean;
  grid: Array<Array<number>>; //array of arrays
  disabled: Array<Array<number>>;

  parametersList: string;
  selectedParameter: string[];

  colorHexaSave: string;

  baseCss:string = "opacity:1;fill-opacity:1;stroke:none;stroke-width:0.26499999;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;";

  frontageHeight:number;
  frontageWidth:number;

  currentColorHexa:any;
  pixelMatrix: Array<Array<SafeStyle>>;

  lastElementClickedId:string="";

  optionsSentTitle: String;
  optionsSentMessage: String;

  constructor(public navCtrl: NavController, public navParams: NavParams,  public fAppProvider: DataFAppsProvider,
    public websocketMessageHandler: WebsocketMessageHandlerProvider, public sanitizer: DomSanitizer,
    public screenOrientation: ScreenOrientation, public platform: Platform, public vibration: Vibration,
    public adminProvider: AdminProvider, public alertCtrl: AlertController, public translateService: TranslateService,
    public localStorageProvider: LocalStorageProvider) {

    this.isAdmin = this.localStorageProvider.isAdmin();

    if (this.platform.is('mobile')) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    }

    if (this.platform.is('mobile')) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    }

    this.currentColorHexa=["#ff0000", [255,0,0]];

    this.pixelMatrix = new Array<Array<SafeStyle>>();

    this.adminProvider.getBuildingDimensions().subscribe(resp => {
      if (resp['height'] > 0)
        this.frontageHeight = resp['height'];
      if (resp['width'] > 0)
        this.frontageWidth = resp['width'];
      if (resp['disabled'] != [])
        this.disabled = resp['disabled'];
      this.createGrid();
    });

    for(let i=0; i<this.frontageHeight; i++){
      this.pixelMatrix.push(new Array<SafeStyle>(this.frontageWidth))
    }

    for (let i=0; i<this.frontageHeight; i++){
      for (let j=0; j<this.frontageWidth; j++){
        this.pixelMatrix[i][j] = sanitizer.bypassSecurityTrustStyle(this.baseCss+"background:#000000")
      }
    }

    let joystickParams = navParams.get('joystickParams');

    this.parametersList = joystickParams.parametersList;
    this.selectedParameter = joystickParams.selectedParameter;

    websocketMessageHandler.initSocket(navCtrl);

    this.translateService.get("DRAWING_SENT_ALERT_TITLE").subscribe(translatedMesssage => {
      this.optionsSentTitle = translatedMesssage;
    });

    this.translateService.get("DRAWING_SENT_ALERT").subscribe(translatedMesssage => {
      this.optionsSentMessage = translatedMesssage;
    });
  }

  createGrid() {

    this.grid = new Array(this.frontageHeight);

    for (let i = 0; i < this.frontageHeight; i++) {
        this.grid[i] = new Array(this.frontageWidth);
        for (let j = 0; j < this.frontageWidth; j++) {
            this.grid[i][j] = i*this.frontageWidth+j;
        }
    }
}

  handleStart(ev, rowIndex, colIndex) {
    this.updateColor(ev, rowIndex, colIndex);
  }

  handleMove(ev, rowIndex, colIndex) {
    this.updateColor(ev, rowIndex, colIndex);
  }

  updateColor(ev, rowIndex, colIndex) {

    console.log(this.colorHexaSave);

    let targetElement : HTMLButtonElement = ev.target as HTMLButtonElement;


    let currentElement = document.elementFromPoint(ev.pageX, ev.pageY);
    console.log(currentElement);
    let id = currentElement.id;


    targetElement.style.background = this.colorHexaSave;


    if (id!==this.lastElementClickedId || id=="") {
      this.lastElementClickedId = id;
      let pixel ={x:rowIndex, y:colIndex};
      // this.pixelMatrix[pixel.x][pixel.y] = this.sanitizer.bypassSecurityTrustStyle(this.baseCss+"fill:" + this.colorHexaSave);
      let color = {red:this.currentColorHexa[1][0], green:this.currentColorHexa[1][1], blue:this.currentColorHexa[1][2]};
      this.websocketMessageHandler.send(JSON.stringify({pixel:pixel, color:color}));

    }
  }

  decimalToHexa(decimalNumber) {
    let hexa:string = decimalNumber.toString(16)
    if(hexa.length == 0){
      hexa="00"
    }
    else if(hexa.length == 1) {
      hexa = "0" + hexa
    }

    return hexa;
  }

  switchCSSVisibility(elementId, visibility) {
    let element = document.getElementById(elementId);
    let style = element.style;
    style["visibility"] = visibility;
    element.setAttribute("style", style.cssText);
  }

  setColor(red, green, blue){
    let previousColorRGB  = "c-" + this.currentColorHexa[1][0] + "-" + this.currentColorHexa[1][1] + "-" + this.currentColorHexa[1][2];

    let redHexa = this.decimalToHexa(red);
    let greenHexa = this.decimalToHexa(green);
    let blueHexa = this.decimalToHexa(blue);

    this.colorHexaSave = "#"+redHexa+greenHexa+blueHexa;


    let colorHexa = "#"+redHexa+greenHexa+blueHexa;

    this.currentColorHexa = [colorHexa, [red, green, blue]];

    this.switchCSSVisibility("c-" + red + "-" + green + "-" + blue + "-select", "visible");
    this.switchCSSVisibility(previousColorRGB + "-select", "hidden");

    console.log(this.colorHexaSave);

  }

  stopFApp() {
    this.navCtrl.pop();
  }

  ionViewWillEnter() {
    let initialColorRGB  = "c-" + this.currentColorHexa[1][0] + "-" + this.currentColorHexa[1][1] + "-" + this.currentColorHexa[1][2];
    this.switchCSSVisibility(initialColorRGB + "-select", "visible");
  }

  ionViewDidLeave() {
    if (this.platform.is('mobile')) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      this.screenOrientation.unlock();
    }

    if (!this.websocketMessageHandler.isExternalyClaused()) {
      this.fAppProvider.stopApp();
      this.websocketMessageHandler.closeSocket();
    }
    this.websocketMessageHandler.stopKeepAliveSender();

    if (this.platform.is('mobile')) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      this.screenOrientation.unlock();
    }
  }

  validateActionSucceeded(success, title, message, navigateBack) {
    if(success) {
        this.vibration.vibrate(50);
        let popUp = this.alertCtrl.create({
          title: title,
          message: message,
          buttons: [{
            text: 'OK',
            handler: () => {
              if(navigateBack) {
                  popUp.dismiss().then(() => {
                    this.navCtrl.pop();
                  });
                  return false;
              }
            }
          }]
        });
        popUp.present();
    }
  }

isDisabled(row, col) {
  for (let pix of this.disabled){
    if (pix[0] == row && pix[1] == col){
      return true;
    }
  }
  return false;
}

  sendScheduledDrawing() {
    this.vibration.vibrate(20);
    this.adminProvider.sendScheduledDrawing()
      .subscribe(response => this.validateActionSucceeded(response.done, this.optionsSentTitle, this.optionsSentMessage, false),
                 err => console.log(err));
  }

}
