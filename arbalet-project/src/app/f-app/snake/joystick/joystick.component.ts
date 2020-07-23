import { Component } from '@angular/core';
import { WebsocketService } from 'src/app/core/websocket/websocket.service';
import { VibrationService } from 'src/app/core/plugins/vibration.service';

@Component({
  selector: 'app-joystick',
  templateUrl: './joystick.component.html',
  styleUrls: ['./joystick.component.scss'],
})
export class JoystickComponent {

  constructor(public websocket: WebsocketService, public vibration: VibrationService) { }

  up(): void {
    this.websocket.sendMessage({ direction: "^" });
    this.vibration.vibrate();
    // Fade In and fade out to do !
  }

  down(): void {
    this.websocket.sendMessage({ direction: "v" });
    this.vibration.vibrate();
  }
  right(): void {
    this.websocket.sendMessage({ direction: ">" });
    this.vibration.vibrate();
  }

  left(): void {
    this.websocket.sendMessage({ direction: "<" });
    this.vibration.vibrate();
  }

}
