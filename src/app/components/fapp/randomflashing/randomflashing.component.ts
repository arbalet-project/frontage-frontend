import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonRadioGroup } from '@ionic/angular';
import { OptionsService } from 'src/app/core/f-app/options.service';

export interface Color {
  h: number,
  s: number,
  v: number
}

@Component({
  selector: 'app-randomflashing-list',
  templateUrl: './randomflashing.component.html',
  styleUrls: ['./randomflashing.component.scss'],
})
export class RandomflashingListComponent {
  @Input() name: string;
  @ViewChild('list') list: IonRadioGroup;

  public colors: Map<string, Color> = new Map()
  public defaultValue: string = "cyan";
  
  constructor(public options: OptionsService) {
    this.colors.set("red", { h: 0, s: 1, v: 1 })
    this.colors.set("green", { h: 127, s: 0.99, v: 0.99 })
    this.colors.set("cyan", { h: 186, s: 0.99, v: 0.99 })
    this.colors.set("magenta", { h: 294, s: 0.99, v: 0.99 })
    
    if (this.options.current) {
      const color = this.options.current.params.colors
      this.colors.forEach((value, key) => {
        if (value.h == color[0] && value.s == color[1] && value.v == color[2]) {
          this.defaultValue = key;
        }
      })
    }
  }



}
