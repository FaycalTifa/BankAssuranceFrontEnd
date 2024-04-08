import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {TypeContrat} from '../../models/typeContrat/type-contrat';
import {Observable} from 'rxjs';
import {EntityArrayResponseType, EntityResponseType} from '../banque/banque.service';

@Injectable({
  providedIn: 'root'
})
export class TypeContratService {

  public resourceUrl = environment.api + 'typeContrat/';
  private apiUrl = 'http://localhost:9999/api/typeContrat';

  constructor(protected http: HttpClient) {
  }

  createTypeContrat(typeContrat: TypeContrat): Observable<EntityResponseType> {
    return this.http.post<TypeContrat>(this.apiUrl, typeContrat, {observe: 'response'});
  }

  updateTypeContrat(id: number, typeContratDetails: TypeContrat): Observable<TypeContrat> {
    console.log('==============333333=================', typeContratDetails.id);
    console.log('==============44444=================', typeContratDetails);
    return this.http.put<TypeContrat>(`${this.apiUrl}/${id}`, typeContratDetails);
  }

  deleteTypeContrat(id: number, typeContratDetails: TypeContrat): Observable<TypeContrat> {
    console.log('==============333333=================', typeContratDetails.id);
    console.log('==============44444=================', typeContratDetails);
    return this.http.put<TypeContrat>(`${this.apiUrl}/deleteTypeContrat/${id}`, typeContratDetails);
  }


  getAllTypeContrats(): Observable<EntityArrayResponseType> {
    return this.http.get<TypeContrat[]>(this.apiUrl, {observe: 'response'});
  }
}
