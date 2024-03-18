import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EntityArrayResponseType, EntityResponseType} from '../banque/banque.service';
import {PeriodicitePaiementPrime} from '../../models/periodicitePaiementPrime/periodicite-paiement-prime';

@Injectable({
    providedIn: 'root'
})
export class PeriodicitePaiementPrimeService {
    public resourceUrl = environment.api + 'periodicitePaiementPrime/';
    private apiUrl = 'http://localhost:9999/api/periodicitePaiementPrime';

    constructor(protected http: HttpClient) {
    }

    createPeriodicitePaiementPrime(periodicitePaiementPrime: PeriodicitePaiementPrime): Observable<EntityResponseType> {
        return this.http.post<PeriodicitePaiementPrime>(this.apiUrl, periodicitePaiementPrime, {observe: 'response'});
    }

    // tslint:disable-next-line:max-line-length
    updatePeriodicitePaiementPrime(id: number, periodicitePaiementPrimeDetails: PeriodicitePaiementPrime): Observable<PeriodicitePaiementPrime> {
        console.log('==============333333=================', periodicitePaiementPrimeDetails.id);
        console.log('==============44444=================', periodicitePaiementPrimeDetails);
        return this.http.put<PeriodicitePaiementPrime>(`${this.apiUrl}/${id}`, periodicitePaiementPrimeDetails);
    }

    // tslint:disable-next-line:max-line-length
    deletePeriodicitePaiementPrime(id: number, periodicitePaimentPrimeDetails: PeriodicitePaiementPrime): Observable<PeriodicitePaiementPrime> {
        console.log('==============333333=================', periodicitePaimentPrimeDetails.id);
        console.log('==============44444=================', periodicitePaimentPrimeDetails);
        return this.http.put<PeriodicitePaiementPrime>(`${this.apiUrl}/deletePeriodicitePaiementPrime/${id}`, periodicitePaimentPrimeDetails);
    }


    getAllPeriodicitePaiementPrimes(): Observable<EntityArrayResponseType> {
        return this.http.get<PeriodicitePaiementPrime[]>(this.apiUrl, {observe: 'response'});
    }

}

