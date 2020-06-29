import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class FrontageService {
  public width: number;
  public height: number;
  public disabled: Array<Array<number>>;
  public state: string;
  public usable: boolean;
  public forced: boolean;
  public next_on_time: string;
  constructor() {}

}
