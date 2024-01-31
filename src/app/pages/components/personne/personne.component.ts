import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {ConfirmationService, MessageService} from "primeng/api";
import {KeycloakService} from "keycloak-angular";
import {HttpResponse} from "@angular/common/http";
import {PersonneService} from "../../services/personne/personne.service";
import {Personne} from "../../models/personne/personne";

@Component({
  selector: 'app-personne',
  templateUrl: './personne.component.html',
  styleUrls: ['./personne.component.scss']
})
export class PersonneComponent implements OnInit {

  loading = false;
  @ViewChild('dt') table: Table;
  @ViewChild('filter') filter: ElementRef;
  personnes?: Personne[];
  displayDialogue: boolean;
  displayDialogueModification: boolean;
  personne: Personne = new Personne();
  keycloakUser = '';
  userRole: string[] = [];
  serviceId: number;




  constructor(
      private messageService: MessageService,
      protected personneService: PersonneService,
      protected keycloakService: KeycloakService,
      private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.personne = new Personne();
    this.getAllPersonnes();
    // this.toInitFunctions();
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }


  getAllPersonnes(): void {
    this.personneService.getAllPersonnes().subscribe((res: HttpResponse<Personne[]>) => {
      const data = res.body ?? [];
      this.personnes = data;
    });
  }


  successAlert(): void {
    this.messageService.add({severity: 'success', summary: 'Opération réussie!'});
  }

  onDisplayDialogue(personne: Personne): void {
    this.personne= new Personne(); // Réinitialise le modèle du formulaire
    this.displayDialogue = true;
  }

  onDisplayDialogueModif(id: number, personneDetails: Personne): void {
    this.personne.id = id;
    this.personne = personneDetails;
    console.log('-----onDisplayDialogueModif-------', this.personne.id, this.personne.nom, this.personne.nom);
    this.displayDialogueModification = true;
  }

  onHidenDialogue(): void {
    this.displayDialogue = false;
    this.displayDialogueModification = false;
  }

  onHidenDialogueModif(): void {
    this.displayDialogueModification = false;
  }

  onSave(personne1: Personne): void {
    personne1.id = this.serviceId;
    this.personneService.createPersonne(personne1).subscribe(
        resp => {
          if (resp) {
            //    this.personne = new Service();
            this.onHidenDialogue();
            this.successAlert();
            this.getAllPersonnes();
          }
        },
        error => {
          console.error('Erreur lors de la création de la personne', error);
        }
    );
  }

  updatePersonne(id: number, personneDetails: Personne): void {
    console.log('==============1111111111111=================', personneDetails.id);
    console.log('==============2222222=================', personneDetails);
    this.onDisplayDialogueModif(id, personneDetails);
    this.personneService.updatePersonne(id,personneDetails).subscribe(
        response => {
          console.log('============= id updatePersonne ==================', personneDetails.id);
          console.log('Service mise à jour avec succès', response);
          this.successAlert();
          this.getAllPersonnes();
        },
        error => {
          console.error('Erreur lors de la mise à jour de la personne:', error);
        }
    );
    this.onHidenDialogueModif();
  }


  deletePersonne(id: number, personneDetails: Personne): void {
    this.confirmationService.confirm(
        {
          target: event.target,
          message: 'Êtes-vous sûr de vouloir supprimer ' + personneDetails.nom + ' ?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            // Si l'utilisateur clique sur 'Oui', la mise à jour est exécutée
            this.onDisplayDialogueModif(id, personneDetails);
            this.personneService.deletePersonne(id, personneDetails).subscribe(
                response => {
                  console.log('Service mise à jour avec succès', response);
                  this.successAlert();
                  this.getAllPersonnes();
                },
                error => {
                  console.error('Erreur lors de la suppression de la personne:', error);
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

