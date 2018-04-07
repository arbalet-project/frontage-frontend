import { Dialogs } from '@ionic-native/dialogs';
import { SnapOptionsPage } from './../pages/snap-options/snap-options';
import { SnapJoystickPage } from './../pages/snap-joystick/snap-joystick';
import { SweepRandJoystickPage } from './../pages/sweep-rand-joystick/sweep-rand-joystick';
import { SweepAsyncJoystickPage } from './../pages/sweep-async-joystick/sweep-async-joystick';
import { RandomFlashingJoystickPage } from './../pages/random-flashing-joystick/random-flashing-joystick';
import { TetrisOptionsPage } from './../pages/tetris-options/tetris-options';
import { LoginPage } from './../pages/login/login';
import { SnakeJoystickPage } from './../pages/snake-joystick/snake-joystick';
import { SweepRandOptionsPage } from './../pages/sweep-rand-options/sweep-rand-options';
import { FlagsJoytickPage } from './../pages/flags-joytick/flags-joytick';
import { HttpInterceptorProvider } from './../providers/http-interceptor/http-interceptor';
import { WaitingPage } from './../pages/waiting/waiting';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { SentryErrorHandler } from './../providers/errors-handlers/sentry-errorhandler';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FAppListPage } from '../pages/f-app-list/f-app-list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataFAppsProvider } from '../providers/data-f-apps/data-f-apps';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { TimeProvider } from '../providers/time/time';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LocalStorageProvider } from '../providers/local-storage/local-storage';
import { NicknameGeneratorProvider } from '../providers/nickname-generator/nickname-generator';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Http, HttpModule } from '@angular/http';
import { TranslateLanguageProvider } from '../providers/translate-language/translate-language';
import { FlagsOptionsPage } from '../pages/flags-options/flags-options';
import { SweepAsyncOptionsPage } from '../pages/sweep-async-options/sweep-async-options';
import { RandomFlashingOptionsPage } from '../pages/random-flashing-options/random-flashing-options';
import { UserDisplayedComponent } from '../components/user-diplayed/user-displayed';
import { SnakeOptionsPage } from '../pages/snake-options/snake-options';
import { AppHeaderComponent } from '../components/app-header/app-header';
import { TetrisJoystickPage } from '../pages/tetris-joystick/tetris-joystick';
import { ErrorPage } from '../pages/error/error';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Vibration } from '@ionic-native/vibration';
import { SettingPage } from '../pages/setting/setting';
import { AdminProvider } from '../providers/admin/admin';
import { WebsocketMessageHandlerProvider } from '../providers/websocket-message-handler/websocket-message-handler';


export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

let components:any[] = [
    MyApp,
    HomePage,
    FAppListPage,
    WaitingPage,
    FlagsOptionsPage,
    FlagsJoytickPage,
    SweepAsyncOptionsPage,
    SweepAsyncJoystickPage,
    SweepRandOptionsPage,
    SweepRandJoystickPage,
    RandomFlashingOptionsPage,
    RandomFlashingJoystickPage,
    AppHeaderComponent,
    UserDisplayedComponent,
    SnakeJoystickPage,
    SnakeOptionsPage,
    LoginPage,
    TetrisOptionsPage,
    TetrisJoystickPage,
    ErrorPage,
    SnapJoystickPage,
    SnapOptionsPage,
    SettingPage
];

@NgModule({
  declarations: components,
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: components,
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: SentryErrorHandler},
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorProvider, multi: true},
    DataFAppsProvider,
    AuthenticationProvider,
    TimeProvider,
    HttpInterceptorProvider,
    NicknameGeneratorProvider,
    LocalStorageProvider,
    TranslateLanguageProvider,
    ScreenOrientation,
    Vibration,
    AdminProvider,
    Dialogs,
    WebsocketMessageHandlerProvider
  ]
})
export class AppModule {}
