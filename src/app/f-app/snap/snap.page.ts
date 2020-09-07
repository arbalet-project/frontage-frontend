import { Component, OnInit } from '@angular/core';
import { TrakingService } from 'src/app/core/plugins/tracking.service';

@Component({
  selector: 'app-snap',
  templateUrl: './snap.page.html',
  styleUrls: ['./snap.page.scss'],
})
export class SnapPage implements OnInit {

  constructor(public tracker: TrakingService) {
    this.tracker.playEvent('Live');
  }

  ngOnInit() {
  }

}
