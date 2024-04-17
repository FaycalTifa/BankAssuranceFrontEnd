import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {ConfirmationService, MessageService} from "primeng/api";
import {KeycloakService} from "keycloak-angular";
import {HttpResponse} from "@angular/common/http";
import {InformationEmploi} from "../../models/informationEmploi/information-emploi";
import {InformationEmploiService} from "../../services/informationEmploi/information-emploi.service";
import {Civilite} from '../../models/civilite/civilite';

@Component({
    selector: 'app-information-emploi',
    templateUrl: './information-emploi.component.html',
    styleUrls: ['./information-emploi.component.scss']
})
export class InformationEmploiComponent implements OnInit {

    loading = false;
    @ViewChild('dt') table: Table;
    @ViewChild('filter') filter: ElementRef;
    informationEmplois?: InformationEmploi[];
    displayDialogue: boolean;
    displayDialogueModification: boolean;
    displayDialogueDetail: boolean;
    informationEmploi: InformationEmploi = new InformationEmploi();
    keycloakUser = '';
    userRole: string[] = [];
    serviceId: number;

    constructor(
        private messageService: MessageService,
        protected informationEmploiService: InformationEmploiService,
        protected keycloakService: KeycloakService,
        private confirmationService: ConfirmationService) {
    }

    ngOnInit(): void {
        this.informationEmploi = new InformationEmploi();
        this.getAllInformationEmplois();
        // this.toInitFunctions();
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }


    getAllInformationEmplois(): void {
        this.informationEmploiService.getAllInformationEmplois().subscribe((res: HttpResponse<InformationEmploi[]>) => {
            const data = res.body ?? [];
            this.informationEmplois = data;
        });
    }


    successAlert(): void {
        this.messageService.add({severity: 'success', summary: 'Opération réussie!'});
    }

    onDisplayDialogue(informationEmploi: InformationEmploi): void {
        this.informationEmploi = new InformationEmploi(); // Réinitialise le modèle du formulaire
        this.displayDialogue = true;
    }

    onDisplayDialoguDetail(informationEmploi: InformationEmploi) {
        this.informationEmploi = informationEmploi;
        this.displayDialogueDetail = true;
    }


    onDisplayDialogueModif(id: number, informationEmploiDetails: InformationEmploi): void {
        this.informationEmploi.id = id;
        this.informationEmploi = informationEmploiDetails;
        console.log('-----onDisplayDialogueModif-------', this.informationEmploi.id, this.informationEmploi.employeur, this.informationEmploi.employeur);
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

    onSave(informationEmploi1: InformationEmploi): void {
        console.log("++++++++++++++++++++++++++++++++++++++++++++")
        console.log(informationEmploi1)
        console.log("++++++++++++++++++++++++++++++++++++++++++++")
        informationEmploi1.id = this.serviceId;
        this.informationEmploiService.createInformationEmploi(informationEmploi1).subscribe(
            resp => {
                console.log("============================================")
                console.log(resp)
                console.log("============================================")
                if (resp) {
                    //    this.detailsCredit = new Service();
                    this.onHidenDialogue();
                    this.successAlert();
                    this.getAllInformationEmplois();
                }
            },
            error => {
                console.error('Erreur lors de la création de information', error);
            }
        );
    }

    updateInformationEmploi(id: number, informationEmploiDetails: InformationEmploi): void {
        console.log('==============1111111111111=================', informationEmploiDetails.id);
        console.log('==============2222222=================', informationEmploiDetails);
        this.onDisplayDialogueModif(id, informationEmploiDetails);
        this.informationEmploiService.updateInformationEmploi(id, informationEmploiDetails).subscribe(
            response => {
                console.log('============= id updateInformationEmploi ==================', informationEmploiDetails.id);
                console.log('Service mise à jour avec succès', response);
                this.successAlert();
                this.getAllInformationEmplois();
            },
            error => {
                console.error('Erreur lors de la mise à jour de information emploi:', error);
            }
        );
        this.onHidenDialogueModif();
    }


    deleteInformationEmploi(id: number, informationEmploiDetails: InformationEmploi): void {
        this.confirmationService.confirm(
            {
                target: event.target,
                message: 'Êtes-vous sûr de vouloir supprimer ' + informationEmploiDetails.employeur + ' ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    // Si l'utilisateur clique sur 'Oui', la mise à jour est exécutée
                    this.onDisplayDialogueModif(id, informationEmploiDetails);
                    this.informationEmploiService.deleteInformationEmploi(id, informationEmploiDetails).subscribe(
                        response => {
                            console.log('Service mise à jour avec succès', response);
                            this.successAlert();
                            this.getAllInformationEmplois();
                        },
                        error => {
                            console.error('Erreur lors de la suppression du information emploi:', error);
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
