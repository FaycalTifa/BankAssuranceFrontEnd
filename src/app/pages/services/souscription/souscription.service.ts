import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Souscription} from "../../models/souscription/souscription";
import {KeycloakService} from "keycloak-angular";


export type EntityResponseType = HttpResponse<Souscription>;
export type EntityArrayResponseType = HttpResponse<Souscription[]>;

@Injectable({
    providedIn: 'root'
})
export class SouscriptionService {

    private apiUrl = 'http://localhost:9999/api/souscription';
    constructor(protected http: HttpClient,
                private keycloakService: KeycloakService) {
    }

    private getAuthHeaders(): HttpHeaders {
        const token = this.keycloakService.getToken();
        return new HttpHeaders({
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        });
    }


    createSouscription2(souscription: Souscription): Observable<EntityResponseType> {
        console.log('============ SERVICE SOUSCRPTION SAVE ================', souscription);
        return this.http.post<Souscription>(this.apiUrl, souscription, {observe: 'response'});
    }

    createSouscription(souscription: Souscription): Observable<EntityResponseType> {
        console.log('============ SERVICE SOUSCRIPTION SAVE ================', souscription);
        const token = localStorage.getItem('access_token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post<Souscription>(this.apiUrl, souscription, {
            headers,
            observe: 'response'
        });
    }


    getAllSouscriptionIsSuperieurFalse(): Observable<EntityArrayResponseType> {
        console.log('============ SERVICE SOUSCRPTION ================');
        return this.http.get<Souscription[]>(`${this.apiUrl}/findAllByIsSuperieurFalse`, {observe: 'response'});
    }

    getAllSouscriptionIsSuperieurTrue(): Observable<EntityArrayResponseType> {
        console.log('============ SERVICE SOUSCRPTION ================');
        return this.http.get<Souscription[]>(`${this.apiUrl}/findAllByIsSuperieurTrue`, {observe: 'response'});
    }

    updateSouscription(id: number, souscription: Souscription): Observable<Souscription> {
        console.log('============== SERVICE 333333 isSupeireur=================', souscription.isCuperieur);
        console.log('============== SERVICE 44444=================', souscription);
        return this.http.put<Souscription>(`${this.apiUrl}/${id}`, souscription);
    }

    getSouscriptionsParDate(startDate: string, endDate: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/by-date?start=${startDate}&end=${endDate}`);
    }



}
