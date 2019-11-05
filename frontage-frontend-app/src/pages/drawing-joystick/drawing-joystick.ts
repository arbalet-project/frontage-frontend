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
import { TrackingProvider } from '../../providers/tracking/tracking';

@Component({
  selector: 'page-drawing-joystick',
  templateUrl: 'drawing-joystick.html',
})
export class DrawingJoystickPage {
  @Input()
  isAdmin: boolean;
  parametersList: string;
  selectedParameter: string[];

  baseCss:string = "opacity:1;fill-opacity:1;stroke:none;stroke-width:0.26499999;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;z-index:5000;";

  frontageHeight:number = 4;
  frontageWidth:number = 19;
  disabled: Array<Array<number>> = [];

  currentColorHexa:any;
  pixelMatrix: Array<Array<SafeStyle>>;

  lastElementClickedId:string="";

  optionsSentTitle: String;
  optionsSentMessage: String;

  constructor(public navCtrl: NavController, public navParams: NavParams,  public fAppProvider: DataFAppsProvider,
    public websocketMessageHandler: WebsocketMessageHandlerProvider, public sanitizer: DomSanitizer,
    public screenOrientation: ScreenOrientation, public platform: Platform, public vibration: Vibration,
    public adminProvider: AdminProvider, public alertCtrl: AlertController, public translateService: TranslateService,
    public localStorageProvider: LocalStorageProvider,
    public tracker: TrackingProvider) {
    this.tracker.playEvent("Drawing");
    this.isAdmin = this.localStorageProvider.isAdmin();

    if (this.platform.is('mobile')) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    }

