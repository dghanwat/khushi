import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AppConfig } from './app.config.service';
import { AuthService } from '../services/auth.service';

export class LocationModel {
    id: string;
    description: string;
}

export interface GetLocations {
    locations: LocationModel[];
}

@Injectable()
export class LocationManagementService {
    private apiURL: string;

    constructor(private config: AppConfig,
        private http: Http, private authService: AuthService) {
        this.apiURL = config.getConfig('apiFacadeEndpoint');
    }

    /**
     * Method to invoke GET /api/metadata/location REST API to get all locations.
     *
     * @return Observable<any>
     */
    public getLocations<T>(): Observable<any> {
        return this.http.get(this.apiURL + '/api/locations',
            { params: this.authService.constructTokenParam(), headers: this.authService.getRequestHeader() })
            .map((res: any) => res.json());
    }

    /**
     * Method to invoke POST /api/metadata/location REST API to add a location.
     *
     * @param location LocationModel.
     * @return Observable<any>.
     */
    public addLocation(location: LocationModel): Observable<any> {
        let body = JSON.stringify(location);
        return this.http
            .post(this.apiURL + '/api/locations', body,
            { params: this.authService.constructTokenParam(), headers: this.authService.getRequestHeader() })
            .map((res: any) => res.json())
            .catch(this.handleError);
    }

    /**
     * Method to invoke GET /api/metadata/location REST API to get location details based on the given Id.
     *
     * @param locationId String.
     * @return Observable<any>.
     */
    public getLocation<T>(locationId: string): Observable<any> {
        return this.http.get(this.apiURL + '/api/locations/' + locationId,
            { params: this.authService.constructTokenParam(), headers: this.authService.getRequestHeader() })
            .map((res: any) => res.json())
            .catch(this.handleError);
    }

    /**
     * Method to invoke PUT /api/metadata/location REST API to update location details.
     *
     * @param location LocationModel.
     * @return Observable<any>.
     */
    public editLocation(location: LocationModel): Observable<any> {
        let body = JSON.stringify(location);
        return this.http
            .put(this.apiURL + '/api/locations', body,
            { params: this.authService.constructTokenParam(), headers: this.authService.getRequestHeader() })
            .map((res: any) => res)
            .catch(this.handleError);
    }

    /**
     * Method to invoke DELETE /api/metadata/location REST API to delete a location based on the given Id.
     *
     * @param locationId String.
     * @return Observable<any>.
     */
    public deleteLocation(locationId: string): Observable<any> {
        return this.http
            .delete(this.apiURL + '/api/locations/' + locationId,
            { params: this.authService.constructTokenParam(), headers: this.authService.getRequestHeader() })
            .map((res: any) => res)
            .catch(this.handleError);
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
