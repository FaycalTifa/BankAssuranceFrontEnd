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

    constructor(
        id?: number,
        montantCreditAssurer?: number,
        montantCreditDecouvert?: number,
        nombreDeRemboursement?: number,
        montantDesTermes?: number,
        numeroCompteClient?: number,
        dureeTotaleCredit?: number,
        differerAmortissement?: number,
        datePremierRemboursementTerme?: Date,
        dateEffet?: Date,
        dateEcheance?: Date,
        periodiciteRemboursement?: PeriodiciteRemboursement,

    ) {
        this.id = id;
        this.montantCreditAssurer = montantCreditAssurer;
        this.montantCreditDecouvert = montantCreditAssurer;
        this.nombreDeRemboursement = nombreDeRemboursement;
        this.montantDesTermes = montantDesTermes;
        this.numeroCompteClient = numeroCompteClient;
        this.dureeTotaleCredit = dureeTotaleCredit;
        this.differerAmortissement = differerAmortissement;
        this.datePremierRemboursementTerme = datePremierRemboursementTerme;
        this.dateEffet = dateEffet;
        this.dateEcheance = dateEcheance;
        this.periodiciteRemboursement = periodiciteRemboursement;

    }

}
