import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Table} from 'primeng/table';
import {IService} from '../../models/service/service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ServiceService} from '../../services/service/service.service';
import {KeycloakService} from 'keycloak-angular';
import {HttpResponse} from '@angular/common/http';
import {CiviliteService} from '../../services/civilite/civilite.service';
import {Banque} from '../../models/banque/banque';
import {Civilite} from "../../models/souscription/souscription";

@Component({
    selector: 'app-civilite',
    templateUrl: './civilite.component.html',
    styleUrls: ['./civilite.component.scss']
})
export class CiviliteComponent implements OnInit {
    loading = false;
    @ViewChild('dt') table: Table;
    @ViewChild('filter') filter: ElementRef;
    civilites?: Civilite[];
    services?: IService[];
    displayDialogue: boolean;
    displayDialogueDetail: boolean;
    displayDialogueModification: boolean;
   // civilite: Civilite = new Civilite();
    keycloakUser = '';
    userRole: string[] = [];
    serviceId: number;
    civilite: Civilite = {
        code: '',
        libelle: '',
    }

    constructor(
        private messageService: MessageService,
        protected civiliteService: CiviliteService,
        protected serviceService: ServiceService,
        protected keycloakService: KeycloakService,
        private confirmationService: ConfirmationService) {
    }

    ngOnInit(): void {
        this.getAllCivilites();
        this.resetForm();
// this.toInitFunctions();
    }

    resetForm() {
        this.civilite = {}; // Réinitialisez l'objet souscription à un objet vide ou à ses valeurs par défaut
    }
    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    getAllCivilites(): void {
        this.civiliteService.getAllCivilites().subscribe((res: HttpResponse<Civilite[]>) => {
            const data = res.body ?? [];
            this.civilites = data;
        });
    }

    successAlert(): void {
        this.messageService.add({severity: 'success', summary: 'Opération réussie!'});
    }

    onDisplayDialogue(civilite: Civilite): void {
       // this.civilite = new Civilite(); // Réinitialise le modèle du formulaire
        this.displayDialogue = true;
    }


    onDisplayDialoguDetail(civilite: Civilite) {
        this.civilite = civilite;
        this.displayDialogueDetail = true;
    }

    onDisplayDialogueModif(id: number, civiliteDetails: Civilite): void {
        this.civilite.id = id;
        this.civilite = civiliteDetails;
        console.log('-----onDisplayDialogueModif-------', this.civilite.id, this.civilite.libelle, this.civilite.libelle);
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

    updateCivilite(id: number, civiliteDetails: Civilite): void {
        console.log('==============1111111111111=================', civiliteDetails.id);
        console.log('==============2222222=================', civiliteDetails);
        this.onDisplayDialogueModif(id, civiliteDetails);
        this.civiliteService.updateCivilite(id, civiliteDetails).subscribe(
            response => {
                console.log('============= id updateCivilite ==================', civiliteDetails.id);
                console.log('Service mise à jour avec succès', response);
                this.successAlert();
                this.getAllCivilites();
            },
            error => {
                console.error('Erreur lors de la mise à jour de la banque:', error);
            }
        );
        this.onHidenDialogueModif();
    }


    deleteCivilite(id: number, civiliteDetails: Civilite): void {
        this.confirmationService.confirm(
            {
                target: event.target,
                message: 'Êtes-vous sûr de vouloir supprimer ' + civiliteDetails.libelle + ' ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    // Si l'utilisateur clique sur 'Oui', la mise à jour est exécutée
                    this.onDisplayDialogueModif(id, civiliteDetails);
                    this.civiliteService.deleteCivilite(id, civiliteDetails).subscribe(
                        response => {
                            console.log('Service mise à jour avec succès', response);
                            this.successAlert();
                            this.getAllCivilites();
                        },
                        error => {
                            console.error('Erreur lors de la suppression de la civilite:', error);
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


    onSave(civilite1: Civilite): void {
        civilite1.id = this.serviceId;
        this.civiliteService.createCivilite(civilite1).subscribe(
            resp => {
                if (resp) {
                    //    this.civilite = new Service();
                    this.onHidenDialogue();
                    this.successAlert();
                    this.getAllCivilites();
                }
            },
            error => {
                console.error('Erreur lors de la création du poste', error);
            }
        );
    }
}




