import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Souscription} from "../../models/souscription/souscription";


export type EntityResponseType = HttpResponse<Souscription>;
export type EntityArrayResponseType = HttpResponse<Souscription[]>;

@Injectable({
    providedIn: 'root'
})
export class SouscriptionService {

    private apiUrl = 'http://localhost:9999/api/souscription';

    constructor(protected http: HttpClient) {
    }


    createSouscription(souscription: Souscription): Observable<EntityResponseType> {
        console.log("============ SERVICE SOUSCRPTION SAVE ================", souscription)
        return this.http.post<Souscription>(this.apiUrl, souscription, {observe: 'response'});
    }


    getAllSouscriptionIsSuperieurFalse(): Observable<EntityArrayResponseType> {
        console.log("============ SERVICE SOUSCRPTION ================")
        return this.http.get<Souscription[]>(`${this.apiUrl}/findAllByIsSuperieurFalse`, {observe: 'response'});
    }

    getAllSouscriptionIsSuperieurTrue(): Observable<EntityArrayResponseType> {
        console.log("============ SERVICE SOUSCRPTION ================")
        return this.http.get<Souscription[]>(`${this.apiUrl}/findAllByIsSuperieurTrue`, {observe: 'response'});
    }

    updateSouscription(id: number, souscription: Souscription): Observable<Souscription> {
        console.log('============== SERVICE 333333 isSupeireur=================', souscription.isCuperieur);
        console.log('============== SERVICE 44444=================', souscription);
        return this.http.put<Souscription>(`${this.apiUrl}/${id}`, souscription);
    }


}
