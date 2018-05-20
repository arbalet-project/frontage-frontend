import { Injectable } from '@angular/core';
import { IonicErrorHandler } from 'ionic-angular';
import Raven from 'raven-js';
import { environment } from './../../app/environment';
import { ErrorPage } from '../../pages/error/error';
import { App } from 'ionic-angular/components/app/app';

Raven
    .config(`${environment.sentryUri}`)
    .install();

@Injectable()
export class SentryErrorHandler extends IonicErrorHandler {

    constructor(private app: App) {
        super();
    }

    handleError(error) {
        try {
            Raven.captureException(error.originalError || error);

            let errorToSend = error;
            try {
                errorToSend = JSON.stringify(error);
            } catch(e) {
                errorToSend = error;
            }
            //As the navCtrller cannot be injected in a provider, it has to be got from the App
            let nav = this.app.getActiveNav();
            if(nav != null) {
                nav.push(ErrorPage, { errorMessage: errorToSend });
            }else {
                alert(errorToSend);
            }
        }
        catch (e) {
            alert("erreur en plus : " + e);
            console.error(e);
        }
    }
}