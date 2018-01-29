import { TetrisOptionsPage } from './../tetris-options/tetris-options';
import { SnakeOptionsPage } from './../snake-options/snake-options';
import { SweepRandOptionsPage } from './../sweep-rand-options/sweep-rand-options';
import { RandomFlashingOptionsPage } from './../random-flashing-options/random-flashing-options';
import { FlagsOptionsPage } from './../flags-options/flags-options';
import { FApp } from './../../models/fapp';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataFAppsProvider } from '../../providers/data-f-apps/data-f-apps';
import { SweepAsyncOptionsPage } from '../sweep-async-options/sweep-async-options';

@Component({
  selector: 'page-f-app-list',
  templateUrl: 'f-app-list.html',
})
export class FAppListPage {

  fAppList: FApp[];
  fAppPosition: number;

  constructor(public navCtrl: NavController, public fAppsData: DataFAppsProvider) {

    fAppsData.getList()
      .subscribe(fAppList => this.fAppList = fAppList);

  }

  showOptions(fApp: FApp) {
    this.navCtrl.push(this.establishNavigationPageName(fApp.name), { selectedFapp: fApp, test: "test" });
  }

  printList() {
    console.log("list : " + JSON.stringify(this.fAppList));
  }

  private establishNavigationPageName(fAppName: string): any {
    console.log("fAppName : " + fAppName);
    switch(fAppName) {
      case "Flags" : {
        return FlagsOptionsPage;
      }
      case "RandomFlashing" :{
        return RandomFlashingOptionsPage;
      }
      case "SweepAsync" :{
        return SweepAsyncOptionsPage;
      }
      case "SweepRand" :{
        return SweepRandOptionsPage;
      }
      case "Snake" :{
        return SnakeOptionsPage;
      }
      case "Tetris" :{
        return TetrisOptionsPage;
      }
      default: {
        return FlagsOptionsPage;
      }
    }
  }
}
