import { LocalStorageProvider } from './../../providers/local-storage/local-storage';
import { Component } from '@angular/core';

/**
 * Generated class for the UserDiplayedComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'user-displayed',
  templateUrl: 'user-displayed.html'
})
export class UserDisplayedComponent {

  userName: string;

  constructor(public localStorageProvider: LocalStorageProvider) {
    this.userName = this.localStorageProvider.getUserName();
  }

}
