import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Banque} from '../../models/banque/banque';
import {Observable} from 'rxjs';
import {EntityArrayResponseType, EntityResponseType} from '../banque/banque.service';
import {PeriodiciteRemboursement} from '../../models/periodiciteRemboursement/periodicite-remboursement';

@Injectable({
    providedIn: 'root'
})
export class PeriodiciteRemboursementService {
    public resourceUrl = environment.api + 'periodiciteRemboursement/';
    private apiUrl = 'http://localhost:9999/api/periodiciteRemboursement';

    constructor(protected http: HttpClient) {
    }

    createPeriodiciteRemboursement(periodiciteRemboursement: PeriodiciteRemboursement): Observable<EntityResponseType> {
        return this.http.post<PeriodiciteRemboursement>(this.apiUrl, periodiciteRemboursement, {observe: 'response'});
    }

    // tslint:disable-next-line:max-line-length
    updatePeriodiciteRemboursement(id: number, periodiciteRemboursementDetails: PeriodiciteRemboursement): Observable<PeriodiciteRemboursement> {
        console.log('==============333333=================', periodiciteRemboursementDetails.id);
        console.log('==============44444=================', periodiciteRemboursementDetails);
        return this.http.put<PeriodiciteRemboursement>(`${this.apiUrl}/${id}`, periodiciteRemboursementDetails);
    }

    // tslint:disable-next-line:max-line-length
    deletePeriodiciteRemboursement(id: number, periodiciteRemboursementDetails: PeriodiciteRemboursement): Observable<PeriodiciteRemboursement> {
        console.log('==============333333=================', periodiciteRemboursementDetails.id);
        console.log('==============44444=================', periodiciteRemboursementDetails);
        return this.http.put<PeriodiciteRemboursement>(`${this.apiUrl}/deletePeriodiciteRemboursement/${id}`, periodiciteRemboursementDetails);
    }


    getAllPeriodiciteRemboursements(): Observable<EntityArrayResponseType> {
        return this.http.get<PeriodiciteRemboursement[]>(this.apiUrl, {observe: 'response'});
    }
}
