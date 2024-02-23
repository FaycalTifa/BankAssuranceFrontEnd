import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EntityArrayResponseType, EntityResponseType} from "../banque/banque.service";
import {Mandataire} from "../../models/mandataire/mandataire";
import {Personne} from "../../models/personne/personne";

@Injectable({
  providedIn: 'root'
})
export class MandataireService {

  public resourceUrl = environment.api + 'mandataire/';
  private apiUrl = 'http://localhost:9999/api/mandataire';
  constructor(protected http: HttpClient) {}

  createMandataire(mandataire: Mandataire): Observable<EntityResponseType> {
    console.log("____________________________________________")
    console.log(mandataire)
    return this.http.post<Mandataire>(this.apiUrl , mandataire, { observe: 'response' });
    console.log("___________ FIN MANDATAIRE ______________________________")
  }
  updateMandataire(id: number, mandataireDetails: Mandataire): Observable<Mandataire> {
    console.log('==============44444=================', mandataireDetails);
    return this.http.put<Mandataire>(`${this.apiUrl}/${id}`, mandataireDetails);
  }

  deleteMandataire(id: number, mandataireDetails: Mandataire): Observable<Mandataire> {
    console.log('==============333333=================', mandataireDetails.id);
    console.log('==============44444=================', mandataireDetails);
    return this.http.put<Mandataire>(`${this.apiUrl}/deleteMandataire/${id}`, mandataireDetails);
  }



  getAllMandataires(): Observable<EntityArrayResponseType> {
    return this.http.get<Mandataire[]>(this.apiUrl, {  observe: 'response' });
  }
}
