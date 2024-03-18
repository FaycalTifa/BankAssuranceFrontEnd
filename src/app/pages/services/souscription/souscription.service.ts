import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Agence} from "../../models/agence/agence";
import {Observable} from "rxjs";
import {Souscription} from "../../models/souscription/souscription";
import {Banque} from "../../models/banque/banque";


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
        console.log("============ SERVICE SOUSCRPTION ================", souscription)
        return this.http.post<Souscription>(this.apiUrl, souscription, {observe: 'response'});
    }


}
