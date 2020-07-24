import { Component } from '@angular/core';
import { VibrationService } from 'src/app/core/plugins/vibration.service';
import { WebsocketService } from 'src/app/core/websocket/websocket.service';

@Component({
  selector: 'app-joystick',
  templateUrl: './joystick.component.html',
  styleUrls: ['./joystick.component.scss'],
})
export class JoystickComponent {

  constructor(public websocket: WebsocketService, public vibration: VibrationService) { }

  up(): void {
    console.log('test');
    this.websocket.sendMessage({ direction: '>' });
    this.vibration.vibrate();
    // Fade In and fade out to do !
  }

  down(): void {
    this.websocket.sendMessage({ direction : '<' });
    this.vibration.vibrate();
  }
  right(): void {
    this.websocket.sendMessage({ direction : 'v' });
    this.vibration.vibrate();
  }

  turn(): void {
    this.websocket.sendMessage({ direction : '^' });
    this.vibration.vibrate();
  }

}
