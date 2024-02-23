import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Banque} from '../../models/banque/banque';

export type EntityResponseType = HttpResponse<Banque>;
export type EntityArrayResponseType = HttpResponse<Banque[]>;


@Injectable({
  providedIn: 'root'
})
export class BanqueService {
  public resourceUrl = environment.api + 'banque/';
  private apiUrl = 'http://localhost:9999/api/banque';
  constructor(protected http: HttpClient) {}

  createPoste(banque: Banque): Observable<EntityResponseType> {
    return this.http.post<Banque>(this.apiUrl , banque, { observe: 'response' });
  }


    updatePoste(id: number, banqueDetails: Banque): Observable<Banque> {
        console.log('==============333333=================', banqueDetails.id);
        console.log('==============44444=================', banqueDetails);
        return this.http.put<Banque>(`${this.apiUrl}/${id}`, banqueDetails);
    }

 deleteBanque(id: number, banqueDetails: Banque): Observable<Banque> {
        console.log('==============333333=================', banqueDetails.id);
        console.log('==============44444=================', banqueDetails);
        return this.http.put<Banque>(`${this.apiUrl}/deleteBanque/${id}`, banqueDetails);
    }



  getAllPostes(): Observable<EntityArrayResponseType> {
    return this.http.get<Banque[]>(this.apiUrl, {  observe: 'response' });
  }

    findById(id: number): Observable<Banque> {
        return this.http.get<Banque>(`${this.apiUrl}/${id}`);
    }

}
