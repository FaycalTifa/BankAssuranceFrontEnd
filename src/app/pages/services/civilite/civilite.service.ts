import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Banque} from '../../models/banque/banque';
import {Observable} from 'rxjs';
import {EntityArrayResponseType, EntityResponseType} from '../banque/banque.service';
import {Civilite} from '../../models/civilite/civilite';

@Injectable({
    providedIn: 'root'
})
export class CiviliteService {
    public resourceUrl = environment.api + 'civilite/';
    private apiUrl = 'http://localhost:9999/api/civilite';

    constructor(protected http: HttpClient) {
    }

    createCivilite(civilite: Civilite): Observable<EntityResponseType> {
        return this.http.post<Civilite>(this.apiUrl, civilite, {observe: 'response'});
    }

    updateCivilite(id: number, civiliteDetails: Civilite): Observable<Civilite> {
        console.log('==============333333=================', civiliteDetails.id);
        console.log('==============44444=================', civiliteDetails);
        return this.http.put<Banque>(`${this.apiUrl}/${id}`, civiliteDetails);
    }

    deleteCivilite(id: number, civiliteDetails: Civilite): Observable<Civilite> {
        console.log('==============333333=================', civiliteDetails.id);
        console.log('==============44444=================', civiliteDetails);
        return this.http.put<Civilite>(`${this.apiUrl}/deleteCivilite/${id}`, civiliteDetails);
    }


    getAllCivilites(): Observable<EntityArrayResponseType> {
        return this.http.get<Civilite[]>(this.apiUrl, {observe: 'response'});
    }
}
