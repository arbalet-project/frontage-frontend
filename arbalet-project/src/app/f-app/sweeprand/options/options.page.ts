import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { State } from 'src/app/core/state/state.service';
import { FApp } from 'src/app/core/state/models/f-app';
import { OptionsService } from 'src/app/core/f-app/options.service';
import { IonRadioGroup } from '@ionic/angular';

@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss']
})
export class OptionsPage implements OnInit {
  public fApp: FApp;
  parametersList = ["road", "gender", "cold", "warm"];

  @ViewChild("radioGroup") radio : IonRadioGroup;

    constructor(public state: State, public options: OptionsService) { }

  ngOnInit() {
    this.fApp = this.state.fAppList.findByName('SweepAsync');
  }

  startFApp() {
    this.options.startFapp({
      name: this.fApp.name,
      params: {
        uapp: this.radio.value
      }
    }, '/f-app/sweeprandom');
  }

}
