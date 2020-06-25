import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class FrontageService {
  private _width: number;
  private _height: number;
  private _disabled: Array<Array<number>>;

  constructor() {}

  get width() {
    return this._width;
  }

  set width(w: number) {
    this._width = w;
  }

  get height() {
    return this._height;
  }

  set height(h: number) {
    this._height = h;
  }

  get disabled() {
    return this._disabled;
  }

  set disabled(d: Array<Array<number>>) {
    this._disabled = d;
  }
}
