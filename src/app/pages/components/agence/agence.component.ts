import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {Banque} from "../../models/banque/banque";
import {ConfirmationService, MessageService} from "primeng/api";
import {BanqueService} from "../../services/banque/banque.service";
import {KeycloakService} from "keycloak-angular";
import {HttpResponse} from "@angular/common/http";
import {Agence} from "../../models/agence/agence";
import {AgenceService} from "../../services/agence/agence.service";

@Component({
    selector: 'app-agence',
    templateUrl: './agence.component.html',
    styleUrls: ['./agence.component.scss']
})
export class AgenceComponent implements OnInit {

    loading = false;
    @ViewChild('dt') table: Table;
    @ViewChild('filter') filter: ElementRef;
    banques?: Banque[];
    agences?: Agence[];
    displayDialogue: boolean;
    displayDialogueModification: boolean;
    banque: Banque;
    agence: Agence = new Agence();
    keycloakUser = '';
    userRole: string[] = [];
    serviceId: number;

    constructor(
        private messageService: MessageService,
        protected agenceService: AgenceService,
        protected banqueService: BanqueService,
        protected keycloakService: KeycloakService,
        private confirmationService: ConfirmationService) {
    }

    ngOnInit(): void {
        this.agence = new Agence();
        this.getAllBanques();
        this.getAllAgences();
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

    getAllAgences(): void {
        this.agenceService.getAllAgences().subscribe((res: HttpResponse<Agence[]>) => {
            const data = res.body ?? [];
            console.log("*************** agence List getAllAgences******************", data)
            this.agences = data;
        });
    }


    successAlert(): void {
        this.messageService.add({severity: 'success', summary: 'Opération réussie!'});
    }

    onDisplayDialogue(agence1: Agence): void {
        this.agence = new Agence(); // Réinitialise le modèle du formulaire
        this.displayDialogue = true;
    }

    onDisplayDialogueModif(id: number, agence1: Agence): void {
        this.agence.id = id;
        this.agence = agence1;
        console.log('-----onDisplayDialogueModif-------', this.agence.id, this.agence.libelle, this.agence.libelle);
        this.displayDialogueModification = true;
    }

    onHidenDialogue(): void {
        this.displayDialogue = false;
        this.displayDialogueModification = false;
    }

    onHidenDialogueModif(): void {
        this.displayDialogueModification = false;
    }



    onSave(agence: Agence): void {
    //  agence.banqueId = this.banque.id;
 //       this.agence.banqueId = this.banque.id;
        console.log("***************this.banque******************", this.agence)
        this.agenceService.createAgence(agence).subscribe(
            resp => {
                if (resp) {
                    //    this.poste = new Service();
                    this.onHidenDialogue();
                    this.successAlert();
                    this.getAllAgences();
                }
            },
            error => {
                console.error('Erreur lors de la création du poste', error);
            }
        );
    }

    updateAgence(id: number, agence: Agence): void {
        console.log('==============1111111111111=================', agence.id);
        console.log('==============2222222=================', agence);
        this.onDisplayDialogueModif(id, agence);
        this.agenceService.updateAgence(id, agence).subscribe(
            response => {
                console.log('============= id updateBanque ==================', agence.id);
                console.log('Service mise à jour avec succès', response);
                this.successAlert();
                this.getAllAgences();
            },
            error => {
                console.error('Erreur lors de la mise à jour de la banque:', error);
            }
        );
        this.onHidenDialogueModif();
    }


    deleteAgence(id: number, agence: Agence): void {
        this.confirmationService.confirm(
            {
                target: event.target,
                message: 'Êtes-vous sûr de vouloir supprimer ' + agence.libelle + ' ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    // Si l'utilisateur clique sur 'Oui', la mise à jour est exécutée
                    this.onDisplayDialogueModif(id, agence);
                    this.banqueService.deleteBanque(id, agence).subscribe(
                        response => {
                            console.log('Service mise à jour avec succès', response);
                            this.successAlert();
                            this.getAllAgences();
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

}
