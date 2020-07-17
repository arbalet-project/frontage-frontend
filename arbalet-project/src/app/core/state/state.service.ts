import { Injectable } from '@angular/core';
import { Frontage } from './models/frontage';

@Injectable({
  providedIn: 'root',
})
export class State {
  public frontage : Frontage = {} as Frontage;
}
