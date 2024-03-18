import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {IService} from "../../models/service/service";
import {ConfirmationService, MessageService} from "primeng/api";
import {ServiceService} from "../../services/service/service.service";
import {KeycloakService} from "keycloak-angular";
import {HttpResponse} from "@angular/common/http";
import {Mandataire} from "../../models/mandataire/mandataire";
import {MandataireService} from "../../services/mandataire/mandataire.service";

@Component({
    selector: 'app-mandataire',
    templateUrl: './mandataire.component.html',
    styleUrls: ['./mandataire.component.scss']
})
export class MandataireComponent implements OnInit {

    loading = false;
    @ViewChild('dt') table: Table;
    @ViewChild('filter') filter: ElementRef;
    mandataires?: Mandataire[];
    services?: IService[];
    displayDialogue: boolean;
    displayDialogueModification: boolean;
    mandataire: Mandataire = new Mandataire();
    keycloakUser = '';
    userRole: string[] = [];
    serviceId: number;

    constructor(
        private messageService: MessageService,
        protected mandataireService: MandataireService,
        protected serviceService: ServiceService,
        protected keycloakService: KeycloakService,
        private confirmationService: ConfirmationService) {
    }

    ngOnInit(): void {
        this.mandataire = new Mandataire();
        this.getAllMandataires();
// this.toInitFunctions();
    }


    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    getAllMandataires(): void {
        this.mandataireService.getAllMandataires().subscribe((res: HttpResponse<Mandataire[]>) => {
            const data = res.body ?? [];
            this.mandataires = data;
        });
    }

    successAlert(): void {
        this.messageService.add({severity: 'success', summary: 'Opération réussie!'});
    }

    onDisplayDialogue(mandataire: Mandataire): void {
        this.mandataire = new Mandataire(); // Réinitialise le modèle du formulaire
        this.displayDialogue = true;
    }

    onDisplayDialogueModif(id: number, mandataireDetails: Mandataire): void {
        this.mandataire.id = id;
        this.mandataire = mandataireDetails;
        console.log('-----onDisplayDialogueModif-------', this.mandataire.id, this.mandataire.capitalAssurer, this.mandataire.capitalAssurer);
        this.displayDialogueModification = true;
    }

    onHidenDialogue(): void {
        this.displayDialogue = false;
        this.displayDialogueModification = false;
    }

    onHidenDialogueModif(): void {
        this.displayDialogueModification = false;
    }

    updateMandataire(id: number, mandataireDetails: Mandataire): void {
        console.log('==============1111111111111=================', mandataireDetails.id);
        console.log('==============2222222=================', mandataireDetails);
        this.onDisplayDialogueModif(id, mandataireDetails);
        this.mandataireService.updateMandataire(id, mandataireDetails).subscribe(
            response => {
                console.log('============= id updateMandataire ==================', mandataireDetails.id);
                console.log('Service mise à jour avec succès', response);
                this.successAlert();
                this.getAllMandataires();
            },
            error => {
                console.error('Erreur lors de la mise à jour du mandataire:', error);
            }
        );
        this.onHidenDialogueModif();
    }


    deleteMandataire(id: number, mandataireDetails: Mandataire): void {
        this.confirmationService.confirm(
            {
                target: event.target,
                message: 'Êtes-vous sûr de vouloir supprimer ' + mandataireDetails.capitalAssurer + ' ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    // Si l'utilisateur clique sur 'Oui', la mise à jour est exécutée
                    this.onDisplayDialogueModif(id, mandataireDetails);
                    this.mandataireService.deleteMandataire(id, mandataireDetails).subscribe(
                        response => {
                            console.log('Service mise à jour avec succès', response);
                            this.successAlert();
                            this.getAllMandataires();
                        },
                        error => {
                            console.error('Erreur lors de la suppression du mandataire:', error);
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


    onSave(mandataire1: Mandataire): void {
        mandataire1.id = this.serviceId;
        this.mandataireService.createMandataire(mandataire1).subscribe(
            resp => {
                if (resp) {
                    //    this.mandataire = new Service();
                    this.onHidenDialogue();
                    this.successAlert();
                    this.getAllMandataires();
                }
            },
            error => {
                console.error('Erreur lors de la création du mandataire', error);
            }
        );
    }
}
