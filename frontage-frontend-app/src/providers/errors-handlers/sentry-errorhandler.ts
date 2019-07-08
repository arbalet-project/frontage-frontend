import { Vibration } from '@ionic-native/vibration';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { IonicErrorHandler, ToastController } from 'ionic-angular';
import Raven from 'raven-js';
import { environment } from './../../app/environment';

Raven
    .config(`${environment.sentryUri}`)
    .install();

@Injectable()
export class SentryErrorHandler extends IonicErrorHandler {

    isToastVisible:Boolean = false;

    constructor(public vibration: Vibration,
        public tranlation: TranslateService, public toastCtrl: ToastController) {
        super();
    }

    handleError(error) {

        try {
            let errorToSend = error;

            if (errorToSend != undefined && errorToSend.status == 0) {
                // Status 0 means we lost connection
                if(!this.isToastVisible) {
                    this.isToastVisible = true;
                    this.showToast("CONNECTION_LOST");
                }
            } else {
                Raven.captureException(error.originalError || error);
            }
        }
        catch (e) {
           alert("erreur en plus : " + e);
           console.error(e);
        }
    }

    showToast(messageKey) {
        let content = this.getTranslation(messageKey);

        let toast = this.toastCtrl.create({
            message: content,
            duration: 4000,
            position: 'top'
        });

        toast.onDidDismiss(() => {
            this.isToastVisible = false;
            console.log('Dismissed toast');
        });

        toast.present();

        this.vibration.vibrate([1000]);
    }

    getTranslation(key) {
        let content = "";
        this.tranlation.get(key).subscribe(t => {
            content = t;
        });

        return content;
    }
}
