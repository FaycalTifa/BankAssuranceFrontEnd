import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {Banque} from "../../models/banque/banque";
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {SouscriptionService} from "../../services/souscription/souscription.service";
import {KeycloakService} from "keycloak-angular";
import {Souscription} from "../../models/souscription/souscription";
import {Personne} from "../../models/personne/personne";

@Component({
    selector: 'app-souscription',
    templateUrl: './souscription.component.html',
    styleUrls: ['./souscription.component.scss']
})
export class SouscriptionComponent implements OnInit {

    loading = false;
    @ViewChild('dt') table: Table;
    @ViewChild('filter') filter: ElementRef;
    souscriptions?: Souscription[];
    displayDialogue: boolean;
    displayDialogueDetail: boolean;
    displayDialogueModification: boolean;
   // souscription?: Souscription = new Souscription();
    // personne1: Souscription = new Personne();
    keycloakUser = '';
    userRole: string[] = [];
    items: MenuItem[];
    activeIndex  = 0 ;
    // personne = this.souscription.personne
    souscription: Souscription = {
        personne: {
            nom: '', prenom: '', nomDeJeuneFille: '', dateDeNaissance: '', lieuDeNaissance: '', taille: 0, poids: 0, tension: '', professionActuelle: '', employeur: '', numeroPiecePasseport: '', dateEtablissement: '', lieuEtablissement: '', adressePostale: '', telephone: '', email: '', telephoneSecours: '', emailSecours: '', adresseSecours: ''
        },
        detailsCredit: {
            montantCreditAssurer: 0, montantCreditDecouvert: 0, nombreDeRemboursement: '', montantDesTermes: 0, numeroCompteClient: '', dureeTotaleCredit: '', differerAmortissement: '', datePremierRemboursementTerme: '', dateEffet: '', dateEcheance: ''
        },
        questionnaireMedical: {
            question1: false, question2: false, question3: false, question4: false, question5: false, detail1: '', detail2: '', detail3: '', detail4: '', detail5: ''
        },
        mandataire: {
            capitalAssurer: 0, primeGarantieDecesOuIAD: 0, primeGarantiePerteEmploi: 0, primeTotale: 0, numeroDeCompteUABVie: ''
        },
        informationEmploi: {
            employeur: '', dateEmbauche: '', adresseEmployeur: '', professionActuelle: '', typeDeContrat: '', telEmployeur: '', numeroCNSS: '', numeroRCCMIFU: ''
        }
    };


    constructor(
        protected souscriptionService: SouscriptionService,
        private messageService: MessageService,
        protected keycloakService: KeycloakService,
        private confirmationService: ConfirmationService
    ) {
        this.items = [
            {label: 'Adhérent'},
            {label: 'Crédit'},
            {label: 'Questionnaire médical'},
            {label: 'Perte emplois'},
            {label: 'Banque'},
        ];
    }

    ngOnInit(): void {
      //  this.souscription = new Souscription();
       //let  personne = this.souscription.personne
        console.log('Souscription initiale :', this.souscription);
       // console.log('Souscription personne initiale :', this.souscription.personne);

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

    successAlert(): void {
        this.messageService.add({severity: 'success', summary: 'Opération réussie!'});
    }


    onSave(): void {
        console.log("============ onSave SOUSCRPTION ================", this.souscription)
        this.souscriptionService.createSouscription(this.souscription).subscribe(
            resp => {
                if (resp) {
                    //    this.poste = new Service();
                    this.onHidenDialogue();
                    this.successAlert();

                }
            },
            error => {
                console.error('Erreur lors de la création du poste', error);
            }
        );
    }


}
