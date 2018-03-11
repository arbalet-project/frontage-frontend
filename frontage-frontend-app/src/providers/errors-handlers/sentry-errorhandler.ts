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

        alert("Erreur ! [" + error + "]" );

        try {
            Raven.captureException(error.originalError || error);

            //As the navCtrller cannot be injected in a provider, it has to be got from the App
            this.app.getActiveNav().push(ErrorPage);
        }
        catch (e) {
            console.error(e);
        }
    }
}