import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EntityArrayResponseType, EntityResponseType} from "../banque/banque.service";
import {Personne} from "../../models/personne/personne";
import {Banque} from "../../models/banque/banque";

@Injectable({
  providedIn: 'root'
})
export class PersonneService {

  public resourceUrl = environment.api + 'personne/';
  private apiUrl = 'http://localhost:9999/api/personne';
  constructor(protected http: HttpClient) {}

  createPersonne(personne: Personne): Observable<EntityResponseType> {
        console.log("____________________________________________")
        console.log(personne)
    return this.http.post<Personne>(this.apiUrl , personne, { observe: 'response' });
      console.log("___________ FIN PERSONNE ______________________________")

  }
    createPoste(banque: Banque): Observable<EntityResponseType> {
        return this.http.post<Banque>(this.apiUrl , banque, { observe: 'response' });
    }

  updatePersonne(id: number, personneDetails: Personne): Observable<Personne> {
    console.log('==============333333=================',personneDetails);
    return this.http.put<Personne>(`${this.apiUrl}/${id}`, personneDetails);
  }

  deletePersonne(id: number, personneDetails: Personne): Observable<Personne> {
    console.log('==============333333=================', personneDetails.id);
    console.log('==============44444=================', personneDetails);
    return this.http.put<Personne>(`${this.apiUrl}/deletePersonne/${id}`, personneDetails);
  }



  getAllPersonnes(): Observable<EntityArrayResponseType> {
    return this.http.get<Personne[]>(this.apiUrl, {  observe: 'response' });
  }

}

