import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ISimpleResponse } from './shared/interfaces/simple.interface';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { PushNotificationsService } from 'ng-push';
import { AuthService } from './services/auth.service';
import { InternalMessageService } from './services/internal.message.service';
import { Constants } from './services/constants';
import { EventNotificationService, Message } from './services/notification.service';
import { DisplayNotificationService } from './services/display.notification';
import { Subject } from 'rxjs/Subject';
import { AppConfig } from './services/app.config.service'


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
    isUserAuthorized: boolean = false;
    isUserAdministrator: boolean = false;
    loggedInUserName: string = '';
    subscription: Subscription;
    webSocketSubscription: Subject<Message>;
    message: any;
    messages: Message[] = [];
    public options = {
        position: ['bottom', 'right'],
        timeOut: 15000,
        lastOnBottom: false,
        rtl: false
    };

    idleState = 'Not started.';
    timedOut = false;
    lastPing?: Date = null;

    constructor(private _router: Router,
        private _authService: AuthService,
        private _pushNotifications: PushNotificationsService,
        private messageService: InternalMessageService,
        private constants: Constants,
        private eventNotificationService: EventNotificationService,
        private _displayNotificationService: DisplayNotificationService,
        private config: AppConfig
        ) {
        this._pushNotifications.requestPermission();

        if (config.getConfig("enviroment") === "production") {
            console.log = function () { };
        }
        this._router.events.subscribe(() => {
            this.isUserAuthorized = this._authService.isUserAuthorized();
            this.isUserAdministrator = this._authService.isCurrentUserAnAdministrator();
            this.loggedInUserName = this._authService.getLoggedInUserName();


        });

        this.subscription = this.messageService.getMessage().subscribe(message => {
            this.message = message;
            console.log('Recevied message from internam messaging service', this.message);
            if (this.message && this.message.text === this.constants.LOGIN_SUCCESS) {
                this.eventNotificationService.start();
                this.webSocketSubscription = this.eventNotificationService.messages;
                this.webSocketSubscription.subscribe(msg => {
                    this.messages.push(msg);
                    console.log(msg.message);
                    console.log('Broadcasting refresh message to all listeners !!!');
                    //this.messageService.sendMessage(this.constants.REFRESH, '');
                    if(msg.message.type === 'REFRESH') {
                        
                    }
                    if (msg.message.type === 'NOTIFY') {
                        this._displayNotificationService.showNotification(msg);
                    }
                });
                this.reset();

            }

            if (this.message && this.message.text === this.constants.WEBSOCKET_RECONNECT) {
                console.log('Reconnecting to Websocket');
                this.webSocketSubscription.unsubscribe();
                console.log('Unsubscribed from event notification');
                this.eventNotificationService.start();
                this.webSocketSubscription = this.eventNotificationService.messages;
                this.webSocketSubscription.subscribe(msg => {
                    this.messages.push(msg);
                    console.log(msg.message);
                    console.log('Broadcasting refresh message to all listeners !!!');
                    this.messageService.sendMessage(this.constants.REFRESH, '');
                    if (msg.message.type === 'NOTIFY') {
                        this._displayNotificationService.showNotification(msg);
                    }
                });
            }
        });
    }

    logout() {
        this._authService.logout();
        this._router.navigateByUrl('/');
    }

    ngOnDestroy() {
        // Unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
        this.webSocketSubscription.unsubscribe();
    }

    reset() {
        this.idleState = 'Started.';
        this.timedOut = false;
    }

}