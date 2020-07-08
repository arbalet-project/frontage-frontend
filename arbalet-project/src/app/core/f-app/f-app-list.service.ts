import { Injectable } from '@angular/core';
import { FApp } from './models/f-app';
import { element } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class FAppListService {
  private f_app_list: Array<FApp> = [];

  constructor() {
    this.f_app_list = JSON.parse(localStorage.getItem('fAppList'));
   }

  getList() {
    return [...this.f_app_list];
  }

  push(fApp: FApp) {
    this.f_app_list.push(fApp);
    localStorage.setItem('fAppList', JSON.stringify(this.f_app_list));
  }

  reset() {
    this.f_app_list = [];
  }

  findByName(name: string) : FApp {
    return this.f_app_list.find(el => el.name === name)
  }
}
