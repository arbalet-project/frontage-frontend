import { Component, OnInit } from '@angular/core';
import { Subscription, interval, Observable, of } from 'rxjs';
import { ModalController, NavController } from '@ionic/angular';
import { FAppService } from 'src/app/core/api/app.service';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { delay } from 'rxjs/operators';
import { OptionsService } from 'src/app/core/f-app/options.service';

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.component.html',
})
export class WaitingComponent implements OnInit {
  public messageKey = 'waiting.message.waiting';
  public submessage: string;

  private positionSubscription: Subscription;
  private launched = false;

  constructor(
    public modal: ModalController,
    public http: FAppService,
    public auth: AuthenticationService,
    public nav: NavController,
    public options: OptionsService
  ) { }

  ngOnInit() {
    this.positionSubscription = interval(500).subscribe(() => {
      this.http.checkPosition().subscribe(
        (r) => this.handlePosition(r.position),
        (err) => console.error
      );
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
    this.http.getCurrentFApp().subscribe((res) => {
      if (
        res.userid === this.auth.userid ||
        (res.is_forced && this.auth.admin)
      ) {
        this.options.current = res;
        this.modal.dismiss({ ok: true });
      } else {
        this.modal.dismiss({ ok: false, kicked: true });
      }
    });
  }

  stop() {
    this.http.quitQueue();
    this.modal.dismiss({ ok: false, kicked: false });
  }

  ionViewWillLeave() {
    this.positionSubscription.unsubscribe();
  }
}
