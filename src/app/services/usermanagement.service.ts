import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AppConfig } from './app.config.service';
import { AuthService } from '../services/auth.service';

export class UserModel {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    userType: string;
    organisationId?: string;
}

export interface GetUsersResponse {
    users: UserModel[];
}

@Injectable()
export class UserManagementService {
    private apiURL: string;

    constructor(private config: AppConfig,
        private http: Http, private authService: AuthService) {
        this.apiURL = config.getConfig('apiFacadeEndpoint');
    }

    /**
     * Method to invoke GET /api/metadata/users REST API to get all users.
     * 
     * @return Observable<any>
     */
    public getUsers<T>(): Observable<any> {
        return this.http.get(this.apiURL + '/api/users',
            { params: this.authService.constructTokenParam(), headers: this.authService.getRequestHeader() })
            .map((res: any) => res.json());
    }

    /**
     * Method to invoke POST /api/metadata/user REST API to add a user.
     * 
     * @param user UserModel.
     * @return Observable<any>.
     */
    public addUser(user: UserModel): Observable<any> {
        let body = JSON.stringify(user);
        return this.http
            .post(this.apiURL + '/api/users', body,
            { params: this.authService.constructTokenParam(), headers: this.authService.getRequestHeader() })
            .map((res: any) => res.json())
            .catch(this.handleError);
    }

    /**
     * Method to invoke GET /api/metadata/user REST API to get user details based on the given Id.
     * 
     * @param userId String.
     * @return Observable<any>.
     */
    public getUser<T>(userId: string): Observable<any> {
        return this.http.get(this.apiURL + '/api/users/' + userId,
            { params: this.authService.constructTokenParam(), headers: this.authService.getRequestHeader() })
            .map((res: any) => res.json())
            .catch(this.handleError);
    }

    /**
     * Method to invoke PUT /api/metadata/user REST API to update user details.
     * 
     * @param user UserModel.
     * @return Observable<any>.
     */
    public editUser(user: UserModel): Observable<any> {
        let body = JSON.stringify(user);
        return this.http
            .put(this.apiURL + '/api/users', body,
            { params: this.authService.constructTokenParam(), headers: this.authService.getRequestHeader() })
            .map((res: any) => res)
            .catch(this.handleError);
    }

    /**
     * Method to invoke DELETE /api/metadata/user REST API to delete a user based on the given Id.
     * 
     * @param userId String.
     * @return Observable<any>.
     */
    public deleteUser(userId: string): Observable<any> {
        return this.http
            .delete(this.apiURL + '/api/users/' + userId,
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
