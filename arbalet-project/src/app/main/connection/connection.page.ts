import { Component } from '@angular/core';
import { ApiService } from 'src/app/core/api/api.service';
import { environment } from 'src/environments/environment';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { FrontageService } from 'src/app/core/frontage/frontage.service';
import { interval, Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

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
    public frontage: FrontageService
  ) { }

  ionViewWillEnter() {
    this.subscribe = interval(2500).pipe(startWith(0)).subscribe(() => this.update());
  }

  public update(): void {
    this.http.statusServer().subscribe((status) => {
      this.subscribe.unsubscribe();
      if (status.protocol_version === environment.protocol_version) {
        this.updateStatus();
      } else {
        this.showOutdated();
      }
    }, console.error);
  }

  /**
   * @remarks Update app with the api status.
   */
  public updateStatus(): void {
    this.statusServer = true;
    this.http.statusFacade().subscribe((status) => {
      this.frontage.height = status.height;
      this.frontage.width = status.width;
      this.frontage.disabled = status.disabled;
      this.frontage.forced = status.is_forced;
      this.frontage.usable = status.is_usable;
      this.frontage.state = status.state;
      this.frontage.nextOnTime = status.next_on_time;
      this.updateForm();
    });
  }

  public updateForm() {
    if (this.frontage.state === 'off') {
      this.get_translation('connection.message.not_available');
    } else if (this.frontage.usable) {
      this.facadeUp = true;
    } else if (this.frontage.forced) {
      this.get_translation('connection.message.forced');
    } else {
      this.facadeUp = false;
      // this.updateHour(status.next_on_time); TODO : next_on_time
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
    console.log('coucou', this.frontage.nextOnTime);
    console.log(this.frontage);

    return '';
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
}
