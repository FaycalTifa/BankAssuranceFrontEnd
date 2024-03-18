// souscription.model.ts

export interface Souscription {
    id?: number;
    personne: Personne;
    detailsCredit: DetailsCredit;
    questionnaireMedical: QuestionnaireMedical;
    mandataire: Mandataire;
    informationEmploi: InformationEmploi;
}

export interface Personne {
    id?: number,
    nom?: string,
    prenom?: string,
    nomDeJeuneFille?: string,
    dateDeNaissance?: string,
    lieuDeNaissance?: string,
    taille?: number,
    poids?: number,
    tension?: string,
    professionActuelle?: string,
    employeur?: string,
    numeroPiecePasseport?: string,
    dateEtablissement?: string,
    lieuEtablissement?: string,
    adressePostale?: string,
    telephone?: string,
    email?: string,
    telephoneSecours?: string,
    emailSecours?: string,
    adresseSecours?: string
}

export interface DetailsCredit {
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
}

export interface QuestionnaireMedical {
    id?: number,
    question1?: boolean,
    question2?: boolean,
    question3?: boolean,
    question4?: boolean,
    question5?: boolean,
    detail1?: string,
    detail2?: string,
    detail3?: string,
    detail4?: string,
    detail5?: string,
}

export interface Mandataire {
    id?: number,
    capitalAssurer?: number,
    primeGarantieDecesOuIAD?: number,
    primeGarantiePerteEmploi?: number,
    primeTotale?: number,
    numeroDeCompteUABVie?: string,
}

export interface InformationEmploi {
    id?: number,
    employeur?: string,
    dateEmbauche?: string,
    adresseEmployeur?: string,
    professionActuelle?: string,
    typeDeContrat?: string,
    telEmployeur?: string,
    numeroCNSS?: string,
    numeroRCCMIFU?: string,
}
