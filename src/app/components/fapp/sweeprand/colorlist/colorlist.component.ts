import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IonRadioGroup } from '@ionic/angular';

@Component({
  selector: 'app-colorlist',
  templateUrl: './colorlist.component.html',
  styleUrls: ['./colorlist.component.scss'],
})
export class ColorlistComponent {

  @Input() title: string;
  @Input() defaultValue: string;
  @ViewChild('radioGroup') radio: IonRadioGroup;
  public list =  ['road', 'gender', 'cold', 'warm'];

  constructor() { }

}
