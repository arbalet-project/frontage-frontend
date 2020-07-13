import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Platform } from '@ionic/angular';

const { Haptics } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class VibrationService {

  constructor(private platform: Platform
  ) { }

  vibrate() {
    if (this.platform.is('mobile')) {
      Haptics.vibrate();
    }
  }
}
