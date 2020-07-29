import { Component, OnInit, Output, Input, ViewChild } from '@angular/core';
import { FApp } from 'src/app/core/state/models/f-app';
import { State } from 'src/app/core/state/state.service';
import { IonRadioGroup } from '@ionic/angular';

@Component({
  selector: 'app-flag-list',
  templateUrl: './flag-list.component.html',
  styleUrls: ['./flag-list.component.scss'],
})
export class FlagListComponent implements OnInit {
  public fApp: FApp;

  @Input() defaultValue: string;
  @ViewChild("list") list: IonRadioGroup;
  constructor(public state: State) { }

  ngOnInit() {
    this.fApp = this.state.fAppList.findByName('Flags');
  }
}
