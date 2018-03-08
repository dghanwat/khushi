import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AppConfig } from './app.config.service';
import { AuthService } from '../services/auth.service';
import { CacheService } from '../services/cache.service';
import { LocationModel } from './locationmanagement.service';

export class DeviceModel {
    id: string;
    locationId: string;
    organisationId: string;
    deviceType: string;
    model: string;
}

export class DevicesByLocation {
    organisationId: string;
    location: LocationModel = new LocationModel();
    devices: Map<string, DeviceModel> = new Map<string, DeviceModel>();
    devicesCount: number = 0;
    devicesWithoutStateCount: number = 0;
    redDevicesCount: number = 0;
    amberDevicesCount: number = 0;
    greenDevicesCount: number = 0;
}

export interface GetDeviceResponse {
    devices: DeviceModel[];
}

export interface GetDevicesByLocationsResponse {
    devices: DeviceModel[];
}

@Injectable()
export class DeviceManagementService {
    private apiURL: string;

    constructor(private config: AppConfig, private cacheService: CacheService,
        private http: Http, private authService: AuthService) {
        this.apiURL = config.getConfig('apiFacadeEndpoint');
    }

    /**
     * Method to invoke GET /api/devices/byLocation REST API to get all devices.
     * 
     * @return Observable<any>
     */
    public getDevices<T>(): Observable<any> {
        return this.cacheService.get('devices');
    }

    /**
     * Method to invoke POST /api/devices REST API to add a device.
     * 
     * @param device DeviceModel.
     * @return Observable<any>.
     */
    public addDevice(deviceModel: DeviceModel): Observable<any> {
        let body = JSON.stringify(deviceModel);
        return this.http
            .post(this.apiURL + '/api/devices', body,
            { params: this.authService.constructTokenParam(), headers: this.authService.getRequestHeader() })
            .map((res: any) => res.json())
            .catch(this.handleError);
    }

    /**
     * Method to invoke GET /api/devices/ REST API to get device details based on the given Id.
     * 
     * @param deviceId String.
     * @return Observable<any>.
     */
    public getDevice<T>(deviceId: string): Observable<any> {
        return this.cacheService.get('devices/' + deviceId);
    }

    /**
     * Method to invoke PUT /api/devices REST API to update device details.
     * 
     * @param user DeviceModel.
     * @return Observable<any>.
     */
    public editDevice(device: DeviceModel): Observable<any> {
        let body = JSON.stringify(device);
        return this.http
            .put(this.apiURL + '/api/devices', body,
            { params: this.authService.constructTokenParam(), headers: this.authService.getRequestHeader() })
            .map((res: any) => res)
            .catch(this.handleError);
    }

    /**
     * Method to invoke DELETE /api/devices/ REST API to delete a device based on the given Id.
     * 
     * @param userId String.
     * @return Observable<any>.
     */
    public deleteDevice(deviceId: string): Observable<any> {
        return this.http
            .delete(this.apiURL + '/api/devices/' + deviceId,
            { params: this.authService.constructTokenParam(), headers: this.authService.getRequestHeader() })
            .map((res: any) => res)
            .catch(this.handleError);
    }

    /**
     * Method to invoke GET /api/devices/byLocation REST API to get all devices organised by locations.
     * 
     * @return Observable<any>.
     */
    public getDevicesByLocations<T>(): Observable<any> {
        return this.cacheService.get('/devices/byLocation');
    }

    /**
     * Method to handle and log error responses from the services.
     * 
     * @param error any.
     */
    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
