import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AppConfig } from './app.config.service';
import { AuthService } from '../services/auth.service';
import { CacheService } from '../services/cache.service';

export class OrganisationModel {
    id: string;
    name: string;
}

export interface GetOrganisationsResponse {
    organisations: OrganisationModel[];
}

@Injectable()
export class OrganisationManagementService {
    private apiURL: string;

    constructor(private config: AppConfig, private cacheService: CacheService,
        private http: Http, private authService: AuthService) {
        this.apiURL = config.getConfig('apiFacadeEndpoint');
    }

    /**
     * Method to invoke GET /api/metadata/organisations REST API to get all organisations.
     * 
     * @return Observable<any>
     */
    public getOrganisations<T>(): Observable<any> {
        return this.cacheService.get('organisations');
    }

    /**
     * Method to invoke POST /api/metadata/organisation REST API to add a organisation.
     * 
     * @param organisation OrganisationModel.
     * @return Observable<any>.
     */
    public addOrganisation(organisation: OrganisationModel): Observable<any> {
        let body = JSON.stringify(organisation);
        return this.http
            .post(this.apiURL + '/api/organisations', body,
            { params: this.authService.constructTokenParam(), headers: this.authService.getRequestHeader() })
            .map((res: any) => res.json())
            .catch(this.handleError);
    }

    /**
     * Method to invoke GET /api/metadata/organisation REST API to get organisation details based on the given Id.
     * 
     * @param organisationId String.
     * @return Observable<any>.
     */
    public getOrganisation<T>(organisationId: string): Observable<any> {
        return this.cacheService.get('organisations/' + organisationId);
    }

    /**
     * Method to invoke PUT /api/metadata/organisation REST API to update organisation details.
     * 
     * @param organisation OrganisationModel.
     * @return Observable<any>.
     */
    public editOrganisation(organisation: OrganisationModel): Observable<any> {
        let body = JSON.stringify(organisation);
        return this.http
            .put(this.apiURL + '/api/organisations', body,
            { params: this.authService.constructTokenParam(), headers: this.authService.getRequestHeader() })
            .map((res: any) => res)
            .catch(this.handleError);
    }

    /**
     * Method to invoke DELETE /api/metadata/organisation REST API to delete a organisation based on the given Id.
     * 
     * @param organisationId String.
     * @return Observable<any>.
     */
    public deleteOrganisation(organisationId: string): Observable<any> {
        return this.http
            .delete(this.apiURL + '/api/organisations/' + organisationId,
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
