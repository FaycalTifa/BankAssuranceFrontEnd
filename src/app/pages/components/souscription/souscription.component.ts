import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {Banque} from "../../models/banque/banque";
import {Personne} from "../../models/personne/personne";
import {DetailsCredit} from "../../models/detailsCredit/details-credit";
import {HttpResponse} from "@angular/common/http";
import {PeriodiciteRemboursement} from "../../models/periodiciteRemboursement/periodicite-remboursement";
import {
    PeriodiciteRemboursementService
} from "../../services/periodiciteRemboursement/periodicite-remboursement.service";
import {QuestionnaireMedical} from "../../models/questionnaireMedical/questionnaire-medical";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-souscription',
  templateUrl: './souscription.component.html',
  styleUrls: ['./souscription.component.scss']
})
export class SouscriptionComponent implements OnInit {

    loading = false;
    @ViewChild('dt') table: Table;
    @ViewChild('filter') filter: ElementRef;
    banques?: Banque[];
    personnes?: Personne[];
    displayDialogue: boolean;
    displayDialogueDetail: boolean;
    displayDialogueModification: boolean;
    banque: Banque = new Banque();
    detailsCredit: DetailsCredit = new DetailsCredit();
    personne: Personne = new Personne();
    questionnaireMedical: QuestionnaireMedical = new QuestionnaireMedical();
    periodiciteRemboursements?: PeriodiciteRemboursement[];
    detailsCredits?: DetailsCredit[];
    keycloakUser = '';
    userRole: string[] = [];
    items: MenuItem[];
    activeIndex: number = 0;

    constructor(
      protected periodiciteRemboursementService: PeriodiciteRemboursementService,
  ) {
        this.items = [
            { label: 'Adhérent' },
            { label: 'Crédit' },
            { label: 'Perte emplois' },
            { label: 'Questionnaire médical' },
            { label: '  Banque' }
        ];
    }

  ngOnInit(): void {
      this. getAllPeriodiciteRemboursements();
  }

    nextStep() {
        if (this.activeIndex < this.items.length - 1) {
            this.activeIndex++;
        }
    }

    prevStep() {
        if (this.activeIndex > 0) {
            this.activeIndex--;
        }
    }

    submitForm() {
        // Code pour soumettre le formulaire final
    }



    onDisplayDialogue(poste: Banque): void {
        this.displayDialogue = true;
    }


    onDisplayDialoguDetail(banque: Banque) {
        this.displayDialogueDetail = true;
    }

    onDisplayDialogueModif(id: number, banqueDetails: Banque): void {
        this.displayDialogueModification = true;
    }

    onHidenDialogue(): void {
        this.displayDialogue = false;
        this.displayDialogueModification = false;
        this.displayDialogueDetail = false;
    }

    onHidenDialogueModif(): void {
        this.displayDialogueModification = true;
    }

    getAllPeriodiciteRemboursements(): void {
        this.periodiciteRemboursementService.getAllPeriodiciteRemboursements().subscribe((res: HttpResponse<PeriodiciteRemboursement[]>) => {
            const data = res.body ?? [];
            this.periodiciteRemboursements = data;
        });
    }

    onSave(banque1: Banque): void {
       /* banque1.id = this.serviceId;
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
        );*/
    }

    updateBanque(id: number, banqueDetails: Banque): void {
      /*  console.log('==============1111111111111=================', banqueDetails.id);
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
        );*/
        this.onHidenDialogueModif();
    }




}
