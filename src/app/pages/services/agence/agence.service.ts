import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EntityArrayResponseType, EntityResponseType} from "../banque/banque.service";
import {Agence} from "../../models/agence/agence";
import {ConsoleLogger} from "@angular/compiler-cli";

@Injectable({
    providedIn: 'root'
})
export class AgenceService {

    private apiUrl = 'http://localhost:9999/api/agence';

    constructor(protected http: HttpClient) {
    }

    createAgence(agence: Agence): Observable<EntityResponseType> {
        console.log("============ SERVICE AGENCE ================", agence)
        return this.http.post<Agence>(this.apiUrl, agence, {observe: 'response'});
    }


    updateAgence(id: number, agenceDetails: Agence): Observable<Agence> {
        console.log('==============333333=================', agenceDetails.id);
        console.log('==============44444=================', agenceDetails);
        return this.http.put<Agence>(`${this.apiUrl}/${id}`, agenceDetails);
    }

    deleteAgence(id: number, agenceDetails: Agence): Observable<Agence> {
        console.log('==============333333=================', agenceDetails.id);
        console.log('==============44444=================', agenceDetails);
        return this.http.put<Agence>(`${this.apiUrl}/deleteAgence/${id}`, agenceDetails);
    }


    getAllAgences(): Observable<EntityArrayResponseType> {
        return this.http.get<Agence[]>(this.apiUrl, {observe: 'response'});
    }

}
