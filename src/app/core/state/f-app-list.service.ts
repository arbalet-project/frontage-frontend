import { FApp } from './models/f-app';
import { FAppService } from '../api/app.service';
import { Injectable } from '@angular/core';

type fApplist = Array<FApp>;
@Injectable({
  providedIn: 'root',
})
export class FAppList {
  public keyList = 'fAppList';
  public fAppKnow: Array<string> = [
    'Flags',
    'RandomFlashing',
    'SweepRand',
    'SweepAsync',
    'Tetris',
    'Snake',
    'Drawing',
    'Snap',
  ];

  constructor(public http: FAppService) {}

  private updateList() {
    this.http.getList().subscribe((fAppList) => {
      this.reset();

      this.setLocalStorage(fAppList.filter((fApp) => {
        return this.fAppKnow.includes(fApp.name);
      }));
    });
  }

  public update() {
    this.updateList();
  }

  /**
   * Get the list of all frontage applications.
   *
   * @return An array contains all frontage applications.
   */
  get list(): fApplist {
    return localStorage.hasOwnProperty(this.keyList) ? this.getLocalStorage() : [];
  }


  /**
   * Find a frontage application by its name.
   */
  findByName(name: string): FApp {
    return this.list.find(el => el.name === name);
  }

  /***********************************************
   *            LocalStorageHandler
   ***********************************************/

  /**
   * Persist in the localStorage the list of all frontage application.
   *
   * @param list List of frontage application to persist.
   */
  private setLocalStorage(list: fApplist) {
    localStorage.setItem(this.keyList, JSON.stringify(list));
  }

  /**
   * Get the list frontage application persisted in the localStorage.
   */
  private getLocalStorage(): fApplist {
    return JSON.parse(localStorage.getItem(this.keyList));
  }

  /**
   * Remove the list of frontage application persisted in the localStorage.
   */
  reset() {
    localStorage.removeItem(this.keyList);
  }
}
