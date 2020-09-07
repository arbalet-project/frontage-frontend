import { Component, OnInit } from '@angular/core';
import { TrakingService } from 'src/app/core/plugins/tracking.service';

@Component({
  selector: 'app-randomflashing',
  templateUrl: './randomflashing.page.html',
  styleUrls: ['./randomflashing.page.scss'],
})
export class RandomflashingPage implements OnInit {

  constructor(public tracker: TrakingService) {
    this.tracker.playEvent('RandomFlashing');
   }

  ngOnInit() {
  }

}
