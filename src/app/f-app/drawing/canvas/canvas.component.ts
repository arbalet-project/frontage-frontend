import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Platform } from '@ionic/angular';
import { Subscription, timer } from 'rxjs';
import { State } from 'src/app/core/state/state.service';

export interface Color {
  red: number;
  green: number;
  blue: number;
}

export interface Dimension {
  x: number;
  y: number;
  width: number;
  height: number;
}

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit, OnDestroy {
  constructor(public state: State, private platform: Platform) { }
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

  private availableColors: Array<Color> = [];
  private previousColor = 0;

  private paletteDimension: Dimension;
  private frontageDimension: Dimension;

  private frontageColor: Array<Array<Color>>;

  @Output() changeColor = new EventEmitter();

  public startPosition: { i: number, j: number } = { i: 0, j: 0 };
  public activatedSwipe = false;
  public timer : Subscription;
  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.updateDimension();
    this.addAllColors();

    this.frontageColor = new Array(this.state.frontage.height);
    for (let i = 0; i < this.state.frontage.height; i++) {
      this.frontageColor[i] = new Array(this.state.frontage.width);
      for (let j = 0; j < this.state.frontage.width; j++) {
        this.frontageColor[i][j] = {
          red: 0,
          green: 0,
          blue: 0
        };
      }
    }

    this.timer = timer(0, 60).subscribe(() => {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.draw();
    });
  }

  private addAllColors() {
    this.addColor(0, 0, 0);
    this.addColor(255, 255, 255);
    this.addColor(255, 0, 0);
    this.addColor(255, 170, 170);
    this.addColor(255, 102, 0);
    this.addColor(255, 179, 128);
    this.addColor(255, 204, 0);
    this.addColor(204, 255, 0);
    this.addColor(137, 160, 44);
    this.addColor(44, 160, 90);
    this.addColor(51, 128, 0);
    this.addColor(0, 255, 0);
    this.addColor(0, 102, 128);
    this.addColor(44, 44, 160);
    this.addColor(221, 85, 255);
    this.addColor(225, 0, 204);
    this.addColor(136, 0, 170);
    this.addColor(0, 85, 212);
    this.addColor(0, 136, 170);
    this.addColor(102, 0, 255);
    this.addColor(0, 0, 255);
  }

  private addColor(red, green, blue) {
    this.availableColors.push({ red, green, blue });
  }

  private updateDimension() {
    if (this.platform.is('mobile')) {
      this.ctx.canvas.width = window.innerHeight;
      this.ctx.canvas.height = window.innerWidth;
    } else {
      this.ctx.canvas.width = window.innerWidth;
      this.ctx.canvas.height = window.innerHeight;
    }
  }

  draw() {
    this.drawPalette();
    this.drawFrontage();
  }

  ngOnDestroy() {
    this.timer.unsubscribe();
  }

  drawPalette() {
    const width = this.canvas.nativeElement.width - 40;
    const height = this.canvas.nativeElement.height * 0.1;
    const gap = 5;

    this.drawnRoundRect(10, 20, width, height, 30, '#214478', 'transparent');

    const widthCell = (width - (40 + 21 * gap)) / 21;

    for (let i = 0; i < this.availableColors.length; i++) {
      this.drawnRoundRect(
        40 + i * (widthCell + gap),
        30,
        widthCell,
        height - 20,
        10,
        `rgb(${this.availableColors[i].red},${this.availableColors[i].green},${this.availableColors[i].blue})`,
        i === this.previousColor ? '#24a7e3' : 'transparent'
      );
    }

    this.paletteDimension = {
      x: 40,
      y: 30,
      height: height - 20,
      width: 40 + 20 * (widthCell + gap),
    };
  }

  drawFrontage() {
    const width = this.canvas.nativeElement.width - 20;
    const height = this.canvas.nativeElement.height * 0.7;
    const heightBar = this.canvas.nativeElement.height * 0.1;
    const gapBar = 15;
    const gap = 3;
    this.drawnRoundRect(
      10,
      heightBar + 2 * gapBar,
      width,
      height,
      30,
      '#214478',
      'transparent'
    );

    const areaHeight =
      (height - 60 - gap * this.state.frontage.height) /
      this.state.frontage.height;
    const areaWidth =
      (width - 40 - gap * this.state.frontage.width) /
      this.state.frontage.width;

    const startW = 20 + gap;
    const startH = heightBar + 2 * gapBar + 40;
    for (let i = 0; i < this.state.frontage.height; i++) {
      for (let j = 0; j < this.state.frontage.width; j++) {

        if (this.isDisabled(i, j)) { continue; }

        this.drawnRoundRect(
          startW + j * (areaWidth + gap),
          startH + i * (areaHeight + gap),
          areaWidth,
          areaHeight,
          10,
          `rgb(${this.frontageColor[i][j].red},${this.frontageColor[i][j].green},${this.frontageColor[i][j].blue})`,
          'transparent'
        );
      }
    }

    this.frontageDimension = {
      x: startW,
      y: startH,
      width:
        this.state.frontage.width * areaWidth +
        gap * (this.state.frontage.width - 1),
      height:
        this.state.frontage.height * areaHeight +
        gap * (this.state.frontage.height - 1),
    };
  }

  public drawnRoundRect(x, y, w, h, radius, fillStyle, strokeStyle) {
    const r = x + w;
    const b = y + h;
    this.ctx.beginPath();
    this.ctx.strokeStyle = strokeStyle;
    this.ctx.fillStyle = fillStyle;
    this.ctx.lineWidth = 10;
    this.ctx.moveTo(x + radius, y);
    this.ctx.lineTo(r - radius, y);
    this.ctx.quadraticCurveTo(r, y, r, y + radius);
    this.ctx.lineTo(r, y + h - radius);
    this.ctx.quadraticCurveTo(r, b, r - radius, b);
    this.ctx.lineTo(x + radius, b);
    this.ctx.quadraticCurveTo(x, b, x, b - radius);
    this.ctx.lineTo(x, y + radius);
    this.ctx.quadraticCurveTo(x, y, x + radius, y);
    this.ctx.stroke();
    this.ctx.fill();
  }

  public setColor(event) {
    
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const x = ("clientX" in event ? event.clientX : event.changedTouches[0].clientX) - rect.left;
    const y = ("clientX" in event ? event.clientY : event.changedTouches[0].clientY) - rect.top;
    
    event.clientY - rect.top;

    if (
      x > this.paletteDimension.x &&
      x < this.paletteDimension.x + this.paletteDimension.width &&
      y > this.paletteDimension.y &&
      y < this.paletteDimension.y + this.paletteDimension.height
    ) {
      const newX = x - this.paletteDimension.x;
      const i = Math.floor(newX / (this.paletteDimension.width / 21));
      this.previousColor = i;
    } else if (
      x > this.frontageDimension.x &&
      x < this.frontageDimension.x + this.frontageDimension.width &&
      y > this.frontageDimension.y &&
      y < this.frontageDimension.y + this.frontageDimension.height
    ) {
      const newX = x - this.frontageDimension.x;
      const newY = y - this.frontageDimension.y;
      const i = Math.floor(
        newY / (this.frontageDimension.height / this.state.frontage.height)
      );
      const j = Math.floor(
        newX / (this.frontageDimension.width / this.state.frontage.width)
      );


      if (this.isDisabled(i, j)) { return; }
      this.frontageColor[i][j] = this.availableColors[this.previousColor];
      this.changeColor.emit({
        i,
        j,
        color: this.availableColors[this.previousColor],
      });
    }
  }

  public isDisabled(row, col): boolean {
    for (const pix of this.state.frontage.disabled) {
      if (pix[0] === row && pix[1] === col) {
        return true;
      }
    }
    return false;
  }
}
