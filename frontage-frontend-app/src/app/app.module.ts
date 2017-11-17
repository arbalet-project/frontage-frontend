import { HttpInterceptorProvider } from './../providers/http-interceptor/http-interceptor';
import { WaitingPage } from './../pages/waiting/waiting';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FAppListPage } from '../pages/f-app-list/f-app-list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataFAppsProvider } from '../providers/data-f-apps/data-f-apps';
import { HttpModule } from '@angular/http';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { TimeProvider } from '../providers/time/time';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LocalStorageProvider } from '../providers/local-storage/local-storage';

let components:any[] = [
    MyApp,
    HomePage,
    FAppListPage,
    WaitingPage
];

@NgModule({
  declarations: components,
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: components,
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorProvider, multi: true},
    DataFAppsProvider,
    AuthenticationProvider,
    TimeProvider,
    HttpInterceptorProvider,
    LocalStorageProvider
  ]
})
export class AppModule {}
