import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Table} from 'primeng/table';
import {IService} from '../../models/service/service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ServiceService} from '../../services/service/service.service';
import {KeycloakService} from 'keycloak-angular';
import {HttpResponse} from '@angular/common/http';
import {PeriodicitePaiementPrime} from '../../models/periodicitePaiementPrime/periodicite-paiement-prime';
import {PeriodicitePaiementPrimeService} from '../../services/periodicitePaiementPrime/periodicite-paiement-prime.service';


@Component({
  selector: 'app-periodicite-paiement-prime',
  templateUrl: './periodicite-paiement-prime.component.html',
  styleUrls: ['./periodicite-paiement-prime.component.scss']
})
export class PeriodicitePaiementPrimeComponent implements OnInit {
  loading = false;
  @ViewChild('dt') table: Table;
  @ViewChild('filter') filter: ElementRef;
  periodicitePaiementPrimes?: PeriodicitePaiementPrime[];
  services?: IService[];
  displayDialogue: boolean;
  displayDialogueModification: boolean;
  periodicitePaiementPrime: PeriodicitePaiementPrime = new PeriodicitePaiementPrime();
  keycloakUser = '';
  userRole: string[] = [];
  serviceId: number;

  constructor(
      private messageService: MessageService,
      protected periodicitePaiementPrimeService: PeriodicitePaiementPrimeService,
      protected serviceService: ServiceService,
      protected keycloakService: KeycloakService,
      private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.periodicitePaiementPrime = new PeriodicitePaiementPrime();
    this.getAllPeriodicitePaiementPrimes();
    // this.toInitFunctions();
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }


  getAllPeriodicitePaiementPrimes(): void {
    this.periodicitePaiementPrimeService.getAllPeriodicitePaiementPrimes().subscribe((res: HttpResponse<PeriodicitePaiementPrime[]>) => {
      const data = res.body ?? [];
      this.periodicitePaiementPrimes = data;
    });
  }


  successAlert(): void {
    this.messageService.add({severity: 'success', summary: 'Opération réussie!'});
  }

  onDisplayDialogue(periodicitePaiementPrime: PeriodicitePaiementPrime): void {
    this.periodicitePaiementPrime = new PeriodicitePaiementPrime(); // Réinitialise le modèle du formulaire
    this.displayDialogue = true;
  }

  onDisplayDialogueModif(id: number, periodicitePaiementPrimeDetails: PeriodicitePaiementPrime): void {
    this.periodicitePaiementPrime.id = id;
    this.periodicitePaiementPrime = periodicitePaiementPrimeDetails;
      // tslint:disable-next-line:max-line-length
    console.log('-----onDisplayDialogueModif-------', this.periodicitePaiementPrime.id, this.periodicitePaiementPrime.libelle, this.periodicitePaiementPrime.libelle);
    this.displayDialogueModification = true;
  }

  onHidenDialogue(): void {
    this.displayDialogue = false;
    this.displayDialogueModification = false;
  }

  onHidenDialogueModif(): void {
    this.displayDialogueModification = false;
  }

  updatePeriodicitePaiementPrime(id: number, periodicitePaiementPrimeDetails: PeriodicitePaiementPrime): void {
    console.log('==============1111111111111=================', periodicitePaiementPrimeDetails.id);
    console.log('==============2222222=================', periodicitePaiementPrimeDetails);
    this.onDisplayDialogueModif(id, periodicitePaiementPrimeDetails);
    this.periodicitePaiementPrimeService.updatePeriodicitePaiementPrime(id, periodicitePaiementPrimeDetails).subscribe(
        response => {
          console.log('============= id updatePeriodicitePaiementPrime ==================', periodicitePaiementPrimeDetails.id);
          console.log('Service mise à jour avec succès', response);
          this.successAlert();
          this.getAllPeriodicitePaiementPrimes();
        },
        error => {
          console.error('Erreur lors de la mise à jour de la periodicitePaiementPrime:', error);
        }
    );
    this.onHidenDialogueModif();
  }
    deletePeriodicitePairmentPrime(id: number, periodicitePaiementPrimeDetails: PeriodicitePaiementPrime): void {
        this.confirmationService.confirm(
            {
                target: event.target,
                message: 'Êtes-vous sûr de vouloir supprimer ' + periodicitePaiementPrimeDetails.libelle + ' ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    // Si l'utilisateur clique sur 'Oui', la mise à jour est exécutée
                    this.onDisplayDialogueModif(id, periodicitePaiementPrimeDetails);
                    this.periodicitePaiementPrimeService.deletePeriodicitePaiementPrime(id, periodicitePaiementPrimeDetails).subscribe(
                        response => {
                            console.log('Service mise à jour avec succès', response);
                            this.successAlert();
                            this.getAllPeriodicitePaiementPrimes();
                        },
                        error => {
                            console.error('Erreur lors de la suppression de la periodicitePaiementPrime:', error);
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




    onSave(periodicitePaiementPrime1: PeriodicitePaiementPrime): void {
        periodicitePaiementPrime1.id = this.serviceId;
        this.periodicitePaiementPrimeService.createPeriodicitePaiementPrime(periodicitePaiementPrime1).subscribe(
            resp => {
                if (resp) {
                    //    this.periodicitePaiementPrime = new Service();
                    this.onHidenDialogue();
                    this.successAlert();
                    this.getAllPeriodicitePaiementPrimes();
                }
            },
            error => {
                console.error('Erreur lors de la création du periodicitePaiementPrime', error);
            }
        );
    }
}
