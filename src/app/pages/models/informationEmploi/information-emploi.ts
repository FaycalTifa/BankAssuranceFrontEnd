export class InformationEmploi {
    public id?: number;
    public employeur?: string;
    public dateEmbauche?: string;
    public adresseEmployeur?: string;
    public professionActuelle?: string;
    public typeDeContrat?: string;
    public telEmployeur?: string;
    public numeroCNSS?: string;
    public numeroRCCMIFU?: string;

    constructor(
        id?: number,
        employeur?: string,
        dateEmbauche?: string,
        adresseEmployeur?: string,
        professionActuelle?: string,
        typeDeContrat?: string,
        telEmployeur?: string,
        numeroCNSS?: string,
        numeroRCCMIFU?: string,



    ) {
        this.employeur = employeur;
        this.dateEmbauche = dateEmbauche;
        this.adresseEmployeur = adresseEmployeur;
        this.professionActuelle = professionActuelle;
        this.typeDeContrat = typeDeContrat;
        this.telEmployeur = telEmployeur;
        this.numeroCNSS = numeroCNSS;
        this.numeroRCCMIFU = numeroRCCMIFU;
    }

}
