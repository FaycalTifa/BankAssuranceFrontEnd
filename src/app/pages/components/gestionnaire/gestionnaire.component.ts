import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {Banque} from "../../models/banque/banque";
import {ConfirmationService, MessageService} from "primeng/api";
import {BanqueService} from "../../services/banque/banque.service";
import {KeycloakService} from "keycloak-angular";
import {HttpResponse} from "@angular/common/http";
import {Agence} from "../../models/agence/agence";
import {AgenceService} from "../../services/agence/agence.service";
import {Gestionnaire} from "../../models/gestionnaire/gestionnaire";
import {GestionnaireService} from "../../services/gestionnaire/gestionnaire.service";
import {Civilite} from '../../models/civilite/civilite';

@Component({
    selector: 'app-gestionnaire',
    templateUrl: './gestionnaire.component.html',
    styleUrls: ['./gestionnaire.component.scss']
})
export class GestionnaireComponent implements OnInit {

    loading = false;
    @ViewChild('dt') table: Table;
    @ViewChild('filter') filter: ElementRef;
    agences?: Agence[];
    gestionnaires?: Gestionnaire[];
    displayDialogue: boolean;
    displayDialogueModification: boolean;
    displayDialogueDetail: boolean;
    agence: Agence;
    gestionnaire: Gestionnaire = new Gestionnaire();
    keycloakUser = '';
    userRole: string[] = [];
    serviceId: number;

    constructor(
        private messageService: MessageService,
        protected gestionnaireService: GestionnaireService,
        protected agenceService: AgenceService,
        protected keycloakService: KeycloakService,
        private confirmationService: ConfirmationService) {
    }

    ngOnInit(): void {
        this.gestionnaire = new Gestionnaire();
        this.getAllAgences();
        this.getAllGestionnaires();
        // this.toInitFunctions();
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }


    getAllAgences(): void {
        this.agenceService.getAllAgences().subscribe((res: HttpResponse<Agence[]>) => {
            const data = res.body ?? [];
            this.agences = data;
        });
    }

    getAllGestionnaires(): void {
        this.gestionnaireService.getAllGestionnaires().subscribe((res: HttpResponse<Gestionnaire[]>) => {
            const data = res.body ?? [];
            this.gestionnaires = data;
        });
    }


    successAlert(): void {
        this.messageService.add({severity: 'success', summary: 'Opération réussie!'});
    }

    onDisplayDialogue(gestionnaire1: Gestionnaire): void {
        this.gestionnaire = new Gestionnaire(); // Réinitialise le modèle du formulaire
        this.displayDialogue = true;
    }

    onDisplayDialoguDetail(gestionnaire: Gestionnaire) {
        this.gestionnaire = gestionnaire;
        this.displayDialogueDetail = true;
    }

    onDisplayDialogueModif(id: number, gestionnaire1: Gestionnaire): void {
        this.gestionnaire.id = id;
        this.gestionnaire = gestionnaire1;
        console.log('-----onDisplayDialogueModif-------', this.gestionnaire.id, this.gestionnaire.libelle, this.gestionnaire.libelle);
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


    onSave(gestionnaire: Gestionnaire): void {
        //  gestionnaire.agenceId = this.gestionnaire.id;
        //       this.gestionnaire.agenceId = this.gestionnaire.id;
        console.log("***************this.agence******************", this.gestionnaire)
        this.gestionnaireService.createGestionnaire(gestionnaire).subscribe(
            resp => {
                if (resp) {
                    //    this.gestionnaire = new Service();
                    this.onHidenDialogue();
                    this.successAlert();
                    this.getAllGestionnaires();
                }
            },
            error => {
                console.error('Erreur lors de la création du poste', error);
            }
        );
    }

    updateGestionnaire(id: number, gestionnaire: Gestionnaire): void {
        console.log('==============1111111111111=================', gestionnaire.id);
        console.log('==============2222222=================', gestionnaire);
        this.onDisplayDialogueModif(id, gestionnaire);
        this.gestionnaireService.updateGestionnaire(id, gestionnaire).subscribe(
            response => {
                console.log('============= id updateAgence ==================', gestionnaire.id);
                console.log('Service mise à jour avec succès', response);
                this.successAlert();
                this.getAllGestionnaires();
            },
            error => {
                console.error('Erreur lors de la mise à jour de agence:', error);
            }
        );
        this.onHidenDialogueModif();
    }


    deleteGestionnaire(id: number, gestionnaire: Gestionnaire): void {
        this.confirmationService.confirm(
            {
                target: event.target,
                message: 'Êtes-vous sûr de vouloir supprimer ' + gestionnaire.libelle + ' ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    // Si l'utilisateur clique sur 'Oui', la mise à jour est exécutée
                    this.onDisplayDialogueModif(id, gestionnaire);
                    this.gestionnaireService.deleteGestionnaire(id, gestionnaire).subscribe(
                        response => {
                            console.log('Service mise à jour avec succès', response);
                            this.successAlert();
                            this.getAllGestionnaires();
                        },
                        error => {
                            console.error('Erreur lors de la suppression de agence:', error);
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

