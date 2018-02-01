import { IonicErrorHandler } from 'ionic-angular';
import Raven from 'raven-js';
import { environment } from './../../app/environment';

Raven
    .config(`${environment.sentryUri}`)
    .install();

export class SentryErrorHandler extends IonicErrorHandler {

    handleError(error) {
        super.handleError(error);

        try {
          Raven.captureException(error.originalError || error);
        }
        catch(e) {
          console.error(e);
        }
    }
}