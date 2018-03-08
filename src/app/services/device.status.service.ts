import 'rxjs/add/operator/map';

import { Http } from '@angular/http';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from './app.config.service';
import { AuthService } from './auth.service';
import { CacheService } from './cache.service';

import { saveAs } from 'file-saver';
import * as moment from 'moment';

/**
 * POJO for managing response of Device Status Service.
 *
 * Service URI - /api/device/status/search
 */
export interface DeviceStatusResponse {
    flags: Flag[];
}

/**
 * POJO for managing details of device status flags.
 */
export interface Flag {
    name: string;
    value: string;
}

/**
 * POJO for managing event details.
 */
export interface Event {
    deviceId: string;
    eventType: string;
    eventCategory: string;
    description: string;
    severity: string;
    timestamp: string;
}

/**
 * Class responsible for invoking all Device Status Services.
 *
 * Service URI - /api/device/.*
 */
@Injectable()
export class DeviceStatusService {
    private apiURL: string;

    constructor(private config: AppConfig, private cacheService: CacheService,
        private http: Http, private authService: AuthService) {
        this.apiURL = config.getConfig('apiFacadeEndpoint');
    }

    /**
     * Method to get current of a particular device.
     *
     * @param deviceId String.
     * @returns Observable<any>.
     */
    public getDeviceState<T>(deviceId: string): Observable<any> {
        return this.cacheService.get('deviceState/' + deviceId);
    }

    /**
     * Method to get state of all devices in scope for current user
     *
     * @param deviceId String.
     * @returns Observable<any>.
     */
    public getDeviceStates<T>(organisationId?: string): Observable<any> {
        let sessionAuthData = JSON.parse(sessionStorage.getItem('authData'));
        console.log('User organisation is: ' + sessionAuthData.organisation);

        if(organisationId && organisationId != "ALL") {
            if (this.authService.isCurrentUserAnAdministrator ||
                organisationId === sessionAuthData.organisation) {
                return this.cacheService.get('deviceState/organisation/' + organisationId);
            } else {
                return Observable.throw("Current user not authorised to view organisation");
            }
        }
        return this.cacheService.get('deviceState');
    }

    public getDeviceStatesForLocation<T>(locationId): Observable<any> {
        return this.cacheService.get('deviceState/location/' + locationId);
    }
    /**
     * Method to get events history for a particular device.
     *
     * @param deviceId String.
     * @returns Observable<any>.
     */
    public getDeviceEvents<T>(deviceId: string): Observable<any> {
        return this.cacheService.get('deviceEvents/' + deviceId);
    }

        /**
     * Method to invoke API Facade to search for transactions for given device and export it to given format.
     *
     * @param deviceId string.
     * @param format string.
     */
    public exportEvents(deviceId: string, format: string) {
        console.log('Exporting Events in ' + format + ' format for device' + deviceId);

        // In order to get CSV format we will require to pass export query param.
        const queryParams: URLSearchParams = this.authService.constructTokenParam();
        queryParams.append('export', format);

        // Invoke the API Facade.
        this.http.get(this.apiURL + '/api/deviceEvents/' + deviceId,
            { params: queryParams })
            .toPromise()
            .then(response => {
                console.log(response);
                this.saveToFileSystem(response, format);
            })
            .catch(this.handleError);
    }

    /**
     * Method to invoke API Facade to search for events for given device and date range.
     *
     * @param deviceId string.
     * @param dateFromFilter Date.
     * @param dateToFilter Date.
     */
    public filterEventsByDate<T>(deviceId: string, dateFromFilter: Date, dateToFilter: Date): Observable<any> {
        console.log('Getting events for device ' + deviceId + ' for date from ' + dateFromFilter + ' date to ' + dateToFilter);

        // Create URL parameter for access token.
        const queryParams: URLSearchParams = this.authService.constructTokenParam();

        // Add dateForm query param if passed by the user.
        if (dateFromFilter) {
            const dateFrom = moment(dateFromFilter).format('YYYY-MM-DDTHH:mm');
            queryParams.append('dateFrom', dateFrom);
        }

        // Add dateTo query param if passed by the user.
        if (dateToFilter) {
            const dateTo = moment(dateToFilter).format('YYYY-MM-DDTHH:mm');
            queryParams.append('dateTo', dateTo);
        }

        // Finally invoke the service by passing required query params.
        return this.http.get(this.apiURL + '/api/deviceEvents/' + deviceId,
            { params: queryParams, headers: this.authService.getRequestHeader() })
            .map((res: any) => res.json())
            .catch(this.handleError);
    }

    /**
     * Method to save the given CSV data to file system using File Saver.
     *
     * @param response any
     */
    private saveToFileSystem(response: any, format: string) {

        // Get the value for Content-Disposition from response header.
        const contentDispositionHeader: string = response.headers.get('Content-Disposition');

        let filename = 'events.' + format.toLowerCase;

        // We want to get the filename specified in Content-Disposition.
        if (contentDispositionHeader) {
            const parts: string[] = contentDispositionHeader.split(';');
            filename = parts[1].split('=')[1];
        }

        // Get the response body and convert it to CSV Blob.
        const blob = new Blob([response._body], { type: this.getMimeType(format) });

        // Finally invoke saveAs function of file-saver to do rest of the job.
        saveAs(blob, filename);
    }

    /**
     * Method to get the desired Mime type for the given format.
     *
     * @param format string.
     */
    private getMimeType(format: string): string {
        switch (format) {
            case 'CSV':
                return 'text/csv';
            case 'PDF':
                return 'application/pdf';
            case 'XML':
                return 'application/xml';
        }
    }

    /**
     * Method to handle any error occurred during invokation of the service.
     *
     * @param error any
     */
    private handleError(error: any) {
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}

