import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { Constants } from './constants';

@Injectable()
export class AppConfig {
    private config: Object = new Object();
    private env: Object = new Object();

    constructor(private http: Http,
        private constants: Constants) {
    }

    /**
     * Use to get the data found in the second file (config file)
     */
    public getConfig(key: any) {
        if (this.config) {
            return this.config[key];
        } else {
            return '';
        }
    }

    /**
     * Use to get the data found in the first file (env file)
     */
    public getEnv(key: any) {
        if (this.env) {
            return this.env[key];
        } else {
            return '';
        }
    }

    /**
     * All environment config json files have property "apiFacadeEndpoint" 
     * with blank value (besides development one). This is kept in case in future 
     * if location of API Management changes we just have to specify the host and port here. 
     * Config files are retained if in future we want to have some environment specific 
     * properties we can keep that in those config files.
     * 
     * This method:
     *   a) Loads "env.json" to get the current working environment (e.g.: 'production', 'development')
     *   b) Loads "config.[env].json" to get all env's variables (e.g.: 'config.development.json')
     */
    public load() {
        return new Promise((resolve, reject) => {
            this.http.get(this.constants.API_URL + '/environment/config').map((res: any) => res.json()).catch((error: any): any => {
                console.log('Configuration file "env.json" could not be read');
                resolve(true);
            }).subscribe((envResponse: any) => {
                this.env = envResponse;
                let request: any = null;
                console.log('Enviornment is ', envResponse.env);
                if (envResponse.env === '') {
                    request = this.http.get('/assets/environments/config.development.json');
                    resolve(true);
                } else {
                    request = this.http.get('/assets/environments/config.' + envResponse.env + '.json');
                }

                if (request) {
                    request
                        .map(res => res.json())
                        .catch((error: any) => {
                            console.error('Error reading ' + envResponse.env + ' configuration file');
                            resolve(error);
                            return Observable.throw(error.json().error || 'Server error');
                        })
                        .subscribe((responseData) => {
                            this.config = responseData;
                            resolve(true);
                        });
                } else {
                    console.error('Env config file "env.json" is not valid');
                    resolve(true);
                }
            });
        });
    }
}
