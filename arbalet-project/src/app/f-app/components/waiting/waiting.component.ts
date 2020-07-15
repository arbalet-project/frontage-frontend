import { Component, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { FAppService } from 'src/app/core/f-app/f-app.service';

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.component.html',
  styleUrls: ['./waiting.component.scss'],
})
export class WaitingComponent implements OnInit {
  public message_key: string;
  public submessage : string;

  private positionSubscription: Subscription;
  private launched: boolean = false;

  constructor(public modal: ModalController, public http: FAppService) { }

  ngOnInit() {
    this.message_key = "waiting.message.waiting";
    this.positionSubscription = interval(500).subscribe(() => {
      this.http.checkPosition().subscribe(r => this.handlePosition(r.position), err => console.error);
    });
  }

  handlePosition(position: number) {
    if (position > 0) {
      this.message_key = "waiting.message.queued";
      this.submessage = "" + position;
    } else {
      this.submessage = "";
      this.message_key = "waiting.message.starting"
      if (!this.launched && position == -1) {
        this.launched = true;
        this.startFapp()
      }
    }
  }

  startFapp() {
    this.modal.dismiss();
  }

  ionViewWillLeave() {
    this.positionSubscription.unsubscribe();
  }

}
