import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IPoste} from '../../models/poste/poste';

export type EntityResponseType = HttpResponse<IPoste>;
export type EntityArrayResponseType = HttpResponse<IPoste[]>;


@Injectable({
  providedIn: 'root'
})
export class PosteService {
  public resourceUrl = environment.api + 'banque/';
  private apiUrl = 'http://localhost:9999/api/banque/';
  constructor(protected http: HttpClient) {}

  createPoste(poste: IPoste): Observable<EntityResponseType> {
    return this.http.post<IPoste>(this.apiUrl , poste, { observe: 'response' });
  }

  deleted(banqueId: number): Observable<EntityResponseType> {
    const url = `${this.apiUrl}deleted/${banqueId}`;
    return this.http.put<IPoste>(url, null, { observe: 'response' });
  }
  updatePoste(id: number, poste: IPoste): Observable<EntityResponseType> {
    console.log('=============SERVICE==================', id);
    return this.http.put<IPoste>(
        `${this.apiUrl}update/${id}`, poste, { observe: 'response' }
    );
  }
  getAllPostes(): Observable<EntityArrayResponseType> {
    return this.http.get<IPoste[]>(this.apiUrl, {  observe: 'response' });
  }
  deletePoste(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
