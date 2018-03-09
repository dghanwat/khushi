import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { Http } from '@angular/http';


import { AppComponent } from './app.component';
import { routes } from './app.router';
import { SharedModule } from './shared/shared.module';
import { environment } from '../environments/environment';

import { AuthService } from './services/auth.service';
import { CacheService } from './services/cache.service';
import { Constants } from './services/constants';
import { AUTH_PROVIDERS } from './common/auth.guard';

import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications';
import { PushNotificationsModule, PushNotificationsService } from 'ng-push';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { EventNotificationService } from './services/notification.service';
import { WebSocketService } from './services/websocket.service';
import { DisplayNotificationService } from './services/display.notification';
import { AppConfig } from './services/app.config.service';


import { DeviceStatusService } from './services/device.status.service';
import { InternalMessageService } from './services/internal.message.service';
import { UserManagementService } from './services/usermanagement.service';
import { OrganisationManagementService } from './services/organisationmanagement.service';
import { LocationManagementService } from './services/locationmanagement.service';
import { DeviceManagementService } from './services/devicemanagement.service';
import { TransactionManagementService } from './services/transactionmanagement.service';
import { ExtendedHttpService } from './services/extended.http.service';
import { WindowRef } from './services/window.ref';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';


import { HomeModule } from './home/home.module';
import { ErrorModule } from './error/error.module';
import { LoginModule } from './login/login.module';
import { DashboardModule } from './dashboard/dashboard.module';


export const firebaseConfig = {
  apiKey: "AIzaSyAYNIE3nuQuRq8K77ZLae7IAkURqPuWa1c",
  authDomain: "khushi-dev-1520577742681.firebaseapp.com",
  databaseURL: "https://khushi-dev-1520577742681.firebaseio.com",
  projectId: "khushi-dev-1520577742681",
  storageBucket: "khushi-dev-1520577742681.appspot.com",
  messagingSenderId: "446965655019"
};

export function appConfigProvider(config: AppConfig) {
  return () => config.load();
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    FormsModule,
    HomeModule,
    LoginModule,
    ErrorModule,
    HttpModule,
    HttpClientModule,
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 50 }) : [],
    routes,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    PushNotificationsModule,
    HttpModule,
    SlimLoadingBarModule.forRoot(),
    NguiAutoCompleteModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    DashboardModule
  ],
  providers: [
    { provide: Http, useClass: ExtendedHttpService },
    AUTH_PROVIDERS,
    EventNotificationService,
    WebSocketService,
    NotificationsService,
    PushNotificationsService,
    WindowRef,
    DisplayNotificationService,
    AppConfig,
    DeviceStatusService,
    InternalMessageService,
    Constants,
    CacheService,
    UserManagementService,
    OrganisationManagementService,
    TransactionManagementService,
    LocationManagementService,
    OrganisationManagementService,
    DeviceManagementService

  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
