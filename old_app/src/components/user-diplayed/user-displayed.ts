import { LocalStorageProvider } from './../../providers/local-storage/local-storage';
import { Component } from '@angular/core';

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
