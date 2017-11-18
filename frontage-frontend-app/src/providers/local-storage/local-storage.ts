import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the LocalStorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocalStorageProvider {

  localStorage: Storage;

  tokenStorageKey: string = 'authToken'
  userStorageKey: string = 'userName';

  constructor() {
    this.localStorage = window.localStorage;
  }

  public getAuthToken(): string {
    return this.localStorage.getItem(this.tokenStorageKey);
  }

  public setAuthToken(authToken: string): void {
    this.localStorage.setItem(this.tokenStorageKey, authToken);
  }

  public getUserName(): string {
    return this.localStorage.getItem(this.userStorageKey);
  }

  public setUserName(userName: string): void {
    return this.localStorage.setItem(this.userStorageKey, userName);
  }

}
