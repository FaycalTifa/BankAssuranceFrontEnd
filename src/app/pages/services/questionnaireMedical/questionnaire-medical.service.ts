import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EntityArrayResponseType, EntityResponseType} from "../banque/banque.service";
import {QuestionnaireMedical} from "../../models/questionnaireMedical/questionnaire-medical";

@Injectable({
    providedIn: 'root'
})
export class QuestionnaireMedicalService {

    public resourceUrl = environment.api + 'questionnaireMedical/';
    private apiUrl = 'http://localhost:9999/api/questionnaireMedical';

    constructor(protected http: HttpClient) {
    }

    createQuestionnaireMedical(questionnaireMedical: QuestionnaireMedical): Observable<EntityResponseType> {
        return this.http.post<QuestionnaireMedical>(this.apiUrl, questionnaireMedical, {observe: 'response'});
    }


    updateQuestionnaireMedical(id: number, questionnaireMedicalDetails: QuestionnaireMedical): Observable<QuestionnaireMedical> {
        console.log('==============333333=================', questionnaireMedicalDetails.id);
        console.log('==============44444=================', questionnaireMedicalDetails);
        return this.http.put<QuestionnaireMedical>(`${this.apiUrl}/${id}`, questionnaireMedicalDetails);
    }

    deleteQuestionnaireMedical(id: number, questionnaieMedicalDetails: QuestionnaireMedical): Observable<QuestionnaireMedical> {
        console.log('==============333333=================', questionnaieMedicalDetails.id);
        console.log('==============44444=================', questionnaieMedicalDetails);
        return this.http.put<QuestionnaireMedical>(`${this.apiUrl}/deleteQuestionnaireMedical/${id}`, questionnaieMedicalDetails);
    }


    getAllQuestionnaireMedicals(): Observable<EntityArrayResponseType> {
        return this.http.get<QuestionnaireMedical[]>(this.apiUrl, {observe: 'response'});
    }

}

