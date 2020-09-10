import { Component, OnInit } from '@angular/core';
import { TrakingService } from 'src/app/core/plugins/tracking.service';
import { Platform } from '@ionic/angular';
import { State } from 'src/app/core/state/state.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { WebsocketService } from 'src/app/core/websocket/websocket.service';

@Component({
  selector: 'app-drawing',
  templateUrl: './drawing.page.html',
  styleUrls: ['./drawing.page.scss'],
})
export class DrawingPage {
  constructor(
    private tracker: TrakingService,
    private platform: Platform,
    public screen: ScreenOrientation,
    public state: State,
    public websocket: WebsocketService
  ) {
    this.tracker.playEvent('Drawing');
    if (this.platform.is('mobile')) {
      this.screen.lock(
        this.screen.ORIENTATIONS.LANDSCAPE
      );
    }

    this.websocket.init();
  }

  setColor(event: any) {
    console.log(event);
    this.websocket.sendMessage({pixel: { x : event.i, y : event.j}, color: {
      red : event.color.red,
      blue : event.color.blue,
      green : event.color.green
    }});
  }
}
