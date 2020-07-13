import { Component, OnInit } from '@angular/core';
import { FAppListService } from 'src/app/core/f-app/f-app-list.service';
import { FApp } from 'src/app/core/f-app/models/f-app';

@Component({
  selector: 'app-flags',
  templateUrl: './flags.page.html',
  styleUrls: ['./flags.page.scss'],
})
export class FlagsPage implements OnInit {
  public fApp: FApp;

  constructor(private fAppList: FAppListService) { }

  ngOnInit() {
    this.fApp = this.fAppList.findByName('Flags');
  }

}
