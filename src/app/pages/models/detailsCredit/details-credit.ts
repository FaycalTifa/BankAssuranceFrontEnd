<<<<<<< HEAD
import {Agence} from "../agence/agence";
import {PeriodiciteRemboursement} from "../periodiciteRemboursement/periodicite-remboursement";
import {Banque} from "../banque/banque";

export class DetailsCredit {

    public id?: number;
    public montantCreditAssurer: number;
    public montantCreditDecouvert: number;
    public nombreDeRemboursement: number;
    public montantDesTermes: number;
    public numeroCompteClient: number;
    public dureeTotaleCredit: number;
    public differerAmortissement: number;
    public datePremierRemboursementTerme: Date;
    public dateEffet: Date;
    public dateEcheance: Date;
    public periodiciteRemboursement?: PeriodiciteRemboursement;
=======
export class DetailsCredit {
    public id?: number;
    public montantCreditAssurer?: number;
    public montantCreditDecouvert?: number;
    public nombreDeRemboursement?: string;
    public montantDesTermes?: number;
    public numeroCompteClient?: string;
    public dureeTotaleCredit?: string;
    public differerAmortissement?: string;
    public datePremierRemboursementTerme?: string;
    public dateEffet?: string;
    public dateEcheance?: string;

>>>>>>> a571eba1fc0da4d32585e36d590399c89b0102b2

    constructor(
        id?: number,
        montantCreditAssurer?: number,
        montantCreditDecouvert?: number,
<<<<<<< HEAD
        nombreDeRemboursement?: number,
        montantDesTermes?: number,
        numeroCompteClient?: number,
        dureeTotaleCredit?: number,
        differerAmortissement?: number,
        datePremierRemboursementTerme?: Date,
        dateEffet?: Date,
        dateEcheance?: Date,
        periodiciteRemboursement?: PeriodiciteRemboursement,
=======
        nombreDeRemboursement?: string,
        montantDesTermes?: number,
        numeroCompteClient?: string,
        dureeTotaleCredit?: string,
        differerAmortissement?: string,
        datePremierRemboursementTerme?: string,
        dateEffet?: string,
        dateEcheance?: string,
>>>>>>> a571eba1fc0da4d32585e36d590399c89b0102b2

    ) {
        this.id = id;
        this.montantCreditAssurer = montantCreditAssurer;
<<<<<<< HEAD
        this.montantCreditDecouvert = montantCreditAssurer;
=======
        this.montantCreditDecouvert = montantCreditDecouvert;
>>>>>>> a571eba1fc0da4d32585e36d590399c89b0102b2
        this.nombreDeRemboursement = nombreDeRemboursement;
        this.montantDesTermes = montantDesTermes;
        this.numeroCompteClient = numeroCompteClient;
        this.dureeTotaleCredit = dureeTotaleCredit;
        this.differerAmortissement = differerAmortissement;
        this.datePremierRemboursementTerme = datePremierRemboursementTerme;
        this.dateEffet = dateEffet;
        this.dateEcheance = dateEcheance;
<<<<<<< HEAD
        this.periodiciteRemboursement = periodiciteRemboursement;

    }

}
=======
    }
}

>>>>>>> a571eba1fc0da4d32585e36d590399c89b0102b2
