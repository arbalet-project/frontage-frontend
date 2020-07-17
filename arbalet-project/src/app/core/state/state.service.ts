import { Injectable } from '@angular/core';
import { Frontage } from './models/frontage';
import { FAppList } from './f-app-list.service';

@Injectable({
  providedIn: 'root',
})
export class State {
  public frontage: Frontage = {} as Frontage;
  public fAppList: FAppList = new FAppList();
}
