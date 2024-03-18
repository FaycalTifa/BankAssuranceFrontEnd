import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {ConfirmationService, MessageService} from "primeng/api";
import {KeycloakService} from "keycloak-angular";
import {HttpResponse} from "@angular/common/http";
import {DetailsCredit} from "../../models/detailsCredit/details-credit";
import {DetailsCreditService} from "../../services/detailsCredit/details-credit.service";

@Component({
    selector: 'app-details-credit',
    templateUrl: './details-credit.component.html',
    styleUrls: ['./details-credit.component.scss']
})
export class DetailsCreditComponent implements OnInit {

    loading = false;
    @ViewChild('dt') table: Table;
    @ViewChild('filter') filter: ElementRef;
    detailsCredits?: DetailsCredit[];
    displayDialogue: boolean;
    displayDialogueModification: boolean;
    detailsCredit: DetailsCredit = new DetailsCredit();
    keycloakUser = '';
    userRole: string[] = [];
    serviceId: number;

    constructor(
        private messageService: MessageService,
        protected detailsCreditService: DetailsCreditService,
        protected keycloakService: KeycloakService,
        private confirmationService: ConfirmationService) {
    }

    ngOnInit(): void {
        this.detailsCredit = new DetailsCredit();
        this.getAllDetailsCredits();
        // this.toInitFunctions();
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }


    getAllDetailsCredits(): void {
        this.detailsCreditService.getAllDetailsCredits().subscribe((res: HttpResponse<DetailsCredit[]>) => {
            const data = res.body ?? [];
            this.detailsCredits = data;
        });
    }


    successAlert(): void {
        this.messageService.add({severity: 'success', summary: 'Opération réussie!'});
    }

    onDisplayDialogue(detailsCredit: DetailsCredit): void {
        this.detailsCredit = new DetailsCredit(); // Réinitialise le modèle du formulaire
        this.displayDialogue = true;
    }

    onDisplayDialogueModif(id: number, detailsCreditDetails: DetailsCredit): void {
        this.detailsCredit.id = id;
        this.detailsCredit = detailsCreditDetails;
        console.log('-----onDisplayDialogueModif-------', this.detailsCredit.id, this.detailsCredit.montantCreditAssurer, this.detailsCredit.montantCreditAssurer);
        this.displayDialogueModification = true;
    }

    onHidenDialogue(): void {
        this.displayDialogue = false;
        this.displayDialogueModification = false;
    }

    onHidenDialogueModif(): void {
        this.displayDialogueModification = false;
    }

    onSave(detailsCredit1: DetailsCredit): void {
        console.log("++++++++++++++++++++++++++++++++++++++++++++")
        console.log(detailsCredit1)
        console.log("++++++++++++++++++++++++++++++++++++++++++++")
        detailsCredit1.id = this.serviceId;
        this.detailsCreditService.createDetailsCredit(detailsCredit1).subscribe(
            resp => {
                console.log("============================================")
                console.log(resp)
                console.log("============================================")
                if (resp) {
                    //    this.detailsCredit = new Service();
                    this.onHidenDialogue();
                    this.successAlert();
                    this.getAllDetailsCredits();
                }
            },
            error => {
                console.error('Erreur lors de la création du detailsCredit', error);
            }
        );
    }

    updateDetailsCredit(id: number, detailsCreditDetails: DetailsCredit): void {
        console.log('==============1111111111111=================', detailsCreditDetails.id);
        console.log('==============2222222=================', detailsCreditDetails);
        this.onDisplayDialogueModif(id, detailsCreditDetails);
        this.detailsCreditService.updateDetailsCredit(id, detailsCreditDetails).subscribe(
            response => {
                console.log('============= id updateDetailsCredit ==================', detailsCreditDetails.id);
                console.log('Service mise à jour avec succès', response);
                this.successAlert();
                this.getAllDetailsCredits();
            },
            error => {
                console.error('Erreur lors de la mise à jour du detailsCredit:', error);
            }
        );
        this.onHidenDialogueModif();
    }


    deleteDetailsCredit(id: number, detailsCreditDetails: DetailsCredit): void {
        this.confirmationService.confirm(
            {
                target: event.target,
                message: 'Êtes-vous sûr de vouloir supprimer ' + detailsCreditDetails.montantCreditAssurer + ' ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    // Si l'utilisateur clique sur 'Oui', la mise à jour est exécutée
                    this.onDisplayDialogueModif(id, detailsCreditDetails);
                    this.detailsCreditService.deleteDetailsCredit(id, detailsCreditDetails).subscribe(
                        response => {
                            console.log('Service mise à jour avec succès', response);
                            this.successAlert();
                            this.getAllDetailsCredits();
                        },
                        error => {
                            console.error('Erreur lors de la suppression du detailsCredit:', error);
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
