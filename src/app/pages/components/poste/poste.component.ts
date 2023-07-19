import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Table} from 'primeng/table';
import {IPoste, Poste} from '../../models/poste/poste';
import {ConfirmationService, MessageService} from 'primeng/api';
import {PosteService} from '../../services/poste/poste.service';
import {HttpResponse} from '@angular/common/http';
import {IService} from '../../models/service/service';
import {ServiceService} from '../../services/service/service.service';
import {KeycloakService} from 'keycloak-angular';

@Component({
    selector: 'app-poste',
    templateUrl: './poste.component.html',
    styleUrls: ['./poste.component.scss']
})
export class PosteComponent implements OnInit {
    loading = false;
    @ViewChild('dt') table: Table;
    @ViewChild('filter') filter: ElementRef;
    postes?: IPoste[];
    services?: IService[];
    displayDialogue: boolean;
    poste: IPoste = new Poste();
    keycloakUser = '';
    userRole: string[] = [];
    serviceId: number;

    constructor(
        private messageService: MessageService,
        protected posteService: PosteService,
        protected serviceService: ServiceService,
        protected keycloakService: KeycloakService,
        private confirmationService: ConfirmationService) {
    }

    ngOnInit(): void {
        this.getAllPostes();
        this.getAllServices();
        // this.toInitFunctions();
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    getAllServices(): void {
        this.serviceService.getAllServices().subscribe((res: HttpResponse<IService[]>) => {
            const data = res.body ?? [];
            this.services = data;
        });
    }

    getAllPostes(): void {
        this.posteService.getAllPostes().subscribe((res: HttpResponse<IPoste[]>) => {
            const data = res.body ?? [];
            this.postes = data;
        });
    }

    confirmPosteDelete(poste: IPoste): void {
        this.posteService.deletePoste(poste.id).subscribe(
            resp => {
                if (resp) {
                    this.successAlert();
                    this.getAllPostes();
                    this.ngOnInit();
                }
            }
        );
    }

    successAlert(): void {
        this.messageService.add({severity: 'success', summary: 'Opération réussie!'});
    }

    onDisplayDialogue(poste: IPoste): void {
        this.poste = poste;
        this.displayDialogue = true;
    }

    onHidenDialogue(): void {
        this.displayDialogue = false;
    }

    onDeletePoste(event: Event, poste: IPoste) {
        this.confirmationService.confirm(
            {
                target: event.target,
                message: 'Êtes-vous sûr de vouloir supprimer ' + poste.libelle + ' ?',
                accept: () => {
                    this.confirmPosteDelete(poste);
                    this.getAllPostes();
                    this.ngOnInit();
                }
            });
        this.getAllPostes();
        this.ngOnInit();
    }

    onSelectedService(service: IService): void {
        this.serviceId = service.id;
    }

    deleted(banqueId: number): void {
        if (banqueId !== undefined) {
            this.posteService.deleted(banqueId).subscribe(
                resp => {
                    if (resp) {
                        //    this.poste = new Poste();
                        this.onHidenDialogue();
                        this.successAlert();
                        this.getAllPostes();
                    }
                },
                error => {
                    console.error('Erreur lors de la mise à jour du poste', error);
                }
            );
        }
    }

    updatePoste(id: number, poste: IPoste): void {
        this.onDisplayDialogue(poste)
        console.log('===============================', poste.id);
        this.displayDialogue = true;
        this.posteService.updatePoste(poste.id, poste)
            .subscribe(
                response => {
                    console.log('===============================', poste.id);
                    console.log('Banque mise à jour avec succès', response);
                    this.successAlert();
                    this.getAllPostes();
                },
                error => {
                    console.error('Erreur lors de la mise à jour de la banque', error);
                    // Gérer l'erreur de mise à jour
                }
            );
    }

    onSave(poste: IPoste): void {
            poste.id = this.serviceId;
            this.posteService.createPoste(poste).subscribe(
                resp => {
                    if (resp) {
                        //    this.poste = new Poste();
                        this.onHidenDialogue();
                        this.successAlert();
                        this.getAllPostes();
                    }
                },
                error => {
                    console.error('Erreur lors de la création du poste', error);
                }
            );
    }
}