    if (this.platform.is('mobile')) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    }

    this.currentColorHexa=["#ff0000", [255,0,0]];

    this.pixelMatrix = new Array<Array<SafeStyle>>();
    this.frontageWidth = this.localStorageProvider.getWidth();
    this.frontageHeight = this.localStorageProvider.getHeight();
    this.disabled = this.localStorageProvider.getDisabled();
    for(let i=0; i<this.frontageHeight; i++){
      this.pixelMatrix.push(new Array<SafeStyle>(this.frontageWidth));
    }
    for (let i=0; i<this.frontageHeight; i++){
      for (let j=0; j<this.frontageWidth; j++){
        this.pixelMatrix[i][j] = this.baseCss+"fill:#000000";
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

  ionViewDidLoad() {
    this.createGrid();
  }

  isDisabled(row, col) {
    for (let pix of this.disabled){
      if (pix[0] == row && pix[1] == col){
        return true;
      }
    }
    return false;
  }

  createGrid() {
    let element = document.getElementById("DrawingMatrix");
    let svgcontent:string = `<g
        transform="translate(-24.379463,-109.90178)"
        id="layer1">
        <path
           id="support"
           d="M 28.159408,109.90178 H 149.01933 c 2.09408,0 3.77994,1.77006 3.77994,3.96875 v 35.34077 c 0,2.19868 -1.68586,3.96875 -3.77994,3.96875 H 28.159408 c -2.094089,0 -3.779945,-1.77007 -3.779945,-3.96875 v -35.34077 c 0,-2.19869 1.685856,-3.96875 3.779945,-3.96875 z"
           style="opacity:1;fill:#214478;fill-opacity:1;stroke:none;stroke-width:0.26499999;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
        />
        `;
    // base set for a 4x19 MATRIX
    let x0:number = 27.302652;
    let y0:number = 112.11283;
    let width:number = 4;
    let height:number = 7;
    let hspace:number = 2.78671;
    let wspace:number = 2.575768;
    if (this.frontageWidth < 19){
      x0 += (19 - this.frontageWidth)/2 *(width+wspace);
    } else if (this.frontageWidth > 19 && this.frontageWidth < 30) {
      width = (width*19 - wspace* (this.frontageWidth - 19)) / this.frontageWidth;
    } else if (this.frontageWidth >= 30) {
      width = (width*19 - wspace* (30 - 19)) / 30;
    }
    if (this.frontageHeight < 4) {
      y0 += (4 - this.frontageHeight)/2*(height+hspace);
    } else if (this.frontageHeight > 4 && this.frontageHeight < 10) {
      height = (height*4 - hspace* (this.frontageHeight - 4)) / this.frontageHeight;
    } else if (this.frontageHeight >= 10){
      height = (height*4 - hspace*6) / 10;
    }
    for (let i=0; i < this.frontageHeight; i++){
      for(let j=0; j < this.frontageWidth; j++){
        svgcontent += `<path id="px-${i}-${j}"
        `;
        svgcontent += `d="m ${x0 + j*(width + wspace)},${y0 + i*(height + hspace)} h ${width} c 0.554,0 1,0.446 1,1 v ${height} c 0,0.554 -0.446,1 -1,1 h -${width} c -0.554,0 -1,-0.446 -1,-1 v -${height} c 0,-0.554 0.446,-1 1,-1 z" `;
        if (this.isDisabled(i, j)) {
          svgcontent += `style="opacity:0;" />`;
        } else {
          svgcontent += `style="${this.pixelMatrix[i][j]}" />
          `;
        }
      }
    }
    svgcontent += `</g>`;
    if(element) element.innerHTML = svgcontent;
  }

  handleMove(ev) {
    let currentElement = null;
    if("clientX" in ev)
      currentElement = document.elementFromPoint(ev.clientX, ev.clientY);
    if("changedTouches" in ev)
      currentElement = document.elementFromPoint(ev.changedTouches[0].clientX, ev.changedTouches[0].clientY);
    if(currentElement)
      this.updateColor(currentElement);
  }

  updateColor(element) {
    let id = element.id;

    if (id!==this.lastElementClickedId) {
      this.lastElementClickedId = id;
      if (id.startsWith("px-")){
        let tokens = id.split('-');
        let pixel = {x:tokens[1], y:tokens[2]};
        if (!this.isDisabled(pixel.x, pixel.y)){
          this.pixelMatrix[pixel.x][pixel.y] = this.baseCss+"fill:" + this.currentColorHexa[0];

          let color = {red:this.currentColorHexa[1][0], green:this.currentColorHexa[1][1], blue:this.currentColorHexa[1][2]};
          this.websocketMessageHandler.send(JSON.stringify({pixel:pixel, color:color}));
          element.setAttribute("style",this.baseCss+"fill:" + this.currentColorHexa[0]);
        }
      }
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

    let colorHexa = "#"+redHexa+greenHexa+blueHexa;

    this.currentColorHexa = [colorHexa, [red, green, blue]];

    this.switchCSSVisibility("c-" + red + "-" + green + "-" + blue + "-select", "visible");
    this.switchCSSVisibility(previousColorRGB + "-select", "hidden");
  }

  stopFApp() {
    this.navCtrl.pop();
  }

  ionViewWillEnter() {
    let initialColorRGB  = "c-" + this.currentColorHexa[1][0] + "-" + this.currentColorHexa[1][1] + "-" + this.currentColorHexa[1][2];
    this.switchCSSVisibility(initialColorRGB + "-select", "visible");
  }

  ionViewDidLeave() {
    this.websocketMessageHandler.stopKeepAliveSender();

    if (this.platform.is('mobile')) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      this.screenOrientation.unlock();
    }

    if (!this.websocketMessageHandler.isExternalyClosed()) {
      this.fAppProvider.stopApp();
      this.websocketMessageHandler.closeSocket();
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

  sendScheduledDrawing() {
    this.vibration.vibrate(20);
    this.adminProvider.sendScheduledDrawing()
      .subscribe(response => this.validateActionSucceeded(response.done, this.optionsSentTitle, this.optionsSentMessage, false),
                 err => console.log(err));
  }

}
