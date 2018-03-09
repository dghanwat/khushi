import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { AppConfig } from './app.config.service';
import { LoginRequestModel } from '../models/auth/login-request.model';
import { ChangePasswordRequestModel } from '../models/changepasswordrequest.model';
import { ClientAuthDataModel } from '../models/auth/client-auth-data.model';

/**
 * Authentication Service for the Portal to perform Login and Logout operations,
 * as well as manage user session information.
 */
@Injectable()
export class AuthService {
    private _isAuthorized = false;
    private loggedInUserName = '';
    private _sessionAuthData: any;
    private apiURL: string;
    private user: any;

    constructor(private config: AppConfig,
        private http: Http) {
        this.apiURL = config.getConfig('apiFacadeEndpoint');
    }

    /**
     * Method to check whether user is logged-in and appropraite user information is available in session.
     *
     * @returns boolean.
     */
    isUserAuthorized(): boolean {

        // Get the auth information from the session.
        this._sessionAuthData = JSON.parse(sessionStorage.getItem('authData'));
        // Check if auth information present with valid token.
        if (this._sessionAuthData) {
            this._isAuthorized = true;
        }

        return this._isAuthorized;
    }

    /**
     * Method to check whether the user is administrator of not.
     *
     * @returns boolean.
     */
    isCurrentUserAnAdministrator(): boolean {

        // Get the auth information from the session.
        this._sessionAuthData = JSON.parse(sessionStorage.getItem('authData'));

        // Check whether user is an ADMINISTRATOR or not.
        if (this._sessionAuthData && this._sessionAuthData.token && this._sessionAuthData.userType) {
            if (this._sessionAuthData.userType === 'ADMINISTRATOR') {
                return true;
            }
        }
        return false;
    }

    /**
     * Method to check whether the user Id passed is logged-in user or not.
     *
     * @param userId string.
     */
    isLoggedInUser(userId: string): boolean {

        // Get the auth information from the session.
        this._sessionAuthData = JSON.parse(sessionStorage.getItem('authData'));
        
        if (this._sessionAuthData && this._sessionAuthData.token && this._sessionAuthData.userId === userId) {
            return true;
        }
    }

    /**
     * Method to get the name of the logged-in user to be displayed on the screen.
     *
     * @returns string.
    */
    getLoggedInUserName(): string {

        if (this.loggedInUserName === null || this.loggedInUserName === '') {
            // Get the auth information from the session.
            this._sessionAuthData = JSON.parse(sessionStorage.getItem('authData'));

            // Check if auth information present with valid token.
            if (this._sessionAuthData && this._sessionAuthData.token) {
                this.loggedInUserName = this._sessionAuthData.firstName + ' ' + this._sessionAuthData.lastName;
            }
        }

        return this.loggedInUserName;
    }

    /**
     * Method to get the access token from session if exsits.
     *
     * @param string.
     */
    getAccessTokenFromSession(): string {

        // Get the auth information from the session.
        this._sessionAuthData = JSON.parse(sessionStorage.getItem('authData'));

        // Check if auth information present with valid token.
        if (this._sessionAuthData && this._sessionAuthData.token) {
            return this._sessionAuthData.token;
        }
    }

    /**
     * Method to perform login operation based on the user credentials entered on the login screen.
     *
     * @param loginRequest LoginRequestModel.
     */
    login(token, user)  {
        this._authorizeUser(token, user);
    }

    /**
     * Method to perform logout operation.
     */
    logout() {
        this._isAuthorized = false;
        this.loggedInUserName = null;
        sessionStorage.removeItem('authData');
        sessionStorage.clear();
    }

    /**
     * Method to get the access token for the given user credentials.
     *
     * @param loginRequest LoginRequestModel.
     * @returns Observable<any>.
     */
    getAccessToken(loginRequest: LoginRequestModel): Observable<any> {

        // JSON body with user crdentials.
        const body = JSON.stringify(loginRequest);
        this.apiURL = this.config.getConfig('apiFacadeEndpoint');

        // Finally invoke the service and return the response.
        return this.http.post(this.apiURL + '/api/auth', body, { headers: this.getRequestHeader() });
    }

    /**
     * Method to get the user details based on the user Id and access token.
     *
     * @param userId string.
     * @param accessToken string.
     * @returns Observable<any>.
     */
    getUserDetails(userId: string, accessToken: string): Observable<any> {

        // Finally invoke the service and return the response.
        return this.http.get(this.apiURL + '/api/users/' + userId,
            { params: this.constructTokenParam(), headers: this.getRequestHeader() });
    }

    /**
     * Method to invoke PUT /api/metadata/user/credentials REST API to update user credentials.
     *
     * @param changePasswordRequest ChangePasswordRequestModel.
     * @return Observable<any>.
     */
    changePassword(changePasswordRequest: ChangePasswordRequestModel): Observable<any> {

        // Convert the object to JSON String.
        const body = JSON.stringify(changePasswordRequest);

        // Invoke and return the response.
        return this.http.put(this.apiURL + '/api/users/credentials', body,
            { params: this.constructTokenParam(), headers: this.getRequestHeader() })
            .map((res: any) => res)
            .catch(this.handleError);
    }


    /**
     * Method to get service access token value from session and construct the access token param.
     *
     * @param token string.
     * @returns string access token parameter.
     */
    constructTokenParam(): URLSearchParams {

        // Create URL parameter for access token.
        const params: URLSearchParams = new URLSearchParams();
        params.append('access_token', this.getAccessTokenFromSession());

        // Retutn the access token parameter with value from session.
        return params;
    }

    /**
     * Method to create the HTTP Header object and set authorization header in it.
     *
     * @returns Headers.
     */
    getRequestHeader(): Headers {

        // Create variable of type Header.
        const headers = new Headers();
        headers.set('Accept', 'application/json');
        headers.set('Content-Type', 'application/json');

        // Finally return the header object.
        return headers;
    }

    /**
     * Method to create instace with user information to be kept in session.
     *
     * @param token String.
     * @param userId String.
     */
    private _authorizeUser(token: string, user: any) {
        // First remove old session Data and then add new
        this.logout();
        // Mark the flag as true.
        this._isAuthorized = true;
        
        // Store the user information in session.
        sessionStorage.setItem('authData', JSON.stringify(user));
    }

    /**
     * Method to handle and log error responses from the services.
     *
     * @param error any.
     */
    private handleError(error: any) {
        console.log('Error',error);
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    setUser(user) {
        this.user = user
    }

    getUser() {
        if(this._authorizeUser) {
            this._sessionAuthData = JSON.parse(sessionStorage.getItem('authData'));
            return this._sessionAuthData;
        }
        return this.user;
    }

    getFacebookFriends(uid) {
        console.log('sessionStorage.getItem("fbAccessToken")',sessionStorage.getItem("fbAccessToken"))
        return this.http.get('https://graph.facebook.com/v2.12/'+uid+'/friendlists?',
        { params: this.constructAccessTokenParam(sessionStorage.getItem("fbAccessToken"))})
        .map((res: any) => res)
        .catch(this.handleError);
    }

    constructAccessTokenParam(token): URLSearchParams {

        // Create URL parameter for access token.
        const params: URLSearchParams = new URLSearchParams();
        params.append('access_token', token);

        // Retutn the access token parameter with value from session.
        return params;
    }
}
