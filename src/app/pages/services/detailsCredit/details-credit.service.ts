import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EntityArrayResponseType, EntityResponseType} from "../banque/banque.service";
import {DetailsCredit} from "../../models/detailsCredit/details-credit";

@Injectable({
    providedIn: 'root'
})
export class DetailsCreditService {

    public resourceUrl = environment.api + 'detailsCredit/';
    private apiUrl = 'http://localhost:9999/api/detailsCredit';

    constructor(protected http: HttpClient) {
    }

    createDetailsCredit(detailsCredit: DetailsCredit): Observable<EntityResponseType> {
        console.log("____________________________________________")
        console.log(detailsCredit)
        return this.http.post<DetailsCredit>(this.apiUrl, detailsCredit, {observe: 'response'});
        console.log("___________ FIN DETAILSCREDIT______________________________")
    }


    updateDetailsCredit(id: number, detailsCreditDetails: DetailsCredit): Observable<DetailsCredit> {
        console.log('==============333333=================', detailsCreditDetails.id);
        console.log('==============44444=================', detailsCreditDetails);
        return this.http.put<DetailsCredit>(`${this.apiUrl}/${id}`, detailsCreditDetails);
    }

    deleteDetailsCredit(id: number, detailsCreditDetails: DetailsCredit): Observable<DetailsCredit> {
        console.log('==============333333=================', detailsCreditDetails.id);
        console.log('==============44444=================', detailsCreditDetails);
        return this.http.put<DetailsCredit>(`${this.apiUrl}/deleteDetailsCredit/${id}`, detailsCreditDetails);
    }


    getAllDetailsCredits(): Observable<EntityArrayResponseType> {
        return this.http.get<DetailsCredit[]>(this.apiUrl, {observe: 'response'});
    }

}
