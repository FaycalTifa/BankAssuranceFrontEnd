import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Civilite} from "../../models/civilite/civilite";
import {Observable} from "rxjs";
import {EntityArrayResponseType, EntityResponseType} from "../banque/banque.service";
import {Banque} from "../../models/banque/banque";
import {InformationEmploi} from "../../models/informationEmploi/information-emploi";

@Injectable({
    providedIn: 'root'
})
export class InformationEmploiService {
    public resourceUrl = environment.api + 'informationEmploi/';
    private apiUrl = 'http://localhost:9999/api/informationEmploi';

    constructor(protected http: HttpClient) {
    }

    createInformationEmploi(informationEmploi: InformationEmploi): Observable<EntityResponseType> {
        return this.http.post<InformationEmploi>(this.apiUrl, informationEmploi, {observe: 'response'});
    }

    updateInformationEmploi(id: number, informationEmploiDetails: InformationEmploi): Observable<InformationEmploi> {
        console.log('==============333333=================', informationEmploiDetails.id);
        console.log('==============44444=================', informationEmploiDetails);
        return this.http.put<InformationEmploi>(`${this.apiUrl}/${id}`, informationEmploiDetails);
    }

    deleteInformationEmploi(id: number, informationEmploiDetails: InformationEmploi): Observable<InformationEmploi> {
        console.log('==============333333=================', informationEmploiDetails.id);
        console.log('==============44444=================', informationEmploiDetails);
        return this.http.put<InformationEmploi>(`${this.apiUrl}/deleteInformationEmploi/${id}`, informationEmploiDetails);
    }


    getAllInformationEmplois(): Observable<EntityArrayResponseType> {
        return this.http.get<InformationEmploi[]>(this.apiUrl, {observe: 'response'});
    }
}
