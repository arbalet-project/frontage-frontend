import { Component } from '@angular/core';
import { VibrationService } from 'src/app/core/plugins/vibration.service';
import { WebsocketService } from 'src/app/core/websocket/websocket.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-joystick',
  templateUrl: './joystick.component.html',
  styleUrls: ['./joystick.component.scss'],
})
export class JoystickComponent {

  constructor(public websocket: WebsocketService, public vibration: VibrationService) { }

  up(): void {
    this.websocket.sendMessage({ direction: '>' });
    this.vibration.vibrate();
    $('#upArrow').hide({duration: 0, done() {$('#upArrow').fadeIn(200); }});
  }

  down(): void {
    this.websocket.sendMessage({ direction : '<' });
    this.vibration.vibrate();
    $('#downArrow').hide({duration: 0, done() {$('#downArrow').fadeIn(200); }});
  }

  right(): void {
    this.websocket.sendMessage({ direction : 'v' });
    this.vibration.vibrate();
    $('#rightArrow').hide({duration: 0, done() {$('#rightArrow').fadeIn(200); }});
  }

  turn(): void {
    this.websocket.sendMessage({ direction : '^' });
    this.vibration.vibrate();
    $('#rotateArrow').hide({duration: 0, done() {$('#rotateArrow').fadeIn(200); }});
    $('#rotateArrowEnd').hide({duration: 0, done() {$('#rotateArrowEnd').fadeIn(200); }});
  }

}
