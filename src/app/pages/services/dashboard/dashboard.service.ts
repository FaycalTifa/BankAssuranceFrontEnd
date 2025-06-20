import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EntityArrayResponseType} from "../banque/banque.service";
import {Civilite} from "../../models/civilite/civilite";
import {Statistique} from "../../models/souscription/souscription";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
    public resourceUrl = environment.api + 'dashboard/';
    private apiUrl = 'http://localhost:9999/api/dashboard';

  constructor(protected http: HttpClient) { }

    getParGestionnaire(): Observable<Statistique[]> {
        return this.http.get<Statistique[]>(`${this.apiUrl}/gestionnaires`);
    }

    getParAgence(): Observable<Statistique[]> {
        return this.http.get<Statistique[]>(`${this.apiUrl}/agences`);
    }

    getParBanque(): Observable<Statistique[]> {
        return this.http.get<Statistique[]>(`${this.apiUrl}/banques`);
    }

    getSouscriptionsParDate(): Observable<Statistique[]> {
        return this.http.get<Statistique[]>(`${this.apiUrl}/souscriptions-par-date`);
    }
    getSouscriptionsParDateFiltre(startDate: string, endDate: string): Observable<Statistique[]> {
        return this.http.get<Statistique[]>(`${this.apiUrl}/souscriptions-par-date-filtre?start=${startDate}&end=${endDate}`);
    }

    getSouscriptionsParBanqueTest(idBanque: number) {
        return this.http.get<Statistique[]>(`${this.apiUrl}/liste-banques/${idBanque}`);
    }
    getListeBanques(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/liste-banques`);
    }

    getSouscriptionsParBanque(idBanque: number): Observable<Statistique[]> {
        return this.http.get<Statistique[]>(`${this.apiUrl}/banqueFiltre/${idBanque}`);
    }



}
