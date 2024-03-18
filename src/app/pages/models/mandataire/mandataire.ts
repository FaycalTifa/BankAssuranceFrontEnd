export class Mandataire {
    public id?: number;
    public capitalAssurer?: number;
    public primeGarantieDecesOuIAD?: number;
    public primeGarantiePerteEmploi?: number;
    public primeTotale?: number;
    public numeroDeCompteUABVie?: string;

    constructor(
        id?: number,
        capitalAssurer?: number,
        primeGarantieDecesOuIAD?: number,
        primeGarantiePerteEmploi?: number,
        primeTotale?: number,
        numeroDeCompteUABVie?: string,
    ) {
        this.id = id;
        this.capitalAssurer = capitalAssurer;
        this.primeGarantieDecesOuIAD = primeGarantieDecesOuIAD;
        this.primeGarantiePerteEmploi = primeGarantiePerteEmploi;
        this.primeTotale = primeTotale;
        this.numeroDeCompteUABVie = numeroDeCompteUABVie;
    }


}
