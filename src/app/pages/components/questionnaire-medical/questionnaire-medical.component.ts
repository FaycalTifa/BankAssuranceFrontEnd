import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {ConfirmationService, MessageService} from "primeng/api";
import {KeycloakService} from "keycloak-angular";
import {HttpResponse} from "@angular/common/http";
import {QuestionnaireMedical} from "../../models/questionnaireMedical/questionnaire-medical";
import {QuestionnaireMedicalService} from "../../services/questionnaireMedical/questionnaire-medical.service";
import {Civilite} from '../../models/civilite/civilite';

@Component({
    selector: 'app-questionnaire-medical',
    templateUrl: './questionnaire-medical.component.html',
    styleUrls: ['./questionnaire-medical.component.scss']
})
export class QuestionnaireMedicalComponent implements OnInit {

    loading = false;
    @ViewChild('dt') table: Table;
    @ViewChild('filter') filter: ElementRef;
    questionnaireMedicals?: QuestionnaireMedical[];
    displayDialogue: boolean;
    displayDialogueModification: boolean;
    displayDialogueDetail: boolean;
    questionnaireMedical: QuestionnaireMedical = new QuestionnaireMedical();
    keycloakUser = '';
    userRole: string[] = [];
    serviceId: number;

    constructor(
        private messageService: MessageService,
        protected questionnaireMedicalService: QuestionnaireMedicalService,
        protected keycloakService: KeycloakService,
        private confirmationService: ConfirmationService) {
    }

    ngOnInit(): void {
        this.questionnaireMedical = new QuestionnaireMedical();
        this.getAllQuestionnaireMedicals();
        // this.toInitFunctions();
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }


    getAllQuestionnaireMedicals(): void {
        this.questionnaireMedicalService.getAllQuestionnaireMedicals().subscribe((res: HttpResponse<QuestionnaireMedical[]>) => {
            const data = res.body ?? [];
            this.questionnaireMedicals = data;
        });
    }


    successAlert(): void {
        this.messageService.add({severity: 'success', summary: 'Opération réussie!'});
    }

    onDisplayDialogue(questionnaireMedical: QuestionnaireMedical): void {
        this.questionnaireMedical = new QuestionnaireMedical(); // Réinitialise le modèle du formulaire
        this.displayDialogue = true;
    }

    onDisplayDialoguDetail(questionnaireMedical: QuestionnaireMedical) {
        this.questionnaireMedical = questionnaireMedical;
        this.displayDialogueDetail = true;
    }


    onDisplayDialogueModif(id: number, questionnaireMedicalDetails: QuestionnaireMedical): void {
        this.questionnaireMedical.id = id;
        this.questionnaireMedical = questionnaireMedicalDetails;
        console.log('-----onDisplayDialogueModif-------', this.questionnaireMedical.id, this.questionnaireMedical.question1, this.questionnaireMedical.question2, this.questionnaireMedical.question3, this.questionnaireMedical.question4, this.questionnaireMedical.detail1);
        this.displayDialogueModification = true;
    }

    onHidenDialogue(): void {
        this.displayDialogue = false;
        this.displayDialogueModification = false;
        this.displayDialogueDetail = false;
    }

    onHidenDialogueModif(): void {
        this.displayDialogueModification = false;
    }

    onSave(questionnaireMedical1: QuestionnaireMedical): void {
        questionnaireMedical1.id = this.serviceId;
        this.questionnaireMedicalService.createQuestionnaireMedical(questionnaireMedical1).subscribe(
            resp => {
                if (resp) {
                    //    this.questionnaireMedical = new Service();
                    this.onHidenDialogue();
                    this.successAlert();
                    this.getAllQuestionnaireMedicals();
                }
            },
            error => {
                console.error('Erreur lors de la création du questionnaire', error);
            }
        );
    }

    updateQuestionnaireMedical(id: number, questionnaireMedicalDetails: QuestionnaireMedical): void {
        console.log('==============1111111111111=================', questionnaireMedicalDetails.id);
        console.log('==============2222222=================', questionnaireMedicalDetails);
        this.onDisplayDialogueModif(id, questionnaireMedicalDetails);
        this.questionnaireMedicalService.updateQuestionnaireMedical(id, questionnaireMedicalDetails).subscribe(
            response => {
                console.log('============= id updateQuestionnaireMedical ==================', questionnaireMedicalDetails.id);
                console.log('Service mise à jour avec succès', response);
                this.successAlert();
                this.getAllQuestionnaireMedicals();
            },
            error => {
                console.error('Erreur lors de la mise à jour du questionnaire:', error);
            }
        );
        this.onHidenDialogueModif();
    }


    deleteQuestionnaireMedical(id: number, questionnaireMedicalDetails: QuestionnaireMedical): void {
        this.confirmationService.confirm(
            {
                target: event.target,
                message: 'Êtes-vous sûr de vouloir supprimer ' + questionnaireMedicalDetails.question1 + questionnaireMedicalDetails.question2 + questionnaireMedicalDetails.question3 + questionnaireMedicalDetails.question4 + questionnaireMedicalDetails.detail1 + ' ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    // Si l'utilisateur clique sur 'Oui', la mise à jour est exécutée
                    this.onDisplayDialogueModif(id, questionnaireMedicalDetails);
                    this.questionnaireMedicalService.deleteQuestionnaireMedical(id, questionnaireMedicalDetails).subscribe(
                        response => {
                            console.log('Service mise à jour avec succès', response);
                            this.successAlert();
                            this.getAllQuestionnaireMedicals();
                        },
                        error => {
                            console.error('Erreur lors de la suppression du questionnaire:', error);
                        }
                    );
                    this.onHidenDialogueModif();
                },
                reject: () => {
                    // Si l'utilisateur clique sur 'Non' ou ferme la fenêtre, rien ne se passe.
                    // Vous pouvez également ajouter un code ici si nécessaire.
                }
            });
    }


}
