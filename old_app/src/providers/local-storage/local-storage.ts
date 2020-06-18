import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class LocalStorageProvider {

  private localStorage: Storage;

  private tokenStorageKey: string = 'vhJeNuUbbWEkTNsmv84uBEKb'
  private userStorageKey: string = 'YyDarJEPEWtG3pe4UuVPQGf3';
  private isAdminStorageKey: string = 'PSL8A53FHqfCcKEnMPYJRyAN';
  private userIdStorageKey: string = 'PttliykXHLVRmIaQBsJayAx0';
  private width:string = '4';
  private height:string = '19';
  private disabled:string = '[]';

  constructor() {
    this.localStorage = window.localStorage;
  }

  public getWidth(): number {
    return JSON.parse(this.localStorage.getItem(this.width));
  }

  public setWidth(w: number): void {
    return this.localStorage.setItem(this.width, JSON.stringify(w));
  }

  public getHeight(): number {
    return JSON.parse(this.localStorage.getItem(this.height));
  }

  public setHeight(h: number): void {
    return this.localStorage.setItem(this.height, JSON.stringify(h));
  }

  public getDisabled(): Array<Array<number>> {
    return JSON.parse(this.localStorage.getItem(this.disabled));
  }

  public setDisabled(d: Array<Array<number>>): void {
    return this.localStorage.setItem(this.disabled, JSON.stringify(d));
  }

  public getMatrixBuilding() : string {
    return `{"widht": ${this.getWidth()}, "height":${this.getHeight()}, "disabled":${this.getDisabled()}}`;
  }

  public getAuthToken(): string {
    return this.localStorage.getItem(this.tokenStorageKey);
  }

  public setAuthToken(authToken: string): void {
    this.localStorage.setItem(this.tokenStorageKey, authToken);
  }

  public getUserId(): string {
    return this.localStorage.getItem(this.userIdStorageKey);
  }

  public setUserId(userId: string): void {
    this.localStorage.setItem(this.userIdStorageKey, userId);
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

  public isAdmin(): boolean {
    let isAdmin: boolean = false;
    let isAdminString = this.localStorage.getItem(this.isAdminStorageKey);
    if (isAdminString == 'true') {
      isAdmin = true;
    }
    return isAdmin;
  }

  public clearData(): void {
    this.localStorage.clear();
  }
}
