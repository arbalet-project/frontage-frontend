import { Component, OnInit, Output } from '@angular/core';
import { FApp } from 'src/app/core/state/models/f-app';
import { State } from 'src/app/core/state/state.service';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-flag-list',
  templateUrl: './flag-list.component.html',
  styleUrls: ['./flag-list.component.scss'],
})
export class FlagListComponent implements OnInit {
  @Output() onChange: EventEmitter;
  
  public fApp: FApp;
  
  constructor(public state: State) { }

  ngOnInit() {
    this.fApp = this.state.fAppList.findByName('Flags');
  }
}
