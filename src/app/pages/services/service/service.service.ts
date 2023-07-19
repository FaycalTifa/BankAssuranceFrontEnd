import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {getServiceIdentifier, IService} from "../../models/service/service";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";

export type EntityResponseType = HttpResponse<IService>;
export type EntityArrayResponseType = HttpResponse<IService[]>;

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  public resourceUrl = environment.api + 'banque';
  constructor(protected http: HttpClient) {}

  createService(service: IService): Observable<EntityResponseType> {
    return this.http.post<IService>(this.resourceUrl, service, { observe: 'response' });
  }
  updateService(service: IService): Observable<EntityResponseType> {
    return this.http.put<IService>(
        `${this.resourceUrl}/${getServiceIdentifier(service) as number}`,
        service,
        { observe: 'response' }
    );
  }
  getAllServices(): Observable<EntityArrayResponseType> {
    return this.http.get<IService[]>(this.resourceUrl, {  observe: 'response' });
  }
  deleteService(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  sendMail(to: string, subjet: string, message: string ): Observable<any> {
    return this.http.get( this.resourceUrl + '/send-simple-mail' + to + subjet + message, { observe: 'response' });
  }
}
