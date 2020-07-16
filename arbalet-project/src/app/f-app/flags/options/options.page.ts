import { Component, OnInit } from '@angular/core';
import { FApp } from 'src/app/core/f-app/models/f-app';
import { FAppListService } from 'src/app/core/f-app/f-app-list.service';
import { OptionsService } from 'src/app/core/f-app/options.service';
import { FAppService } from 'src/app/core/f-app/f-app.service';
import { ModalController, AlertController } from '@ionic/angular';
import { WaitingComponent } from '../../components/waiting/waiting.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss'],
})
export class OptionsPage implements OnInit {
  fApp: FApp;
  chooseValue = true;
  constructor(
    public fAppList: FAppListService,
    public fAppOptions: OptionsService,
    public httpFapp: FAppService,
    public modal: ModalController,
    public alert: AlertController,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.fApp = this.fAppList.findByName('Flags');
    this.fAppOptions.name = this.fApp.name;
  }

  onChange(event) {
    this.fAppOptions.parameters.flags = event.detail.value;
    this.chooseValue = false; // TODO : Change this !
  }

  startFApp() {
    console.log("test");
    this.httpFapp
      .launchFApp({
        name: this.fAppOptions.name,
        params: {
          uapp: this.fAppOptions.parameters.flags,
        },
      })
      .subscribe(async (r) => {
        console.log(r);
        const modal = await this.modal.create({
          component: WaitingComponent,
          componentProps: {
            'info': r
          }
        });

        modal.onDidDismiss().then(async (data) => {
          let finish : boolean = data.data.ok;

          if(finish) {
            // TODO : Go to the page
          } else {
            const alert = await this.alert.create({
              header: this.translate.instant('waiting.kicked.title'),
              message: this.translate.instant('waiting.kicked.message'),
              buttons: ['Ok']
            })

            await alert.present();
          }
        })

        return await modal.present();
      });
  }
}
