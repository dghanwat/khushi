import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

Injectable();
export class Constants {
    public LOGIN_SUCCESS = 'login_success';
    public WEBSOCKET_RECONNECT = 'websocket_reconnect';
    public API_URL: string;
    public WEBSOCKET_URL: string;
    public ID_REGX = new RegExp('^[a-zA-Z0-9_.-]{3,20}$');
    public REFRESH = 'REFRESH';
    public SESSION_IDLE_TIME = 20 * 60 // in seconds
    public SESSION_TIMEOUT = 60 // in seconds // after one minute after SESSION_IDLE_TIME the user will be logged off

    constructor( @Inject(DOCUMENT) private document: Document) {

        console.log('Location information: ' + this.document.location);

        if (this.document.location.hostname === 'localhost') {
            if (this.document.location.port === '4200') {
                this.API_URL = 'http://localhost:3000';
                this.WEBSOCKET_URL = 'ws://localhost:3000';
            } else {
                this.API_URL = 'http://localhost:' + this.document.location.port;
                this.WEBSOCKET_URL = 'ws://localhost:' + this.document.location.port;
            }
        } else {
            if (typeof this.document.location.port !== 'undefined' && this.document.location.port) {
                this.API_URL = this.document.location.protocol
                    .concat('//')
                    .concat(this.document.location.hostname)
                    .concat(':')
                    .concat(this.document.location.port);

                this.WEBSOCKET_URL = 'ws://'.concat(this.document.location.hostname)
                    .concat(':')
                    .concat(this.document.location.port);
            } else {
                this.API_URL = this.document.location.protocol
                    .concat('//')
                    .concat(this.document.location.hostname);

                this.WEBSOCKET_URL = 'ws://'.concat(this.document.location.hostname);
            }
        }

        console.log('API Facade URL is: ' + this.API_URL);
        console.log('Websocket URL is: ' + this.WEBSOCKET_URL);
    }
}
