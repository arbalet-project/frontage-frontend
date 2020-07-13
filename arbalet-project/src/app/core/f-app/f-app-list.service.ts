import { Injectable } from '@angular/core';
import { FApp } from './models/f-app';
import { element } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class FAppListService {
  private fAppList: Array<FApp> = [];

  constructor() {
    this.fAppList = JSON.parse(localStorage.getItem('fAppList'));
   }

  getList() {
    return [...this.fAppList];
  }

  push(fApp: FApp) {
    this.fAppList.push(fApp);
    localStorage.setItem('fAppList', JSON.stringify(this.fAppList));
  }

  reset() {
    this.fAppList = [];
  }

  findByName(name: string): FApp {
    return this.fAppList.find(el => el.name === name);
  }
}
