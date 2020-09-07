import { Component, OnInit } from '@angular/core';
import { TrakingService } from 'src/app/core/plugins/tracking.service';

@Component({
  selector: 'app-drawing',
  templateUrl: './drawing.page.html',
  styleUrls: ['./drawing.page.scss'],
})
export class DrawingPage implements OnInit {

  constructor(public tracker: TrakingService) {
    this.tracker.playEvent('Drawing');
  }

  ngOnInit() {
  }

}
