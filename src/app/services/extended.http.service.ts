import { Injectable, Injector } from '@angular/core';
import { Request, XHRBackend, RequestOptions, Response, Http, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { DisplayNotificationService } from '../services/display.notification';


@Injectable()
export class ExtendedHttpService extends Http {
    private router; 
    private authService: AuthService;

  constructor(  backend: XHRBackend, defaultOptions: RequestOptions, private injector: Injector,
    private displayNotificationService: DisplayNotificationService    ) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
 
    if (typeof url === 'string') {
      if (!options) {
        options = { headers: new Headers() };
      }
      this.setHeaders(options);
    } else {
      this.setHeaders(url);
    }
    //console.log("url: " + JSON.stringify(url) +", Options:" + options);

    return super.request(url, options).catch(this.catchErrors(url));
  }

  private catchErrors(url: string | Request) {

    return (res: Response) => {
        if (this.router == null) {
            this.router = this.injector.get(Router);
        }
        if (res.status === 401 || res.status === 403) {
            //handle authorization errors
            if (typeof url === 'string') {
                console.log("Error_Token_Expired: redirecting to login.");
                this.authService.logout()
                this.router.navigate(['login']);
            } else {
                if(url.url.indexOf("/api/auth") === -1 ) { // Do not show message on Login Page
                    this.displayNotificationService.showToastNotification('Session timeout. Please login again to continue', 'error');
                    this.authService.logout()
                    this.router.navigate(['login']);
                }
            }
        }
        console.log('Error response is',res.status);
        return Observable.throw(res);
    };
  }

  private setHeaders(objectToSetHeadersTo: Request | RequestOptionsArgs) {
      
      if (this.authService == null) {
            this.authService = this.injector.get(AuthService);
      }
    //add whatever header that you need to every request
     //TODO objectToSetHeadersTo.headers.set('token', this.authService.getToken());
  }
}