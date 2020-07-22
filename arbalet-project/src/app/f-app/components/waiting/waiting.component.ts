import { Component, OnInit } from '@angular/core';
import { Subscription, interval, Observable, of } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { FAppService } from 'src/app/core/api/app.service';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.component.html',
  styleUrls: ['./waiting.component.scss'],
})
export class WaitingComponent implements OnInit {
  public messageKey: string;
  public submessage: string;

  private positionSubscription: Subscription;
  private launched = false;

  constructor(public modal: ModalController, public http: FAppService, public auth: AuthenticationService) { }

  ngOnInit() {
    this.messageKey = 'waiting.message.waiting';
    this.positionSubscription = interval(500).subscribe(() => {
      this.http.checkPosition().subscribe(r => this.handlePosition(r.position), err => console.error);
    });
  }

  handlePosition(position: number) {
    if (position > 0) {
      this.messageKey = 'waiting.message.queued';
      this.submessage = '' + position;
    } else {
      this.submessage = '';
      this.messageKey = 'waiting.message.starting';
      if (!this.launched && position === -1) {
        this.launched = true;
        this.startFapp();
      }
    }
  }

  startFapp() {
    this.modal.dismiss({ok : true});
  }

  ionViewWillLeave() {
    this.positionSubscription.unsubscribe();
  }

}
