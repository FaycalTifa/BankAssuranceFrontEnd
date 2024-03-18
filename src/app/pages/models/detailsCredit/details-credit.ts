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


    constructor(
        id?: number,
        montantCreditAssurer?: number,
        montantCreditDecouvert?: number,
        nombreDeRemboursement?: string,
        montantDesTermes?: number,
        numeroCompteClient?: string,
        dureeTotaleCredit?: string,
        differerAmortissement?: string,
        datePremierRemboursementTerme?: string,
        dateEffet?: string,
        dateEcheance?: string,
    ) {
        this.id = id;
        this.montantCreditAssurer = montantCreditAssurer;
        this.montantCreditDecouvert = montantCreditDecouvert;
        this.nombreDeRemboursement = nombreDeRemboursement;
        this.montantDesTermes = montantDesTermes;
        this.numeroCompteClient = numeroCompteClient;
        this.dureeTotaleCredit = dureeTotaleCredit;
        this.differerAmortissement = differerAmortissement;
        this.datePremierRemboursementTerme = datePremierRemboursementTerme;
        this.dateEffet = dateEffet;
        this.dateEcheance = dateEcheance;
    }
}
