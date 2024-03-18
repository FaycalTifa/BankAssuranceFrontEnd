import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Agence} from "../../models/agence/agence";
import {Observable} from "rxjs";
import {EntityArrayResponseType, EntityResponseType} from "../banque/banque.service";
import {Gestionnaire} from "../../models/gestionnaire/gestionnaire";

@Injectable({
    providedIn: 'root'
})
export class GestionnaireService {

    private apiUrl = 'http://localhost:9999/api/gestionnaire';

    constructor(protected http: HttpClient) {
    }

    createGestionnaire(gestionnaire: Gestionnaire): Observable<EntityResponseType> {
        console.log("============ SERVICE GESTIONNAIRE ================", gestionnaire)
        return this.http.post<Gestionnaire>(this.apiUrl, gestionnaire, {observe: 'response'});
    }


    updateGestionnaire(id: number, gestionnaireDetails: Gestionnaire): Observable<Gestionnaire> {
        console.log('==============333333=================', gestionnaireDetails.id);
        console.log('==============44444=================', gestionnaireDetails);
        return this.http.put<Gestionnaire>(`${this.apiUrl}/${id}`, gestionnaireDetails);
    }

    deleteGestionnaire(id: number, gestionnaireDetails: Gestionnaire): Observable<Gestionnaire> {
        console.log('==============333333=================', gestionnaireDetails.id);
        console.log('==============44444=================', gestionnaireDetails);
        return this.http.put<Gestionnaire>(`${this.apiUrl}/deleteGestionnaire/${id}`, gestionnaireDetails);
    }


    getAllGestionnaires(): Observable<EntityArrayResponseType> {
        return this.http.get<Gestionnaire[]>(this.apiUrl, {observe: 'response'});
    }

}
