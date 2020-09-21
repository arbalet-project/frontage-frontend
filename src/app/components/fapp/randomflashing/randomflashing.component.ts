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
  public defaultValue: string = "darkblue";

  constructor(public options: OptionsService) {
    //  , "purple", "skyblue", "mediumturquoise", "darkorange", "bordeaux"
    //
    this.colors.set("darkblue", { h: 0.666666667, s: 1, v: 0.27 })
    this.colors.set("deeppink", { h: 0.911111111, s: 1.0, v: 0.54 })
    this.colors.set("chartreuse", { h: 0.25, s: 1.0, v: 1.0 })
    this.colors.set("gold", { h: 0.138211382, s: 1.0, v: 0.5 })
    this.colors.set("purple", { h: 0.833333333, s: 1.0, v: 0.25 })
    this.colors.set("skyblue", { h: 0.547222222, s: 0.71, v: 0.73 })
    this.colors.set("mediumturquoise", { h: 0.494444444, s: 0.61, v: 0.54 })
    this.colors.set("bordeaux", { h: 0.0, s: 1.0, v: 0.25 })
    this.colors.set("darkorange", { h: 0.108333333, s: 1.0, v: 0.50 })

    if (this.options.current && this.options.current.params.colors) {
      const color = this.options.current.params.colors
      this.colors.forEach((value, key) => {
        if (value.h == color[0] && value.s == color[1] && value.v == color[2]) {
          this.defaultValue = key;
        }
      })
    }
  }



}
