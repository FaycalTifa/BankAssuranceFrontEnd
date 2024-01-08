import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Table} from 'primeng/table';
import { Banque} from '../../models/banque/banque';
import {ConfirmationService, MessageService} from 'primeng/api';
import {BanqueService} from '../../services/banque/banque.service';
import {HttpResponse} from '@angular/common/http';
import {KeycloakService} from 'keycloak-angular';

@Component({
    selector: 'app-poste',
    templateUrl: './banque.component.html',
    styleUrls: ['./banque.component.scss']
})
export class BanqueComponent implements OnInit {
    loading = false;
    @ViewChild('dt') table: Table;
    @ViewChild('filter') filter: ElementRef;
    banques?: Banque[];
    displayDialogue: boolean;
    displayDialogueModification: boolean;
    banque: Banque = new Banque();
    keycloakUser = '';
    userRole: string[] = [];
    serviceId: number;

    constructor(
        private messageService: MessageService,
        protected banqueService: BanqueService,
        protected keycloakService: KeycloakService,
        private confirmationService: ConfirmationService) {
    }

    ngOnInit(): void {
        this.banque = new Banque();
        this.getAllBanques();
        // this.toInitFunctions();
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }


    getAllBanques(): void {
        this.banqueService.getAllPostes().subscribe((res: HttpResponse<Banque[]>) => {
            const data = res.body ?? [];
            this.banques = data;
        });
    }


    successAlert(): void {
        this.messageService.add({severity: 'success', summary: 'Opération réussie!'});
    }

    onDisplayDialogue(poste: Banque): void {
        this.banque = new Banque(); // Réinitialise le modèle du formulaire
        this.displayDialogue = true;
    }

    onDisplayDialogueModif(id: number, banqueDetails: Banque): void {
        this.banque.id = id;
        this.banque = banqueDetails;
        console.log('-----onDisplayDialogueModif-------', this.banque.id, this.banque.libelle, this.banque.libelle);
        this.displayDialogueModification = true;
    }

    onHidenDialogue(): void {
        this.displayDialogue = false;
        this.displayDialogueModification = false;
    }

    onHidenDialogueModif(): void {
        this.displayDialogueModification = false;
    }

    updateBanque(id: number, banqueDetails: Banque): void {
        console.log('==============1111111111111=================', banqueDetails.id);
        console.log('==============2222222=================', banqueDetails);
        this.onDisplayDialogueModif(id, banqueDetails);
        this.banqueService.updatePoste(id, banqueDetails).subscribe(
            response => {
                console.log('============= id updateBanque ==================', banqueDetails.id);
                console.log('Service mise à jour avec succès', response);
                this.successAlert();
                this.getAllBanques();
            },
            error => {
                console.error('Erreur lors de la mise à jour de la banque:', error);
            }
        );
        this.onHidenDialogueModif();
    }


    deleteBanque(id: number, banqueDetails: Banque): void {
        this.confirmationService.confirm(
            {
                target: event.target,
                message: 'Êtes-vous sûr de vouloir supprimer ' + banqueDetails.libelle + ' ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                // Si l'utilisateur clique sur 'Oui', la mise à jour est exécutée
                this.onDisplayDialogueModif(id, banqueDetails);
                this.banqueService.deleteBanque(id, banqueDetails).subscribe(
                    response => {
                        console.log('Service mise à jour avec succès', response);
                        this.successAlert();
                        this.getAllBanques();
                    },
                    error => {
                        console.error('Erreur lors de la suppression de la banque:', error);
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


    onSave(banque1: Banque): void {
        banque1.id = this.serviceId;
        this.banqueService.createPoste(banque1).subscribe(
            resp => {
                if (resp) {
                    //    this.poste = new Service();
                    this.onHidenDialogue();
                    this.successAlert();
                    this.getAllBanques();
                }
            },
            error => {
                console.error('Erreur lors de la création du poste', error);
            }
        );
    }


}
