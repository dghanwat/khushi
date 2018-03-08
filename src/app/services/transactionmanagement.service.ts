import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AppConfig } from './app.config.service';
import { AuthService } from '../services/auth.service';
import { Constants } from './constants';
import { saveAs } from 'file-saver';
import * as moment from 'moment';

export class TransactionSummaryModel {
    id: string;
    date: string;
    deviceId: string;
    status: string;
    type: string;
    todRef: string;
    cardHolder: string;
    total: number;
    routeCode: string;
    from: string;
    to: string;
}

export class TransactionDetailsModel {
    id: string;
    date: string;
    deviceId: string;
    status: string;
    type: string;
    todRef: string;
    customerDetails: CustomerDetails;
    ticketDetails: TicketDetails;
}

export class CustomerDetails {
    cardNumber: string;
    cardHolder: string;
    authCode: string;
    total: number;
    cash: number;
    change: number;
    discount: number;
    railCard: string;
}

export class TicketDetails {
    from: string;
    to: string;
    routeCode: string;
    fareCode: string;
    adults: number;
    children: number;
    ccstTickets: number;
}

@Injectable()
export class TransactionManagementService {
    private apiURL: string;
    private _sessionAuthData: any;
    constructor(private config: AppConfig,
        private http: Http,
        private authService: AuthService,
        private constants: Constants) {
        this.apiURL = config.getConfig('apiFacadeEndpoint');
        this._sessionAuthData = JSON.parse(sessionStorage.getItem('authData'));
    }

    /**
     * Method to get transactions for the given device Id.
     *
     * @param deviceId string.
     */
    public getTransactions<T>(deviceId: string): Observable<any> {
        console.log('Getting transactions for device', deviceId);
        return this.http.get(this.apiURL + '/api/transactions/device/' + deviceId,
            { params: this.authService.constructTokenParam(), headers: this.authService.getRequestHeader() })
            .map((res: any) => res.json())
            .catch(this.handleError);
    }

    /**
     * Method to get transaction details for the given transaction Id.
     *
     * @param transactionId stirng.
     */
    public getTransactionDetails<T>(transactionId: string): Observable<any> {
        console.log('Getting transaction details for Id', transactionId);
        return this.http.get(this.apiURL + '/api/transactions/' + transactionId,
            { params: this.authService.constructTokenParam(), headers: this.authService.getRequestHeader() })
            .map((res: any) => res.json())
            .catch(this.handleError);
    }

    /**
     * Method to invoke API Facade to search for transactions for given device and export it to given format.
     *
     * @param deviceId string.
     * @param format string.
     */
    public exportTransactions(deviceId: string, format: string) {
        console.log('Exporting Transactions in ' + format + ' format for device' + deviceId);

        // In order to get CSV format we will require to pass export query param.
        const queryParams: URLSearchParams = this.authService.constructTokenParam();
        queryParams.append('export', format);

        // Invoke the API Facade.
        this.http.get(this.apiURL + '/api/transactions/device/' + deviceId,
            { params: queryParams })
            .toPromise()
            .then(response => {
                console.log(response);
                this.saveToFileSystem(response, format);
            })
            .catch(this.handleError);
    }

    /**
     * Method to invoke API Facade to search for transactions for given device and date range.
     *
     * @param deviceId string.
     * @param dateRangeFilter Date[].
     */
    public filterTransactionsByDate<T>(deviceId: string, dateFromFilter: Date, dateToFilter: Date): Observable<any> {
        console.log('Getting transactions for device ' + deviceId + ' for date from ' + dateFromFilter + ' date to ' + dateToFilter);

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
        return this.http.get(this.apiURL + '/api/transactions/device/' + deviceId,
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

        let filename = 'transactions.' + format.toLowerCase;

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
