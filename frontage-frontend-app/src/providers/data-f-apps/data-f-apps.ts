import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

/*
  Generated class for the DataFAppsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataFAppsProvider {

  baseUrl:string;

  constructor(public http: Http) {
    this.baseUrl = "/base";

    console.log('Base URL : ' + this.baseUrl);
  }

  public getList() : Observable<string>{
    return this.http.get(this.baseUrl)
      .map((resource:any) => resource.json());
  }

}
