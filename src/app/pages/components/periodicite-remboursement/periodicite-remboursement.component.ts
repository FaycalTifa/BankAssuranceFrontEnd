import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Table} from 'primeng/table';
import {Banque} from '../../models/banque/banque';
import {IService} from '../../models/service/service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {BanqueService} from '../../services/banque/banque.service';
import {ServiceService} from '../../services/service/service.service';
import {KeycloakService} from 'keycloak-angular';
import {HttpResponse} from '@angular/common/http';
import {
    PeriodiciteRemboursementService
} from '../../services/periodiciteRemboursement/periodicite-remboursement.service';
import {PeriodiciteRemboursement, Souscription} from "../../models/souscription/souscription";


@Component({
    selector: 'app-periodicite-remboursement',
    templateUrl: './periodicite-remboursement.component.html',
    styleUrls: ['./periodicite-remboursement.component.scss']
})
export class PeriodiciteRemboursementComponent implements OnInit {
    loading = false;
    @ViewChild('dt') table: Table;
    @ViewChild('filter') filter: ElementRef;
    periodiciteRemboursements?: PeriodiciteRemboursement[];
    services?: IService[];
    displayDialogue: boolean;
    displayDialogueModification: boolean;
    displayDialogueDetail: boolean;

   // periodiciteRemboursement: PeriodiciteRemboursement = new Banque();

    keycloakUser = '';
    userRole: string[] = [];
    serviceId: number;
    periodiciteRemboursement: PeriodiciteRemboursement ={
        isDeleted: false,
        code: '',
        libelle: '',
}


constructor(private messageService: MessageService,
                protected periodiciteRemboursementService: PeriodiciteRemboursementService,
                protected serviceService: ServiceService,
                protected keycloakService: KeycloakService,
                private confirmationService: ConfirmationService) {
    }

    ngOnInit(): void {
      //  this.periodiciteRemboursement = new PeriodiciteRemboursement();
        this.getAllPeriodiciteRemboursements();
        // this.toInitFunctions();
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }


    getAllPeriodiciteRemboursements(): void {
        this.periodiciteRemboursementService.getAllPeriodiciteRemboursements().subscribe((res: HttpResponse<PeriodiciteRemboursement[]>) => {
            const data = res.body ?? [];
            this.periodiciteRemboursements = data;
        });
    }


    successAlert(): void {
        this.messageService.add({severity: 'success', summary: 'Opération réussie!'});
    }

    onDisplayDialogue(periodiciteRemboursemernt: PeriodiciteRemboursement): void {
        this.periodiciteRemboursement = new class implements PeriodiciteRemboursement {
            code: string;
            id: number;
            isDeleted: boolean;
            libelle: string;
        }(); // Réinitialise le modèle du formulaire
        this.displayDialogue = true;
    }

    onDisplayDialoguDetail(periodiciteRemboursement: PeriodiciteRemboursement) {
        this.periodiciteRemboursement = periodiciteRemboursement;
        this.displayDialogueDetail = true;
    }

    onDisplayDialogueModif(id: number, periodiciteRemboursementDetails: PeriodiciteRemboursement): void {
        this.periodiciteRemboursement.id = id;
        this.periodiciteRemboursement = periodiciteRemboursementDetails;
        // tslint:disable-next-line:max-line-length
        console.log('-----onDisplayDialogueModif-------', this.periodiciteRemboursement.id, this.periodiciteRemboursement.libelle, this.periodiciteRemboursement.libelle);
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

    updatePeriodiciteRemboursement(id: number, periodiciteRemboursementDetails: PeriodiciteRemboursement): void {
        console.log('==============1111111111111=================', periodiciteRemboursementDetails.id);
        console.log('==============2222222=================', periodiciteRemboursementDetails);
        this.onDisplayDialogueModif(id, periodiciteRemboursementDetails);
        this.periodiciteRemboursementService.updatePeriodiciteRemboursement(id, periodiciteRemboursementDetails).subscribe(
            response => {
                console.log('============= id updatePeriodiciteRemboursement ==================', periodiciteRemboursementDetails.id);
                console.log('Service mise à jour avec succès', response);
                this.successAlert();
                this.getAllPeriodiciteRemboursements();
            },
            error => {
                console.error('Erreur lors de la mise à jour de la periodicite:', error);
            }
        );
        this.onHidenDialogueModif();
    }


    deletePeriodiciteRemboursement(id: number, periodiciteRemboursementDetails: PeriodiciteRemboursement): void {
        this.confirmationService.confirm(
            {
                target: event.target,
                message: 'Êtes-vous sûr de vouloir supprimer ' + periodiciteRemboursementDetails.libelle + ' ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    // Si l'utilisateur clique sur 'Oui', la mise à jour est exécutée
                    this.onDisplayDialogueModif(id, periodiciteRemboursementDetails);
                    this.periodiciteRemboursementService.deletePeriodiciteRemboursement(id, periodiciteRemboursementDetails).subscribe(
                        response => {
                            console.log('Service mise à jour avec succès', response);
                            this.successAlert();
                            this.getAllPeriodiciteRemboursements();
                        },
                        error => {
                            console.error('Erreur lors de la suppression de la periodiciteRemboursement:', error);
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


    onSave(periodiciteRemboursement1: PeriodiciteRemboursement): void {
        periodiciteRemboursement1.id = this.serviceId;
        this.periodiciteRemboursementService.createPeriodiciteRemboursement(periodiciteRemboursement1).subscribe(
            resp => {
                if (resp) {
                    //    this.periodiciteRemboursement = new Service();
                    this.onHidenDialogue();
                    this.successAlert();
                    this.getAllPeriodiciteRemboursements();
                }
            },
            error => {
                console.error('Erreur lors de la création du periodicieRemboursement', error);
            }
        );
    }
}

