import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Table} from 'primeng/table';
import {IService} from '../../models/service/service';
import {TypeContrat} from '../../models/typeContrat/type-contrat';
import {KeycloakService} from 'keycloak-angular';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ServiceService} from '../../services/service/service.service';
import {HttpResponse} from '@angular/common/http';
import {TypeContratService} from '../../services/typeContrat/type-contrat.service';

@Component({
  selector: 'app-type-contrat',
  templateUrl: './type-contrat.component.html',
  styleUrls: ['./type-contrat.component.scss']
})
export class TypeContratComponent implements OnInit {

  loading = false;
  @ViewChild('dt') table: Table;
  @ViewChild('filter') filter: ElementRef;
  typeContrats?: TypeContrat[];
  services?: IService[];
  displayDialogue: boolean;
  displayDialogueModification: boolean;
  typeContrat: TypeContrat = new TypeContrat();
  keycloakUser = '';
  userRole: string[] = [];
  serviceId: number;

  constructor(
      private messageService: MessageService,
      protected typeContratSerice: TypeContratService,
      protected serviceService: ServiceService,
      protected keycloakService: KeycloakService,
      private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.typeContrat = new TypeContrat();
    this.getAllTypeContrats();
// this.toInitFunctions();
  }


  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  getAllTypeContrats(): void {
    this.typeContratSerice.getAllTypeContrats().subscribe((res: HttpResponse<TypeContrat[]>) => {
      const data = res.body ?? [];
      this.typeContrats = data;
    });
  }

  successAlert(): void {
    this.messageService.add({severity: 'success', summary: 'Opération réussie!'});
  }

  onDisplayDialogue(typeContrat: TypeContrat): void {
    this.typeContrat = new TypeContrat(); // Réinitialise le modèle du formulaire
    this.displayDialogue = true;
  }

  onDisplayDialogueModif(id: number, typeContratDetails: TypeContrat): void {
    this.typeContrat.id = id;
    this.typeContrat = typeContratDetails;
    console.log('-----onDisplayDialogueModif-------', this.typeContrat.id, this.typeContrat.libelle, this.typeContrat.libelle);
    this.displayDialogueModification = true;
  }

  onHidenDialogue(): void {
    this.displayDialogue = false;
    this.displayDialogueModification = false;
  }

  onHidenDialogueModif(): void {
    this.displayDialogueModification = false;
  }

  updateTypeContrat(id: number, typeContratDetails: TypeContrat): void {
    console.log('==============1111111111111=================', typeContratDetails.id);
    console.log('==============2222222=================', typeContratDetails);
    this.onDisplayDialogueModif(id, typeContratDetails);
    this.typeContratSerice.updateTypeContrat(id, typeContratDetails).subscribe(
        response => {
          console.log('============= id updateTypeContrat ==================', typeContratDetails.id);
          console.log('Service mise à jour avec succès', response);
          this.successAlert();
          this.getAllTypeContrats();
        },
        error => {
          console.error('Erreur lors de la mise à jour de la banque:', error);
        }
    );
    this.onHidenDialogueModif();
  }


  deleteTypeContrat(id: number, typeContratDetails: TypeContrat): void {
    this.confirmationService.confirm(
        {
          target: event.target,
          message: 'Êtes-vous sûr de vouloir supprimer ' + typeContratDetails.libelle + ' ?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            // Si l'utilisateur clique sur 'Oui', la mise à jour est exécutée
            this.onDisplayDialogueModif(id, typeContratDetails);
            this.typeContratSerice.deleteTypeContrat(id, typeContratDetails).subscribe(
                response => {
                  console.log('Service mise à jour avec succès', response);
                  this.successAlert();
                  this.getAllTypeContrats();
                },
                error => {
                  console.error('Erreur lors de la suppression du typeContrat:', error);
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


  onSave(typeContrat1: TypeContrat): void {
    typeContrat1.id = this.serviceId;
    this.typeContratSerice.createTypeContrat(typeContrat1).subscribe(
        resp => {
          if (resp) {
            //    this.typeContrat = new Service();
            this.onHidenDialogue();
            this.successAlert();
            this.getAllTypeContrats();
          }
        },
        error => {
          console.error('Erreur lors de la création du typeContrat', error);
        }
    );
  }
}
