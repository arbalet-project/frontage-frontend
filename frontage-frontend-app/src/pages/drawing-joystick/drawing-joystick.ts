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
    
    this.currentColorHexa=["#ffffff", [255,255,255]];

    this.pixelMatrix = new Array<Array<SafeStyle>>();

    for(let i=0; i<this.frontageHeight; i++){
      this.pixelMatrix.push(new Array<SafeStyle>(this.frontageLength))
    }

    for (let i=0; i<this.frontageHeight; i++){
      for (let j=0; j<this.frontageLength; j++){
        this.pixelMatrix[i][j] = sanitizer.bypassSecurityTrustStyle(this.baseCss+"fill:#000000")
      }
    }

    let joystickParams = navParams.get('joystickParams');

    this.parametersList = joystickParams.parametersList;
    this.selectedParameter = joystickParams.selectedParameter;

    websocketMessageHandler.initSocket(navCtrl);
  }

  handleStart(ev) {
    console.log("start")
    console.log("target : " + JSON.stringify(ev.target.id));
    console.log("touches : " + JSON.stringify(ev.touches[0].target.id));
    console.log("changedTouches : " + JSON.stringify(ev.changedTouches[0].target.id));
    console.log("targetTouches : " + JSON.stringify(ev.targetTouches[0].target.id));
  }

  handleMove(ev) {
    console.log("move")
    // console.log("Move target: " + JSON.stringify(ev.target.id));
    // console.log("Move coord: x:" + ev.touches[0].pageX + " | y:" + ev.touches[0].pageY);
    let currentElement = document.elementFromPoint(ev.touches[0].pageX, ev.touches[0].pageY);
    let id = currentElement.id
    
    if (id.startsWith("px-")){

      let tokens = id.split('-');

      let pixel = {x:tokens[1], y:tokens[2]}
      this.pixelMatrix[pixel.x][pixel.y] = this.sanitizer.bypassSecurityTrustStyle(this.baseCss+"fill:" + this.currentColorHexa[0])

      let color = {red:this.currentColorHexa[1][0], green:this.currentColorHexa[1][1], blue:this.currentColorHexa[1][2]}
      this.websocketMessageHandler.send(JSON.stringify({pixel:pixel, color:color}))
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

  setColor(red, green, blue){
    let redHexa = this.decimalToHexa(red);
    let greenHexa = this.decimalToHexa(green);
    let blueHexa = this.decimalToHexa(blue);

    let colorHexa = "#"+redHexa+greenHexa+blueHexa;

    this.currentColorHexa = [colorHexa, [red, green, blue]];
  }

  // changeColor(x, y){
  //   this.pixelMatrix[x][y] = this.sanitizer.bypassSecurityTrustStyle(this.baseCss+"fill:" + this.currentColorHexa[0])
    
  //   this.sendColor(x, y);
  // }

  // sendColor(x, y) {
  //   let pixel = {x:x, y:y}
  //   let color = {red:this.currentColorHexa[1][0], green:this.currentColorHexa[1][1], blue:this.currentColorHexa[1][2]}

  //   this.websocketMessageHandler.send(JSON.stringify({pixel:pixel, color:color}))
  // }

  stopFApp() {
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
