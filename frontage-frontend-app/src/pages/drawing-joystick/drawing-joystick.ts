import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { WebsocketMessageHandlerProvider } from './../../providers/websocket-message-handler/websocket-message-handler';
import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

@Component({
  selector: 'page-drawing-joystick',
  templateUrl: 'drawing-joystick.html',
})
export class DrawingJoystickPage {
  parametersList: string;
  selectedParameter: string[];

  baseCss:string = "opacity:1;fill-opacity:1;stroke:none;stroke-width:0.26499999;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;";
  black=["#000000", [0,0,0]];
  white=["#ffffff", [255,255,255]];
  red=["#ff0000", [255,0,0]];
  green=["#00ff00", [0,255,0]];
  blue=["#0000ff", [0,0,255]];

  frontageHeight:Number = 4;
  frontageLength:Number = 19;

  currentColorHexa:any;
  pixelMatrix: Array<Array<SafeStyle>>;

  // pixelColor00:SafeStyle;

  test:SafeStyle;

  constructor(public navCtrl: NavController, public navParams: NavParams,  public fAppProvider: DataFAppsProvider,
    public websocketMessageHandler: WebsocketMessageHandlerProvider, public sanitizer: DomSanitizer,
    public screenOrientation: ScreenOrientation, public platform: Platform) {

    if (this.platform.is('mobile')) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    }

    if (this.platform.is('mobile')) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    }
    
    this.currentColorHexa=this.white;
    this.pixelMatrix = new Array<Array<SafeStyle>>();

    for(let i=0; i<this.frontageHeight; i++){
      this.pixelMatrix.push(new Array<SafeStyle>(this.frontageLength))
    }

    for (let i=0; i<this.frontageHeight; i++){
      for (let j=0; j<this.frontageLength; j++){
        this.pixelMatrix[i][j] = sanitizer.bypassSecurityTrustStyle(this.baseCss+"fill:" + this.black[0])
      }
    }

    let joystickParams = navParams.get('joystickParams');

    this.parametersList = joystickParams.parametersList;
    this.selectedParameter = joystickParams.selectedParameter;

    websocketMessageHandler.initSocket(navCtrl);
  }

  setColor(colorHexa){
    console.log("Set color palette to : " + JSON.stringify(colorHexa))
    this.currentColorHexa = colorHexa
  }

  changeColor(x, y){
    console.log("changeColor : " + this.baseCss+"fill:" + this.currentColorHexa[0])
    this.pixelMatrix[x][y] = this.sanitizer.bypassSecurityTrustStyle(this.baseCss+"fill:" + this.currentColorHexa[0])
    
    this.sendColor(x, y);
  }

  sendColor(x, y) {

    console.log("sendColor : x=" + x + ", y=" + y)

    let pixel = {x:x, y:y}
    let color = {red:this.currentColorHexa[1][0], blue:this.currentColorHexa[1][1], green:this.currentColorHexa[1][2]}

    console.log("Send : " + JSON.stringify({pixel:pixel, color:color}))
    this.websocketMessageHandler.send(JSON.stringify({pixel:pixel, color:color}))
  }

  stopFApp() {
    console.log("stop f app")
    this.navCtrl.pop();
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


  
}
