import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {
  public parameters: any;
  public name: string;

  constructor() { }
}
