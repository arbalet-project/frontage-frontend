import { Component } from '@angular/core';
import { WebsocketService } from 'src/app/core/websocket/websocket.service';
import { VibrationService } from 'src/app/core/plugins/vibration.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-joystick',
  templateUrl: './joystick.component.html',
  styleUrls: ['./joystick.component.scss'],
})
export class JoystickComponent {

  constructor(public websocket: WebsocketService, public vibration: VibrationService) { }

  up(): void {
    this.websocket.sendMessage({ direction: '^' });
    this.vibration.vibrate();
    $('#upArrow').hide({duration:0, done: function() {$('#upArrow').fadeIn(200);}});
  }

  down(): void {
    this.websocket.sendMessage({ direction: 'v' });
    this.vibration.vibrate();
    $('#downArrow').hide({duration:0, done: function() {$('#downArrow').fadeIn(200);}});
  }
  right(): void {
    this.websocket.sendMessage({ direction: '>' });
    this.vibration.vibrate();
    $('#rightArrow').hide({duration:0, done: function() {$('#rightArrow').fadeIn(200);}});
  }

  left(): void {
    this.websocket.sendMessage({ direction: '<' });
    this.vibration.vibrate();
    $('#leftArrow').hide({duration:0, done: function() {$('#leftArrow').fadeIn(200);}});
  }

}
