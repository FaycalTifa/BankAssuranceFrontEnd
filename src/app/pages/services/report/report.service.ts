import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Banque} from "../../models/banque/banque";
import {Souscription} from "../../models/souscription/souscription";

@Injectable({
  providedIn: 'root'
})
export class ReportService {
    public resourceUrl = environment.api + 'civilite/';
    private apiUrl = 'http://localhost:9999/api/report';

    constructor(protected http: HttpClient) {
    }


    generatePdfReport(id: number): Observable<HttpResponse<Blob>> {
        const url = `http://localhost:9999/api/report/${id}/pdf`;
        return this.http.get(url, {
            responseType: 'blob', // Le type de réponse est un Blob (fichier)
            observe: 'response' // Permet de récupérer l'ensemble de la réponse HTTP
        });
    }

    findById(id: number): Observable<Souscription> {
        console.log('333333333333333 id report 33333333333333', id)
        return this.http.get<Souscription>(`${this.apiUrl}/${id}/pdf`);
    }
}
