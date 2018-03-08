import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { PushNotificationsService } from 'ng-push'
import { WindowRef } from './window.ref';
import { Message } from './notification.service';

@Injectable()
export class DisplayNotificationService {
    isWindowActive: boolean;

    constructor(private _notificationService: NotificationsService,
        private _pushNotifications: PushNotificationsService,
        private winRef: WindowRef) {
        this.winRef.nativeWindow.onfocus = function() {
            console.log('Window Activated');
            this.isWindowActive = true;
        };
        this.winRef.nativeWindow.onblur = function() {
            console.log('Out of focus');
            this.isWindowActive = false;
        };
    }

    /**
     * displays either Push or toast notification depending on focus
     * if focus is on window then show Toast else Push
     * @param  {Message} msg message to be displayed
     * @return {boolean}     return true
     */
    showNotification(msg: Message): boolean {
        console.log('Window is active or not', this.isWindowActive);
        console.log('Showing notification', msg.message.data);
        if (!this.isWindowActive) {
            let options = {
                body: this.chunk(msg.message.data, 30),
                icon: '/assets/images/bell-icon.png',
                tag: msg.message.category,
                renotify: true,
                silent: false,
                sound: '/assets/sounds/appointed.mp3',
                noscreen: true,
                sticky: true,
                lang: 'en',
                vibrate: [500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110, 170, 40, 500]
             };
            this._pushNotifications.create('', options).subscribe(
                res => console.log(res),
                err => console.log(err)
            );
        } else {
            if (msg.message.type.toUpperCase() === 'NOTIFY') {
                if (msg.message.category === 'warning') {
                    this._notificationService.warn('Warning', msg.message.data);
                } else if (msg.message.category === 'error') {
                    this._notificationService.error('Error', msg.message.data);
                } else {
                    this._notificationService.info('Info', msg.message.data);
                }
            }
        }

        return true;
    }

    /**
     * Display notification on screen
     * @param  {string} message Message to be displayed
     * @param  {string} type    Type of messages, allowed values are 'info', 'success','error','warning'
     * @return {[type]}         [description]
     */
    showToastNotification(message: string,
        type: string) {
        switch (type.toLowerCase()) {
            case 'info': this._notificationService.info('Info:', message);
            break;
            case 'success': this._notificationService.success('Success:', message);
            break;
            case 'error': this._notificationService.error('Error:', message);
            break;
            case 'warning': this._notificationService.warn('Warning:', message);
            break;
            default: this._notificationService.info('Info:', message);
            break;
        }
    }

    private chunk (str, n) {
        let ret = [];
        let i;
        let len;
        for (i = 0, len = str.length; i < len; i += n) {
            if (i === 0) {
                let x = str.substr(i, n);
                ret.push(x);
            } else {
                let x = str.substr(i, n).replace(' ', '\n');
                ret.push(x);
            }
          }
        return ret.join('');
    };
}
