import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {Souscription} from "../../models/souscription/souscription";
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {SouscriptionService} from "../../services/souscription/souscription.service";
import {KeycloakService} from "keycloak-angular";
import {Banque} from "../../models/banque/banque";
import {HttpResponse} from "@angular/common/http";
import moment from "moment/moment";

@Component({
  selector: 'app-souscription-prod',
  templateUrl: './souscription-prod.component.html',
  styleUrls: ['./souscription-prod.component.scss']
})
export class SouscriptionProdComponent implements OnInit {



    loading = false;
    @ViewChild('dt') table: Table;
    @ViewChild('filter') filter: ElementRef;
    souscriptions?: Souscription[];
    displayDialogue: boolean;
    displayDialogueDetail: boolean;
    displayDialogueModification: boolean;
    keycloakUser = '';
    userRole: string[] = [];
    messageSup: string;
    items: MenuItem[];
    activeIndex = 0;
    age: number;
    taux: number;
    tauxDec: number;
    tauxDec1an: number;
    montantSuperieur: boolean = false;
    Superieur: boolean = false;
    // personne = this.souscription.personne
    souscription: Souscription = {
        isCuperieur: false,
        personne: {
            nom: '',
            prenom: '',
            nomDeJeuneFille: '',
            dateDeNaissance: '',
            lieuDeNaissance: '',
            taille: 0,
            poids: 0,
            tension: '',
            professionActuelle: '',
            employeur: '',
            numeroPiecePasseport: '',
            dateEtablissement: '',
            lieuEtablissement: '',
            adressePostale: '',
            telephone: '',
            email: '',
            telephoneSecours: '',
            emailSecours: '',
            adresseSecours: ''
        },
        detailsCredit: {
            montantCreditAssurer: 0,
            montantCreditDecouvert: 0,
            nombreDeRemboursement: '',
            montantDesTermes: 0,
            numeroCompteClient: '',
            dureeTotaleCredit: '',
            differerAmortissement: 0,
            datePremierRemboursementTerme: '',
            dateEffet: '',
            dateEcheance: '',
            isDiffere: false,
            isDecouvert: false
        },
        questionnaireMedical: {
            question1: false,
            question2: false,
            question3: false,
            question4: false,
            question5: false,
            detail1: '',
            detail2: '',
            detail3: '',
            detail4: '',
            detail5: ''
        },
        mandataire: {
            capitalAssurer: 0,
            primeGarantieDecesOuIAD: 0,
            tauxAmortissement: 0,
            tauxDecouvert: 0,
            primeGarantiePerteEmploi: 0,
            primeTotale: 0,
            numeroDeCompteUABVie: '',
            primeSimple: 0,
            primeDiffere: 0,
            primeDecouvert: 0,
        },
        informationEmploi: {
            employeur: '',
            dateEmbauche: '',
            adresseEmployeur: '',
            professionActuelle: '',
            typeDeContrat: '',
            telEmployeur: '',
            numeroCNSS: '',
            numeroRCCMIFU: '',
            isPerte: false
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
        this.getAllSouscription();
        //let  personne = this.souscription.personne
        //  console.log(' =================== this.trouverTaux() :', this.trouverTauxDecouvert(65, 1));
        // console.log('Souscription initiale :', this.souscription);
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



    onHidenDialogue(): void {
        this.displayDialogue = false;
        this.displayDialogueModification = false;
        this.displayDialogueDetail = false;
    }

    onHidenDialogueModif(): void {
        this.displayDialogueModification = false;
    }

    successAlert(): void {
        this.messageService.add({severity: 'success', summary: 'Opération réussie!'});
    }

    onInputChange(value: string) {
        // Supprimer les séparateurs de milliers
        const valeurNumerique = +value.replace(/\s/g, '');
        this.souscription.detailsCredit.montantCreditAssurer = valeurNumerique;
    }

    onDisplayDialogueModif(id: number, souscription: Souscription): void {
        this.souscription.id = id;
        this.souscription = souscription;
        this.displayDialogueModification = true;
    }

    checkMontantCredit(montant: number) {
        if (montant > 50000000) {
            this.montantSuperieur = true;
            this.messageSup = 'LE MONTANT DOIT EST INFERIEUR A 50 000 000'
        } else {
            this.montantSuperieur = false;
        }
    }


    getAllSouscription(): void {
        this.souscriptionService.getAllSouscriptionIsSuperieurTrue().subscribe((res: HttpResponse<Souscription[]>) => {
            const data = res.body ?? [];
            console.log("*************** getAllSouscriptionIsSuperieurTrue List getAllAgences******************", data)
            this.souscriptions = data;
        });
    }

    calculateAge() {
        if (this.souscription.personne.dateDeNaissance) {
            const birthDate = moment(this.souscription.personne.dateDeNaissance);
            const today = moment();
            this.age = today.diff(birthDate, 'years');
            console.log("============ this.age calculateAge ================", this.age)
        }
    }

    calculPrime(): void{
        this.souscription.mandataire.tauxDecouvert = this.tauxDec;
        if (this.souscription.detailsCredit.isDiffere === false && this.souscription.detailsCredit.isDecouvert === false) {
            console.log("============ isDiffere === false && isDecouvert === false ================")
            this.calculateAge();
            console.log("============ onSave this.age ================", this.age)
            this.trouverTauxAmortissement(this.age, this.souscription.detailsCredit.dureeTotaleCredit)
            this.souscription.mandataire.tauxAmortissement = this.taux;
            console.log("============ onSave tauxAmortissement ================", this.souscription.mandataire.tauxAmortissement)
            this.souscription.mandataire.primeDiffere = 0;
            this.souscription.mandataire.primeDecouvert = 0;

            this.souscription.mandataire.primeSimple =  this.souscription.detailsCredit.montantCreditAssurer * (this.souscription.mandataire.tauxAmortissement / 100);

            this.souscription.mandataire.primeTotale = this.souscription.mandataire.primeSimple;
            console.log("========== onSave primeTotale =======", this.souscription.mandataire.primeTotale)
        }

        else if (this.souscription.detailsCredit.isDiffere === true && this.souscription.detailsCredit.isDecouvert === false) {
            console.log("============ if isDiffere === true ================")
            this.calculateAge();
            console.log("============ onSave this.age ================", this.age)
            this.trouverTauxDecouvert(this.age, this.souscription.detailsCredit.dureeTotaleCredit)
            this.trouverTauxAmortissement(this.age, this.souscription.detailsCredit.dureeTotaleCredit)
            this.souscription.mandataire.tauxDecouvert = this.tauxDec;
            this.souscription.mandataire.tauxAmortissement = this.taux;
            console.log("============ onSave tauxDecouvert ================", this.souscription.mandataire.tauxDecouvert)
            this.tauxDec1an;
            console.log("============ onSave tauxDec1an ================", this.tauxDec1an)
            console.log("============ onSave primeTotale Normal ================", (this.souscription.detailsCredit.montantCreditAssurer * (this.souscription.mandataire.tauxAmortissement / 100)))
            console.log("============ onSave prime differe ================", (((this.souscription.detailsCredit.montantCreditAssurer * this.tauxDec1an * 1.04) / 12) * this.souscription.detailsCredit.differerAmortissement))
            this.souscription.mandataire.primeDecouvert = 0;
            this.souscription.mandataire.primeSimple =  this.souscription.detailsCredit.montantCreditAssurer * (this.souscription.mandataire.tauxAmortissement / 100);

            this.souscription.mandataire.primeDiffere =  (((this.souscription.detailsCredit.montantCreditAssurer * this.tauxDec1an * 1.04) / 1200) * this.souscription.detailsCredit.differerAmortissement);

            this.souscription.mandataire.primeTotale = this.souscription.mandataire.primeSimple + this.souscription.mandataire.primeDiffere

            console.log("========== onSave primeTotale isDiffere =======", this.souscription.mandataire.primeTotale)
        } else if (this.souscription.detailsCredit.isDecouvert === true && this.souscription.detailsCredit.isDiffere === false) {
            console.log("============ if isDecouvert === true ================")
            this.calculateAge();
            console.log("============ onSave this.age ================", this.age)
            this.trouverTauxDecouvert(this.age, this.souscription.detailsCredit.dureeTotaleCredit)
            this.souscription.mandataire.tauxDecouvert = this.tauxDec;
            console.log("============ onSave tauxDecouvert ================", this.souscription.mandataire.tauxDecouvert)
            this.tauxDec1an;
            console.log("============ onSave tauxDec1an ================", this.tauxDec1an)
            this.souscription.mandataire.primeDiffere = 0;
            this.souscription.mandataire.primeDecouvert = (this.souscription.detailsCredit.montantCreditAssurer * (this.souscription.mandataire.tauxDecouvert / 100))

            this.souscription.mandataire.primeTotale =   this.souscription.mandataire.primeDecouvert

            console.log("========== onSave primeTotale isDecouvert =======", this.souscription.mandataire.primeTotale)

        }
        else if (this.souscription.detailsCredit.isDiffere === true && this.souscription.detailsCredit.isDecouvert === true) {
            console.log("============ if isDiffere === true ================")
            this.calculateAge();
            console.log("============ onSave this.age ================", this.age)
            this.trouverTauxDecouvert(this.age, this.souscription.detailsCredit.dureeTotaleCredit)
            this.trouverTauxAmortissement(this.age, this.souscription.detailsCredit.dureeTotaleCredit)
            this.souscription.mandataire.tauxDecouvert = this.tauxDec;
            this.souscription.mandataire.tauxAmortissement = this.taux;
            console.log("============ onSave tauxDecouvert ================", this.souscription.mandataire.tauxDecouvert)
            this.tauxDec1an;
            console.log("============ onSave tauxDec1an ================", this.tauxDec1an)
            console.log("============ onSave primeTotale Normal ================", (this.souscription.detailsCredit.montantCreditAssurer * (this.souscription.mandataire.tauxAmortissement / 100)))
            console.log("============ onSave prime differe ================", (((this.souscription.detailsCredit.montantCreditAssurer * this.tauxDec1an * 1.04) / 12) * this.souscription.detailsCredit.differerAmortissement))

            this.souscription.mandataire.primeDecouvert = (this.souscription.detailsCredit.montantCreditAssurer * (this.souscription.mandataire.tauxDecouvert / 100))

            this.souscription.mandataire.primeDiffere =   (((this.souscription.detailsCredit.montantCreditAssurer * this.tauxDec1an * 1.04) / 1200) * this.souscription.detailsCredit.differerAmortissement);

            this.souscription.mandataire.primeTotale = this.souscription.mandataire.primeDecouvert + this.souscription.mandataire.primeDiffere;


            console.log("========== onSave primeTotale isDiffere =======", this.souscription.mandataire.primeTotale)

        }
        this.nextStep()
    }


    onSave(): void {
      //  this.souscription.isCuperieur = this.Superieur;
        console.log("============ isSuperieur ================",  this.souscription.isCuperieur)
        this.souscription.mandataire.tauxDecouvert = this.tauxDec;
        if (this.souscription.detailsCredit.isDiffere === false && this.souscription.detailsCredit.isDecouvert === false) {
            console.log("============ isDiffere === false && isDecouvert === false ================")
            this.calculateAge();
            console.log("============ onSave this.age ================", this.age)
            this.trouverTauxAmortissement(this.age, this.souscription.detailsCredit.dureeTotaleCredit)
            this.souscription.mandataire.tauxAmortissement = this.taux;
            console.log("============ onSave tauxAmortissement ================", this.souscription.mandataire.tauxAmortissement)
            this.souscription.mandataire.primeDiffere = 0;
            this.souscription.mandataire.primeDecouvert = 0;

            this.souscription.mandataire.primeSimple =  this.souscription.detailsCredit.montantCreditAssurer * (this.souscription.mandataire.tauxAmortissement / 100);

            this.souscription.mandataire.primeTotale = this.souscription.mandataire.primeSimple;

            console.log("========== onSave primeTotale =======", this.souscription.mandataire.primeTotale)

            this.souscription.isCuperieur = false;
            console.log("============ isSuperieur ================",  this.souscription.isCuperieur)
            this.souscriptionService.createSouscription(this.souscription).subscribe(
                resp => {
                    if (resp) {
                        //    this.poste = new Service();
                        this.onHidenDialogue();
                        this.successAlert();
                        this.getAllSouscription();
                    }
                },
                error => {
                    console.error('Erreur lors de la création du poste', error);
                }
            );
        } else if (this.souscription.detailsCredit.isDiffere === true && this.souscription.detailsCredit.isDecouvert === false) {
            console.log("============ if isDiffere === true ================")
            this.calculateAge();
            console.log("============ onSave this.age ================", this.age)
            this.trouverTauxDecouvert(this.age, this.souscription.detailsCredit.dureeTotaleCredit)
            this.trouverTauxAmortissement(this.age, this.souscription.detailsCredit.dureeTotaleCredit)
            this.souscription.mandataire.tauxDecouvert = this.tauxDec;
            this.souscription.mandataire.tauxAmortissement = this.taux;
            console.log("============ onSave tauxDecouvert ================", this.souscription.mandataire.tauxDecouvert)
            this.tauxDec1an;
            console.log("============ onSave tauxDec1an ================", this.tauxDec1an)
            console.log("============ onSave primeTotale Normal ================", (this.souscription.detailsCredit.montantCreditAssurer * (this.souscription.mandataire.tauxAmortissement / 100)))
            console.log("============ onSave prime differe ================", (((this.souscription.detailsCredit.montantCreditAssurer * this.tauxDec1an * 1.04) / 12) * this.souscription.detailsCredit.differerAmortissement))

            this.souscription.mandataire.primeDecouvert = 0;

            this.souscription.mandataire.primeSimple =  this.souscription.detailsCredit.montantCreditAssurer * (this.souscription.mandataire.tauxAmortissement / 100);

            this.souscription.mandataire.primeDiffere =  (((this.souscription.detailsCredit.montantCreditAssurer * this.tauxDec1an * 1.04) / 1200) * this.souscription.detailsCredit.differerAmortissement);

            this.souscription.mandataire.primeTotale = this.souscription.mandataire.primeSimple + this.souscription.mandataire.primeDiffere

            console.log("========== onSave primeTotale isDiffere =======", this.souscription.mandataire.primeTotale)

            this.souscription.isCuperieur = false;
            console.log("============ isSuperieur ================",  this.souscription.isCuperieur)
            this.souscriptionService.createSouscription(this.souscription).subscribe(
                resp => {
                    if (resp) {
                        //    this.poste = new Service();
                        this.onHidenDialogue();
                        this.successAlert();
                        this.getAllSouscription();
                    }
                },
                error => {
                    console.error('Erreur lors de la création du poste', error);
                }
            );
        } else if (this.souscription.detailsCredit.isDecouvert === true && this.souscription.detailsCredit.isDiffere === false) {
            console.log("============ if isDecouvert === true ================")
            this.calculateAge();
            console.log("============ onSave this.age ================", this.age)
            this.trouverTauxDecouvert(this.age, this.souscription.detailsCredit.dureeTotaleCredit)
            this.souscription.mandataire.tauxDecouvert = this.tauxDec;
            console.log("============ onSave tauxDecouvert ================", this.souscription.mandataire.tauxDecouvert)
            this.tauxDec1an;
            console.log("============ onSave tauxDec1an ================", this.tauxDec1an)

            this.souscription.mandataire.primeDiffere = 0;

            this.souscription.mandataire.primeDecouvert = (this.souscription.detailsCredit.montantCreditAssurer * (this.souscription.mandataire.tauxDecouvert / 100))

            this.souscription.mandataire.primeTotale =   this.souscription.mandataire.primeDecouvert

            console.log("========== onSave primeTotale isDecouvert =======", this.souscription.mandataire.primeTotale)

            this.souscription.isCuperieur = false;
            console.log("============ isSuperieur ================",  this.souscription.isCuperieur)
            this.souscriptionService.createSouscription(this.souscription).subscribe(
                resp => {
                    if (resp) {
                        //    this.poste = new Service();
                        this.onHidenDialogue();
                        this.successAlert();
                        this.getAllSouscription();
                    }
                },
                error => {
                    console.error('Erreur lors de la création du poste', error);
                }
            );
        } else if (this.souscription.detailsCredit.isDiffere === true && this.souscription.detailsCredit.isDecouvert === true) {
            console.log("============ if isDiffere === true ================")
            this.calculateAge();
            console.log("============ onSave this.age ================", this.age)
            this.trouverTauxDecouvert(this.age, this.souscription.detailsCredit.dureeTotaleCredit)
            this.trouverTauxAmortissement(this.age, this.souscription.detailsCredit.dureeTotaleCredit)
            this.souscription.mandataire.tauxDecouvert = this.tauxDec;
            this.souscription.mandataire.tauxAmortissement = this.taux;
            console.log("============ onSave tauxDecouvert ================", this.souscription.mandataire.tauxDecouvert)
            this.tauxDec1an;
            console.log("============ onSave tauxDec1an ================", this.tauxDec1an)
            console.log("============ onSave primeTotale Normal ================", (this.souscription.detailsCredit.montantCreditAssurer * (this.souscription.mandataire.tauxAmortissement / 100)))
            console.log("============ onSave prime differe ================", (((this.souscription.detailsCredit.montantCreditAssurer * this.tauxDec1an * 1.04) / 12) * this.souscription.detailsCredit.differerAmortissement))
            this.souscription.mandataire.primeDecouvert = (this.souscription.detailsCredit.montantCreditAssurer * (this.souscription.mandataire.tauxDecouvert / 100))

            this.souscription.mandataire.primeDiffere =   (((this.souscription.detailsCredit.montantCreditAssurer * this.tauxDec1an * 1.04) / 1200) * this.souscription.detailsCredit.differerAmortissement);

            this.souscription.mandataire.primeTotale = this.souscription.mandataire.primeDecouvert + this.souscription.mandataire.primeDiffere;

            console.log("========== onSave primeTotale isDiffere =======", this.souscription.mandataire.primeTotale)

            this.souscription.isCuperieur = false;
            console.log("============ isSuperieur ================",  this.souscription.isCuperieur)
            this.souscriptionService.createSouscription(this.souscription).subscribe(
                resp => {
                    if (resp) {
                        //    this.poste = new Service();
                        this.onHidenDialogue();
                        this.successAlert();
                        this.getAllSouscription();
                    }
                },
                error => {
                    console.error('Erreur lors de la création du poste', error);
                }
            );
        }
    }


    updateSouscription(id: number, souscription1: Souscription): void {
        this.souscription.mandataire.tauxDecouvert = this.tauxDec;
        this.souscription.isCuperieur = false;
        if (this.souscription.detailsCredit.isDiffere === false && this.souscription.detailsCredit.isDecouvert === false) {
            console.log("============ isDiffere === false && isDecouvert === false ================")
            this.calculateAge();
            console.log("============ onSave this.age ================", this.age)
            this.trouverTauxAmortissement(this.age, this.souscription.detailsCredit.dureeTotaleCredit)
            this.souscription.mandataire.tauxAmortissement = this.taux;
            console.log("============ onSave tauxAmortissement ================", this.souscription.mandataire.tauxAmortissement)
            this.souscription.mandataire.primeDiffere = 0;
            this.souscription.mandataire.primeDecouvert = 0;
            this.souscription.mandataire.primeSimple =  this.souscription.detailsCredit.montantCreditAssurer * (this.souscription.mandataire.tauxAmortissement / 100);

            this.souscription.mandataire.primeTotale = this.souscription.mandataire.primeSimple;

            console.log("========== onSave primeTotale =======", this.souscription.mandataire.primeTotale)
            this.souscriptionService.updateSouscription(this.souscription.id, this.souscription).subscribe(
                response => {
                    console.log('+++++++++ TEST UPDATE', response.isCuperieur);
                    this.successAlert();
                    this.getAllSouscription();
                },
                error => {
                    console.error('Erreur lors de la mise à jour de la banque:', error);
                }
            );
        } else if (this.souscription.detailsCredit.isDiffere === true && this.souscription.detailsCredit.isDecouvert === false) {
            console.log("============ if isDiffere === true ================")
            this.calculateAge();
            console.log("============ onSave this.age ================", this.age)
            this.trouverTauxDecouvert(this.age, this.souscription.detailsCredit.dureeTotaleCredit)
            this.trouverTauxAmortissement(this.age, this.souscription.detailsCredit.dureeTotaleCredit)
            this.souscription.mandataire.tauxDecouvert = this.tauxDec;
            this.souscription.mandataire.tauxAmortissement = this.taux;
            console.log("============ onSave tauxDecouvert ================", this.souscription.mandataire.tauxDecouvert)
            this.tauxDec1an;
            console.log("============ onSave tauxDec1an ================", this.tauxDec1an)
            console.log("============ onSave primeTotale Normal ================", (this.souscription.detailsCredit.montantCreditAssurer * (this.souscription.mandataire.tauxAmortissement / 100)))
            console.log("============ onSave prime differe ================", (((this.souscription.detailsCredit.montantCreditAssurer * this.tauxDec1an * 1.04) / 12) * this.souscription.detailsCredit.differerAmortissement))

            this.souscription.mandataire.primeDecouvert = 0;
            this.souscription.mandataire.primeSimple =  this.souscription.detailsCredit.montantCreditAssurer * (this.souscription.mandataire.tauxAmortissement / 100);

            this.souscription.mandataire.primeDiffere =  (((this.souscription.detailsCredit.montantCreditAssurer * this.tauxDec1an * 1.04) / 1200) * this.souscription.detailsCredit.differerAmortissement);

            this.souscription.mandataire.primeTotale = this.souscription.mandataire.primeSimple + this.souscription.mandataire.primeDiffere

            console.log("========== onSave primeTotale isDiffere =======", this.souscription.mandataire.primeTotale)
            this.souscriptionService.updateSouscription(this.souscription.id, this.souscription).subscribe(
                response => {
                    console.log('+++++++++ TEST UPDATE', response);
                    this.successAlert();
                    this.getAllSouscription();
                },
                error => {
                    console.error('Erreur lors de la mise à jour de la banque:', error);
                }
            );
        } else if (this.souscription.detailsCredit.isDecouvert === true && this.souscription.detailsCredit.isDiffere === false) {
            console.log("============ if isDecouvert === true ================")
            this.calculateAge();
            console.log("============ onSave this.age ================", this.age)
            this.trouverTauxDecouvert(this.age, this.souscription.detailsCredit.dureeTotaleCredit)
            this.souscription.mandataire.tauxDecouvert = this.tauxDec;
            console.log("============ onSave tauxDecouvert ================", this.souscription.mandataire.tauxDecouvert)
            this.tauxDec1an;
            console.log("============ onSave tauxDec1an ================", this.tauxDec1an)
            this.souscription.mandataire.primeDecouvert = 0;
            this.souscription.mandataire.primeDecouvert = (this.souscription.detailsCredit.montantCreditAssurer * (this.souscription.mandataire.tauxDecouvert / 100))

            this.souscription.mandataire.primeTotale =   this.souscription.mandataire.primeDiffere

            console.log("========== onSave primeTotale isDecouvert =======", this.souscription.mandataire.primeTotale)
            this.souscriptionService.updateSouscription(this.souscription.id, this.souscription).subscribe(
                response => {
                    console.log('+++++++++ TEST UPDATE', response);
                    this.successAlert();
                    this.getAllSouscription();
                },
                error => {
                    console.error('Erreur lors de la mise à jour de la banque:', error);
                }
            );
        } else if (this.souscription.detailsCredit.isDiffere === true && this.souscription.detailsCredit.isDecouvert === true) {
            console.log("============ if isDiffere === true ================")
            this.calculateAge();
            console.log("============ onSave this.age ================", this.age)
            this.trouverTauxDecouvert(this.age, this.souscription.detailsCredit.dureeTotaleCredit)
            this.trouverTauxAmortissement(this.age, this.souscription.detailsCredit.dureeTotaleCredit)
            this.souscription.mandataire.tauxDecouvert = this.tauxDec;
            this.souscription.mandataire.tauxAmortissement = this.taux;
            console.log("============ onSave tauxDecouvert ================", this.souscription.mandataire.tauxDecouvert)
            this.tauxDec1an;
            console.log("============ onSave tauxDec1an ================", this.tauxDec1an)
            console.log("============ onSave primeTotale Normal ================", (this.souscription.detailsCredit.montantCreditAssurer * (this.souscription.mandataire.tauxAmortissement / 100)))
            console.log("============ onSave prime differe ================", (((this.souscription.detailsCredit.montantCreditAssurer * this.tauxDec1an * 1.04) / 12) * this.souscription.detailsCredit.differerAmortissement))
            this.souscription.mandataire.primeDecouvert = (this.souscription.detailsCredit.montantCreditAssurer * (this.souscription.mandataire.tauxDecouvert / 100))

            this.souscription.mandataire.primeDiffere =   (((this.souscription.detailsCredit.montantCreditAssurer * this.tauxDec1an * 1.04) / 1200) * this.souscription.detailsCredit.differerAmortissement);

            this.souscription.mandataire.primeTotale = this.souscription.mandataire.primeDecouvert + this.souscription.mandataire.primeDiffere;

            console.log("========== onSave primeTotale isDiffere =======", this.souscription.mandataire.primeTotale)
            this.souscriptionService.updateSouscription(this.souscription.id, this.souscription).subscribe(
                response => {
                    console.log('+++++++++ TEST UPDATE', response);
                    this.successAlert();
                    this.getAllSouscription();
                },
                error => {
                    console.error('Erreur lors de la mise à jour de la banque:', error);
                }
            );
        }

        this.onHidenDialogueModif();
    }


    trouverTauxAmortissement(trancheAge, duree) {

        console.log("============ trancheAge duree ===============", trancheAge, duree)
        // Matrice des taux
        const TauxAmortissement = [
            [0.151, 0.300, 0.456, 0.620, 0.788, 0.961, 1.137, 1.316, 1.498, 1.682, 1.869, 2.057, 2.247, 2.438, 2.630, 2.823, 3.017, 3.212, 3.409, 3.608],
            [0.161, 0.316, 0.479, 0.646, 0.817, 0.993, 1.171, 1.353, 1.538, 1.725, 1.914, 2.105, 2.298, 2.492, 2.688, 2.884, 3.083, 3.284, 3.487, 3.692],
            [0.166, 0.327, 0.492, 0.662, 0.835, 1.013, 1.194, 1.378, 1.565, 1.755, 1.947, 2.142, 2.338, 2.535, 2.735, 2.936, 3.140, 3.347, 3.557, 3.771],
            [0.170, 0.333, 0.500, 0.672, 0.847, 1.027, 1.210, 1.397, 1.587, 1.780, 1.976, 2.173, 2.372, 2.574, 2.779, 2.986, 3.197, 3.411, 3.628, 3.850],
            [0.172, 0.336, 0.505, 0.679, 0.857, 1.039, 1.225, 1.415, 1.608, 1.804, 2.002, 2.203, 2.407, 2.614, 2.825, 3.039, 3.257, 3.479, 3.705, 3.938],
            [0.173, 0.340, 0.511, 0.687, 0.867, 1.052, 1.241, 1.434, 1.630, 1.829, 2.031, 2.237, 2.446, 2.659, 2.876, 3.098, 3.324, 3.556, 3.793, 4.037],
            [0.175, 0.344, 0.517, 0.696, 0.879, 1.067, 1.259, 1.455, 1.654, 1.857, 2.064, 2.275, 2.491, 2.711, 2.936, 3.166, 3.402, 3.644, 3.894, 4.150],
            [0.178, 0.348, 0.524, 0.706, 0.892, 1.083, 1.279, 1.478, 1.681, 1.889, 2.101, 2.319, 2.542, 2.770, 3.004, 3.244, 3.491, 3.746, 4.009, 4.279],
            [0.181, 0.354, 0.533, 0.718, 0.907, 1.101, 1.300, 1.503, 1.711, 1.925, 2.144, 2.369, 2.600, 2.838, 3.082, 3.334, 3.594, 3.863, 4.140, 4.427],
            [0.184, 0.360, 0.542, 0.730, 0.922, 1.120, 1.323, 1.531, 1.745, 1.966, 2.193, 2.426, 2.667, 2.915, 3.172, 3.437, 3.711, 3.995, 4.288, 4.592],
            [0.187, 0.366, 0.551, 0.742, 0.938, 1.139, 1.347, 1.562, 1.783, 2.012, 2.248, 2.491, 2.743, 3.004, 3.274, 3.554, 3.844, 4.144, 4.456, 4.777],
            [0.190, 0.372, 0.560, 0.754, 0.955, 1.162, 1.376, 1.598, 1.828, 2.066, 2.312, 2.567, 2.832, 3.106, 3.392, 3.688, 3.995, 4.314, 4.644, 4.983],
            [0.193, 0.378, 0.570, 0.768, 0.974, 1.188, 1.410, 1.641, 1.880, 2.129, 2.387, 2.655, 2.934, 3.225, 3.527, 3.841, 4.167, 4.505, 4.853, 5.212],
            [0.196, 0.384, 0.581, 0.785, 0.998, 1.221, 1.452, 1.693, 1.943, 2.204, 2.475, 2.759, 3.054, 3.362, 3.683, 4.016, 4.362, 4.719, 5.087, 5.465],
            [0.200, 0.394, 0.597, 0.809, 1.031, 1.263, 1.504, 1.756, 2.019, 2.294, 2.581, 2.881, 3.195, 3.522, 3.862, 4.216, 4.582, 4.959, 5.347, 5.744],
            [0.207, 0.408, 0.619, 0.840, 1.071, 1.313, 1.566, 1.831, 2.109, 2.400, 2.704, 3.023, 3.356, 3.703, 4.065, 4.439, 4.825, 5.223, 5.630, 6.048],
            [0.215, 0.425, 0.645, 0.876, 1.118, 1.372, 1.638, 1.918, 2.212, 2.520, 2.844, 3.183, 3.537, 3.905, 4.288, 4.683, 5.090, 5.508, 5.937, 6.375],
            [0.224, 0.442, 0.672, 0.914, 1.168, 1.436, 1.718, 2.014, 2.327, 2.655, 2.999, 3.359, 3.735, 4.126, 4.530, 4.946, 5.375, 5.814, 6.263, 6.722],
            [0.234, 0.463, 0.704, 0.958, 1.226, 1.509, 1.809, 2.124, 2.457, 2.806, 3.172, 3.555, 3.953, 4.365, 4.791, 5.229, 5.679, 6.140, 6.611, 7.092],
            [0.245, 0.485, 0.739, 1.007, 1.291, 1.593, 1.911, 2.247, 2.601, 2.973, 3.362, 3.768, 4.188, 4.623, 5.071, 5.531, 6.003, 6.486, 6.980, 7.483],
            [0.258, 0.510, 0.779, 1.064, 1.367, 1.688, 2.027, 2.386, 2.763, 3.158, 3.570, 3.999, 4.442, 4.899, 5.370, 5.853, 6.347, 6.853, 7.370, 7.897],
            [0.272, 0.540, 0.826, 1.130, 1.453, 1.796, 2.158, 2.540, 2.940, 3.359, 3.795, 4.246, 4.712, 5.192, 5.686, 6.192, 6.710, 7.240, 7.781, 8.334],
            [0.289, 0.575, 0.880, 1.205, 1.550, 1.915, 2.301, 2.707, 3.131, 3.574, 4.033, 4.507, 4.997, 5.500, 6.017, 6.548, 7.090, 7.645, 8.212, 8.795],
            [0.310, 0.615, 0.941, 1.288, 1.656, 2.045, 2.455, 2.885, 3.333, 3.799, 4.281, 4.780, 5.293, 5.821, 6.362, 6.917, 7.485, 8.068, 8.666, 9.282],
            [0.331, 0.657, 1.005, 1.375, 1.767, 2.181, 2.615, 3.069, 3.541, 4.030, 4.536, 5.058, 5.596, 6.149, 6.716, 7.297, 7.893, 8.507, 9.140, 9.792],
            [0.354, 0.702, 1.074, 1.468, 1.884, 2.322, 2.780, 3.257, 3.753, 4.266, 4.797, 5.344, 5.907, 6.485, 7.079, 7.690, 8.319, 8.967, 9.638, 10.333],
            [0.378, 0.750, 1.145, 1.564, 2.004, 2.465, 2.947, 3.448, 3.967, 4.505, 5.061, 5.634, 6.223, 6.829, 7.453, 8.097, 8.762, 9.451, 10.165, 10.904],
            [0.403, 0.799, 1.218, 1.660, 2.124, 2.609, 3.114, 3.639, 4.183, 4.747, 5.329, 5.928, 6.546, 7.183, 7.841, 8.523, 9.229, 9.962, 10.723, 11.511],
            [0.428, 0.847, 1.290, 1.755, 2.242, 2.750, 3.279, 3.829, 4.399, 4.989, 5.599, 6.227, 6.876, 7.549, 8.246, 8.970, 9.723, 10.505, 11.316, 12.158],
            [0.452, 0.894, 1.359, 1.847, 2.357, 2.890, 3.444, 4.020, 4.617, 5.235, 5.874, 6.535, 7.221, 7.934, 8.675, 9.447, 10.250, 11.085, 11.952, 12.851],
            [0.476, 0.940, 1.427, 1.938, 2.473, 3.031, 3.612, 4.215, 4.841, 5.489, 6.161, 6.860, 7.587, 8.346, 9.137, 9.961, 10.820, 11.712, 12.639, 13.598],
            [0.499, 0.985, 1.496, 2.032, 2.592, 3.177, 3.785, 4.418, 5.074, 5.756, 6.467, 7.209, 7.985, 8.795, 9.640, 10.522, 11.440, 12.394, 13.383, 14.403],
            [0.523, 1.032, 1.568, 2.129, 2.716, 3.329, 3.967, 4.631, 5.323, 6.045, 6.801, 7.592, 8.421, 9.288, 10.192, 11.136, 12.119, 13.137, 14.190, 15.273],
            [0.548, 1.083, 1.644, 2.233, 2.849, 3.492, 4.162, 4.862, 5.595, 6.364, 7.171, 8.018, 8.905, 9.833, 10.803, 11.813, 12.862, 13.947, 15.065, 16.213],
            [0.576, 1.136, 1.725, 2.343, 2.989, 3.664, 4.372, 5.115, 5.896, 6.718, 7.583, 8.490, 9.441, 10.437, 11.475, 12.555, 13.673, 14.826, 16.011, 17.225],
            [0.604, 1.192, 1.811, 2.459, 3.138, 3.852, 4.604, 5.397, 6.233, 7.115, 8.043, 9.017, 10.038, 11.105, 12.215, 13.366, 14.554, 15.777, 17.031, 18.313],
            [0.635, 1.252, 1.901, 2.583, 3.303, 4.063, 4.867, 5.717, 6.616, 7.563, 8.560, 9.606, 10.701, 11.843, 13.027, 14.251, 15.512, 16.806, 18.130, 19.482],
            [0.666, 1.314, 1.998, 2.722, 3.490, 4.304, 5.168, 6.083, 7.050, 8.069, 9.140, 10.264, 11.436, 12.654, 13.914, 15.213, 16.548, 17.915, 19.312, 20.734],
            [0.699, 1.384, 2.112, 2.887, 3.712, 4.589, 5.520, 6.506, 7.546, 8.643, 9.794, 10.997, 12.248, 13.544, 14.882, 16.258, 17.668, 19.111, 20.581, 22.075],
            [0.744, 1.476, 2.258, 3.092, 3.982, 4.929, 5.933, 6.995, 8.115, 9.294, 10.527, 11.812, 13.144, 14.520, 15.937, 17.391, 18.880, 20.398, 21.942, 23.509],
            [0.797, 1.586, 2.429, 3.331, 4.293, 5.314, 6.397, 7.542, 8.747, 10.011, 11.328, 12.695, 14.110, 15.568, 17.067, 18.601, 20.169, 21.764, 23.385, 25.025],
            [0.864, 1.716, 2.629, 3.605, 4.644, 5.747, 6.914, 8.146, 9.439, 10.789, 12.191, 13.644, 15.143, 16.686, 18.268, 19.885, 21.532, 23.207, 24.905, 26.620],
            [0.932, 1.856, 2.846, 3.901, 5.023, 6.213, 7.470, 8.792, 10.174, 11.611, 13.102, 14.643, 16.230, 17.859, 19.526, 21.227, 22.958, 24.713, 26.490, 28.283],
            [1.015, 2.017, 3.087, 4.228, 5.439, 6.722, 8.072, 9.484, 10.956, 12.485, 14.066, 15.697, 17.374, 19.092, 20.847, 22.635, 24.450, 26.289, 28.147, 30.020],
            [1.100, 2.184, 3.341, 4.573, 5.880, 7.257, 8.700, 10.206, 11.771, 13.394, 15.069, 16.794, 18.563, 20.373, 22.219, 24.096, 25.999, 27.924, 29.867, 31.824],
            [1.188, 2.362, 3.614, 4.944, 6.347, 7.820, 9.359, 10.961, 12.623, 14.343, 16.116, 17.937, 19.803, 21.708, 23.647, 25.616, 27.610, 29.626, 31.658, 33.702],
            [1.291, 2.562, 3.915, 5.344, 6.844, 8.415, 10.052, 11.754, 13.517, 15.338, 17.212, 19.133, 21.099, 23.102, 25.139, 27.205, 29.294, 31.404, 33.529, 35.662],
            [1.397, 2.771, 4.223, 5.750, 7.351, 9.022, 10.763, 12.570, 14.438, 16.365, 18.343, 20.370, 22.439, 24.546, 26.685, 28.852, 31.043, 33.252, 35.471, 37.692]
        ];
        // Trouver l'indice de la tranche d'âge
        const indiceTrancheAge = trancheAge - 18;

        // Trouver l'indice de la durée
        const indiceDuree = duree - 1;

        // Vérifier si les indices sont valides
        if (indiceTrancheAge >= 0 && indiceTrancheAge < TauxAmortissement.length && indiceDuree >= 0 && indiceDuree < TauxAmortissement[0].length) {
            // Récupérer le taux correspondant
            this.taux = TauxAmortissement[indiceTrancheAge][indiceDuree];
            return this.taux;
        } else {
            // Indices invalides, renvoyer un message d'erreur
            console.log("============ Indices de tranche d'âge ou de durée invalides ===============")
            return "Indices de tranche d'âge ou de durée invalides.";
        }
    }

    trouverTauxDecouvert(trancheAge, duree) {

        console.log("============ trancheAge duree ===============", trancheAge, duree)
        // Matrice des taux
        const TauxDecouvert = [
            [0.272, 0.552, 0.831, 1.106, 1.375, 1.636, 1.892, 2.141, 2.385, 2.625, 2.859, 3.090, 3.316, 3.536, 3.754, 3.971, 4.189, 4.407, 4.627, 4.849],
            [0.290, 0.579, 0.865, 1.143, 1.414, 1.678, 1.936, 2.190, 2.438, 2.681, 2.920, 3.154, 3.383, 3.609, 3.833, 4.059, 4.285, 4.513, 4.743, 4.976],
            [0.300, 0.596, 0.884, 1.165, 1.439, 1.707, 1.969, 2.227, 2.479, 2.727, 2.969, 3.206, 3.440, 3.673, 3.907, 4.141, 4.378, 4.616, 4.858, 5.104],
            [0.306, 0.606, 0.897, 1.181, 1.458, 1.730, 1.997, 2.259, 2.515, 2.767, 3.013, 3.255, 3.496, 3.739, 3.982, 4.227, 4.474, 4.724, 4.979, 5.240],
            [0.310, 0.612, 0.907, 1.194, 1.476, 1.753, 2.024, 2.290, 2.551, 2.805, 3.057, 3.307, 3.558, 3.810, 4.064, 4.321, 4.580, 4.844, 5.115, 5.393],
            [0.313, 0.618, 0.916, 1.209, 1.496, 1.777, 2.052, 2.323, 2.587, 2.848, 3.107, 3.368, 3.629, 3.892, 4.158, 4.427, 4.701, 4.981, 5.270, 5.567],
            [0.317, 0.626, 0.929, 1.226, 1.517, 1.803, 2.084, 2.358, 2.628, 2.897, 3.167, 3.438, 3.711, 3.986, 4.265, 4.549, 4.840, 5.139, 5.447, 5.763],
            [0.320, 0.635, 0.943, 1.245, 1.541, 1.832, 2.116, 2.396, 2.675, 2.955, 3.236, 3.519, 3.805, 4.094, 4.388, 4.689, 5.000, 5.319, 5.647, 5.984],
            [0.326, 0.645, 0.959, 1.266, 1.567, 1.862, 2.152, 2.441, 2.732, 3.023, 3.316, 3.612, 3.912, 4.217, 4.530, 4.852, 5.182, 5.523, 5.872, 6.231],
            [0.331, 0.656, 0.975, 1.287, 1.593, 1.894, 2.194, 2.495, 2.797, 3.101, 3.408, 3.719, 4.035, 4.359, 4.693, 5.036, 5.389, 5.751, 6.123, 6.503],
            [0.337, 0.667, 0.991, 1.308, 1.620, 1.931, 2.243, 2.556, 2.872, 3.190, 3.512, 3.841, 4.176, 4.522, 4.878, 5.244, 5.620, 6.005, 6.399, 6.799],
            [0.343, 0.679, 1.007, 1.331, 1.653, 1.977, 2.301, 2.629, 2.959, 3.293, 3.633, 3.981, 4.340, 4.709, 5.088, 5.478, 5.878, 6.286, 6.701, 7.119],
            [0.348, 0.689, 1.025, 1.359, 1.695, 2.031, 2.371, 2.713, 3.059, 3.412, 3.773, 4.145, 4.528, 4.921, 5.326, 5.740, 6.164, 6.593, 7.027, 7.465],
            [0.353, 0.702, 1.048, 1.396, 1.745, 2.097, 2.452, 2.812, 3.178, 3.552, 3.938, 4.335, 4.743, 5.162, 5.592, 6.031, 6.476, 6.927, 7.380, 7.836],
            [0.361, 0.721, 1.082, 1.444, 1.809, 2.177, 2.550, 2.929, 3.318, 3.718, 4.129, 4.552, 4.987, 5.433, 5.888, 6.351, 6.818, 7.288, 7.761],
            [0.373, 0.747, 1.123, 1.501, 1.883, 2.270, 2.663, 3.066, 3.481, 3.908, 4.347, 4.798, 5.260, 5.733, 6.212, 6.696, 7.184, 7.674, 8.168],
            [0.388, 0.778, 1.171, 1.567, 1.968, 2.376, 2.794, 3.225, 3.667, 4.122, 4.590, 5.070, 5.560, 6.057, 6.559, 7.065, 7.574, 8.086, 8.600],
            [0.404, 0.812, 1.222, 1.639, 2.062, 2.496, 2.942, 3.401, 3.874, 4.359, 4.857, 5.365, 5.881, 6.402, 6.927, 7.454, 7.985, 8.519, 9.057],
            [0.423, 0.849, 1.281, 1.720, 2.170, 2.633, 3.110, 3.600, 4.103, 4.620, 5.147, 5.682, 6.223, 6.768, 7.315, 7.866, 8.420, 8.978, 9.539],
            [0.442, 0.890, 1.347, 1.813, 2.294, 2.789, 3.297, 3.820, 4.356, 4.903, 5.458, 6.019, 6.585, 7.153, 7.724, 8.299, 8.878, 9.460, 10.045],
            [0.465, 0.938, 1.423, 1.922, 2.435, 2.963, 3.505, 4.061, 4.629, 5.206, 5.788, 6.375, 6.965, 7.558, 8.155, 8.755, 9.359, 9.967, 10.577],
            [0.491, 0.994, 1.512, 2.045, 2.593, 3.156, 3.734, 4.323, 4.922, 5.526, 6.135, 6.747, 7.363, 7.983, 8.606, 9.233, 9.864, 10.497, 11.142],
            [0.522, 1.060, 1.613, 2.182, 2.767, 3.366, 3.979, 4.600, 5.228, 5.860, 6.496, 7.135, 7.779, 8.426, 9.077, 9.732, 10.389, 11.059, 11.745],
            [0.559, 1.133, 1.724, 2.331, 2.954, 3.590, 4.236, 4.888, 5.544, 6.205, 6.869, 7.537, 8.209, 8.886, 9.566, 10.249, 10.944, 11.657, 12.394],
            [0.597, 1.211, 1.842, 2.489, 3.149, 3.820, 4.497, 5.180, 5.866, 6.556, 7.250, 7.948, 8.651, 9.358, 10.067, 10.790, 11.530, 12.296, 13.085],
            [0.638, 1.294, 1.966, 2.653, 3.350, 4.054, 4.763, 5.476, 6.193, 6.915, 7.640, 8.371, 9.105, 9.843, 10.594, 11.363, 12.159, 12.979, 13.829],
            [0.682, 1.381, 2.095, 2.819, 3.551, 4.289, 5.030, 5.775, 6.525, 7.280, 8.040, 8.803, 9.570, 10.351, 11.150, 11.978, 12.830, 13.715, 14.627],
            [0.727, 1.470, 2.223, 2.985, 3.752, 4.522, 5.298, 6.078, 6.863, 7.653, 8.447, 9.244, 10.057, 10.888, 11.749, 12.636, 13.555, 14.505, 15.479],
            [0.773, 1.557, 2.349, 3.147, 3.949, 4.756, 5.568, 6.384, 7.206, 8.032, 8.862, 9.707, 10.573, 11.468, 12.391, 13.348, 14.335, 15.349, 16.395],
            [0.816, 1.641, 2.471, 3.306, 4.146, 4.991, 5.841, 6.697, 7.557, 8.420, 9.300, 10.201, 11.133, 12.093, 13.089, 14.117, 15.172, 16.261, 17.378],
            [0.859, 1.724, 2.593, 3.467, 4.347, 5.232, 6.123, 7.019, 7.918, 8.834, 9.772, 10.743, 11.743, 12.780, 13.850, 14.949, 16.083, 17.245, 18.434],
            [0.901, 1.806, 2.717, 3.634, 4.556, 5.484, 6.417, 7.354, 8.308, 9.285, 10.296, 11.337, 12.418, 13.533, 14.678, 15.858, 17.070, 18.308, 19.558],
            [0.943, 1.893, 2.848, 3.809, 4.776, 5.748, 6.724, 7.719, 8.736, 9.790, 10.875, 12.001, 13.163, 14.356, 15.587, 16.849, 18.139, 19.441, 20.755],
            [0.990, 1.985, 2.987, 3.995, 5.008, 6.026, 7.063, 8.124, 9.222, 10.354, 11.527, 12.739, 13.982, 15.265, 16.580, 17.925, 19.283, 20.652, 22.030],
            [1.038, 2.083, 3.134, 4.191, 5.252, 6.333, 7.440, 8.586, 9.765, 10.989, 12.253, 13.549, 14.887, 16.259, 17.662, 19.078, 20.505, 21.943, 23.388],
            [1.090, 2.187, 3.289, 4.396, 5.524, 6.679, 7.874, 9.105, 10.382, 11.700, 13.053, 14.448, 15.880, 17.343, 18.820, 20.310, 21.810, 23.318, 24.832],
            [1.145, 2.296, 3.451, 4.629, 5.834, 7.081, 8.366, 9.699, 11.074, 12.486, 13.943, 15.437, 16.965, 18.507, 20.062, 21.627, 23.201, 24.781, 26.363, 27.943],
            [1.202, 2.408, 3.638, 4.896, 6.199, 7.541, 8.933, 10.369, 11.844, 13.365, 14.925, 16.521, 18.131, 19.754, 21.389, 23.032, 24.683, 26.335, 27.985, 29.629],
            [1.261, 2.545, 3.860, 5.221, 6.623, 8.077, 9.578, 11.119, 12.708, 14.338, 16.005, 17.687, 19.384, 21.091, 22.809, 24.533, 26.259, 27.983, 29.700, 31.409],
            [1.343, 2.717, 4.140, 5.605, 7.126, 8.694, 10.305, 11.966, 13.670, 15.413, 17.171, 18.944, 20.729, 22.525, 24.327, 26.132, 27.933, 29.729, 31.515, 33.289],
            [1.438, 2.926, 4.459, 6.049, 7.690, 9.375, 11.113, 12.896, 14.718, 16.558, 18.413, 20.280, 22.158, 24.043, 25.931, 27.816, 29.694, 31.562, 33.418, 35.258],
            [1.558, 3.163, 4.828, 6.546, 8.310, 10.130, 11.996, 13.904, 15.830, 17.772, 19.727, 21.693, 23.667, 25.643, 27.617, 29.583, 31.539, 33.482, 35.409, 37.315],
            [1.682, 3.427, 5.228, 7.076, 8.983, 10.939, 12.939, 14.958, 16.993, 19.042, 21.102, 23.171, 25.243, 27.311, 29.371, 31.421, 33.458, 35.477, 37.476, 39.454],
            [1.831, 3.720, 5.660, 7.661, 9.713, 11.811, 13.929, 16.064, 18.214, 20.376, 22.546, 24.720, 26.890, 29.052, 31.202, 33.339, 35.458, 37.554, 39.630, 41.687],
            [1.985, 4.022, 6.124, 8.280, 10.485, 12.709, 14.953, 17.211, 19.483, 21.763, 24.046, 26.326, 28.597, 30.857, 33.102, 35.327, 37.530, 39.711, 41.871, 44.007],
            [2.143, 4.355, 6.623, 8.942, 11.282, 13.642, 16.018, 18.407, 20.806, 23.208, 25.606, 27.996, 30.373, 32.735, 35.076, 37.393, 39.687, 41.960, 44.207, 46.418],
            [2.330, 4.719, 7.162, 9.627, 12.114, 14.616, 17.133, 19.661, 22.191, 24.717, 27.234, 29.738, 32.226, 34.693, 37.134, 39.551, 41.945, 44.312, 46.641, 48.912],
            [2.521, 5.099, 7.700, 10.324, 12.965, 15.621, 18.287, 20.957, 23.623, 26.279, 28.921, 31.547, 34.149, 36.725, 39.275, 41.801, 44.299, 46.757, 49.153, 51.465]

        ];

        // Trouver l'indice de la tranche d'âge
        const indiceTrancheAge = trancheAge - 18;

        // Trouver l'indice de la durée
        const indiceDuree = duree - 1;

        // Vérifier si les indices sont valides
        if (indiceTrancheAge >= 0 && indiceTrancheAge < TauxDecouvert.length && indiceDuree >= 0 && indiceDuree < TauxDecouvert[0].length) {
            // Récupérer le taux correspondant
            this.tauxDec = TauxDecouvert[indiceTrancheAge][indiceDuree];
            this.tauxDec1an = TauxDecouvert[indiceTrancheAge][0];
            return this.tauxDec;
        } else {
            // Indices invalides, renvoyer un message d'erreur
            console.log("============ Indices de tranche d'âge ou de durée invalides ===============")
            return "Indices de tranche d'âge ou de durée invalides.";
        }
    }

// Exemple d'utilisation de la fonction


}
