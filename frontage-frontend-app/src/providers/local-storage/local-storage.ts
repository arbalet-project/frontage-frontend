import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class LocalStorageProvider {

  private localStorage: Storage;

  private tokenStorageKey: string = 'vhJeNuUbbWEkTNsmv84uBEKb'
  private userStorageKey: string = 'YyDarJEPEWtG3pe4UuVPQGf3';
  private isAdminStorageKey: string = 'PSL8A53FHqfCcKEnMPYJRyAN';

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

  public setAdmin(isAdmin: string) {
    this.localStorage.setItem(this.isAdminStorageKey, isAdmin);
  }

  public isAdmin(): string {
    return this.localStorage.getItem(this.isAdminStorageKey);
  }

}
