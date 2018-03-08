import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class InternalMessageService {
    private subject = new Subject<any>();

    sendMessage(message: string, value: any) {
        this.subject.next({ text: message , data: value});
    }

    clearMessage() {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
