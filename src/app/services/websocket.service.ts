import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Observer } from 'rxjs/Observer';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { DisplayNotificationService } from './display.notification';
import { InternalMessageService } from './internal.message.service';
import { Constants } from './constants';

@Injectable()
export class WebSocketService {
    private subject: Subject<MessageEvent>;
    private subjectData: Subject<number>;
    private retryCounter = 0;

    constructor(private _router: Router,
        private _authService: AuthService,
        private displayNotificationService: DisplayNotificationService,
        private internalMessageService: InternalMessageService,
        private constants: Constants) {
        this._router = _router;
        this._authService = _authService;
    }

    public connect(url: string): Subject<MessageEvent> {
        console.log('Trying to connect to Websocket url', url);
        if (!this.subject) {
            this.subject = this.create(url);
        } else {
            console.log('Subject already exisits. Will unsubscribe and start new ');
            this.subject.unsubscribe();
            this.subject = this.create(url);
        }
        return this.subject;
    }

    public connectData(url: string): Subject<number> {
        if (!this.subjectData) {
            this.subjectData = this.createData(url);
        }
        return this.subjectData;
    }

    private create(url: string): Subject<MessageEvent> {
        console.log('Creating new Websocket connection at: ' + url);
        let accessToken = this._authService.getAccessTokenFromSession();
        let ws = new WebSocket(url);
        let that = this;
        ws.onopen = function () {
            console.log('Connected to the Websocket Successfully !!!');
            let userToken = { 'token': accessToken };
            console.log('Message to be send to Websocket Server: %s', JSON.stringify(userToken));
            ws.send(JSON.stringify(userToken));
        };

        ws.onerror = function () {
            that.retryCounter++;
            console.log('Error occurred while connecting to Websocket server !!!********');
            // that.displayNotificationService.showToastNotification('Error occurred while connecting to Websocket. ' +
            //     'You will not able to get real time notifications.', 'error');
            console.log('error on connection to URL', url);
            //that.internalMessageService.sendMessage(that.constants.WEBSOCKET_RECONNECT, '');
        };

        ws.onclose = function () {
            that.retryCounter++;
            console.log('Lost websocket connection with Websocket server !!!*****');
            // that.displayNotificationService.showToastNotification('Lost websocket connection with server. ' +
            //     'You will not able to get real time notifications.', 'error');
            console.log('lost connection to URL', url);
            if(that.retryCounter <= 50) {
                console.log('Retrying to connect',that.retryCounter);
                setInterval(that.internalMessageService.sendMessage(that.constants.WEBSOCKET_RECONNECT, ''),5000);
            } else {
                that.displayNotificationService.showToastNotification('Unable to make live connections with server ' +
                'You will not get real time notifications. Please contact your administrator.', 'info');
            }
        };

        let observable = Observable.create(
            (obs: Observer<MessageEvent>) => {
                ws.onmessage = obs.next.bind(obs);
                ws.onerror = obs.error.bind(obs);
                return ws.close.bind(ws);
            });

        let observer = {
            next: (data: Object) => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify(data));
                }
            }
        };

        return Subject.create(observer, observable);
    }

    private createData(url: string): Subject<number> {
        let ws = new WebSocket(url);

        let observable = Observable.create(
            (obs: Observer<number>) => {
                ws.onmessage = obs.next.bind(obs);
                ws.onerror = obs.error.bind(obs);
                ws.onclose = obs.complete.bind(obs);

                return ws.close.bind(ws);
            });

        let observer = {
            next: (data: Object) => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify(data));
                }
            }
        };

        return Subject.create(observer, observable);
    }
}
