import { Component } from '@angular/core';
import { ApiService } from 'src/app/core/api/api.service';
import { environment } from 'src/environments/environment';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { State } from 'src/app/core/state/state.service';
import { interval, Subscription } from 'rxjs';
import { startWith, catchError } from 'rxjs/operators';
import { AdminFormService } from 'src/app/core/authentication/admin-form.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.page.html',
  styleUrls: ['./connection.page.scss'],
})
export class ConnectionPage {
  public statusServer = false;
  public message: string;
  public facadeUp = false;
  public subscribe: Subscription;

  constructor(
    private http: ApiService,
    public alertCtrl: AlertController,
    public translate: TranslateService,
    public state: State,
    public adminForm: AdminFormService,
    private datePipe: DatePipe
  ) { }

  ionViewWillEnter() {
    this.subscribe = interval(2500).pipe(startWith(0)).subscribe(() => this.update());
  }

  public update(): void {
    this.http.statusServer()
      .subscribe((status) => {
        this.subscribe.unsubscribe();
        if (status.protocol_version === environment.protocol_version) {
          this.updateStatus();
        } else {
          this.showOutdated();
        }
      }, (err) => {
        console.log(err);
      });
  }

  /**
   * @remarks Update app with the api status.
   */
  public updateStatus(): void {
    this.statusServer = true;
    this.http.statusFacade().subscribe((status) => {
      this.state.frontage.height = status.height;
      this.state.frontage.width = status.width;
      this.state.frontage.disabled = status.disabled;
      this.state.frontage.forced = status.is_forced;
      this.state.frontage.usable = status.is_usable;
      this.state.frontage.state = status.state;
      this.state.frontage.nextOnTime = status.next_on_time;
      this.updateForm();
    });
  }

  public updateForm() {
    if (this.state.frontage.state === 'off') {
      this.get_translation('connection.message.not_available');
    } else if (this.state.frontage.usable) {
      this.facadeUp = true;
    } else if (this.state.frontage.forced) {
      this.get_translation('connection.message.forced');
    } else {
      this.facadeUp = false;
      this.get_translation(
        'connection.message.down_alert',
        this.hourToString()
      );
    }
  }

  get_translation(messageKey: string, subText: string = '') {
    this.translate.get(messageKey).subscribe((translation) => {
      this.message = translation + subText;
    });
  }

  hourToString(): string {
    const splittedTime = this.state.frontage.nextOnTime.split("T")[1].split(":");
    let date = new Date()
    date.setUTCHours(parseInt(splittedTime[0]))
    date.setUTCMinutes(parseInt(splittedTime[1]));
    return this.datePipe.transform(date, "HH'h'mm");
  }

  /**
   * @remarks Show an alert controller if the user has not updated the app.
   */
  public showOutdated(): void {
    this.translate
      .get(['outdated.title', 'outdated.message'])
      .subscribe((translation) => {
        this.alertCtrl
          .create({
            header: translation['outdated.title'],
            subHeader: translation['outdated.message'],
            buttons: ['OK'],
          })
          .then((altEl) => altEl.present());
      });
  }

  public handleTapEvent() {
    this.adminForm.activate();
  }
}
