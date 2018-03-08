import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from './app.config.service';
import { AuthService } from './auth.service';

import 'rxjs/add/observable/of'; //proper way to import the 'of' operator
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';

@Injectable()
export class CacheService {
    
    private apiURL: string;

    constructor(private config: AppConfig,
        private http: Http, private authService: AuthService) {
        this.apiURL = config.getConfig('apiFacadeEndpoint');
    }

	private dataCache = new Map<string, any>();
	private observableCache = new Map<string, Observable<any>>();
  	
  	public get<T>(apiPath: string): Observable<any> {

		if(this.dataCache.has(apiPath)) {
		  // if device state is available just return it as `Observable`
		  console.log("Returning", apiPath, "from cache");
		  return Observable.of(this.dataCache.get(apiPath));
		} else if(this.observableCache.has(apiPath)) {
		  // if device state observable is set then the request is in progress
		  // return the Observable for the ongoing request
		  return this.observableCache.get(apiPath);      
		} else {
		  // create the request
		  var observable = this.http.get(this.apiURL + '/api/' + apiPath,
		        { params: this.authService.constructTokenParam(), headers: this.authService.getRequestHeader() })
		  .map(response =>  {
		    // when the cached data is available we don't need the `Observable` reference anymore
		    this.observableCache.delete(apiPath);
		    observable = null;
		    if(response.status == 400) {
		      return "FAILURE";
		    } else if(response.status == 200) {
		      console.log("Caching", apiPath);           
		      this.dataCache.set(apiPath,response.json());
		      return this.dataCache.get(apiPath);
		    }
		    // make it shared so more than one subscriber can get the result
		  })
		  .share();
		  this.observableCache.set(apiPath, observable);
		  return observable;
		}
  	}

}	