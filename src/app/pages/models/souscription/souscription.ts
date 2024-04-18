// souscription.model.ts


export interface Souscription {
    id?: number;
    isCuperieur?: boolean;
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
    adresseSecours?: string,
    civilite: Civilite
}

export interface DetailsCredit {
    id?: number,
    periodicite_remboursement_id?: number,
    isDiffere?: boolean,
    isDecouvert?: boolean,
    montantCreditAssurer?: number,
    montantCreditDecouvert?: number,
    nombreDeRemboursement?: string,
    montantDesTermes?: number,
    numeroCompteClient?: string,
    dureeTotaleCreditAnnee?: number,
    dureeTotaleCreditMois?: number,
    differerAmortissement?: number,
    datePremierRemboursementTerme?: string,
    dateEffet?: string,
    dateEcheance?: string,
    periodiciteRemboursement: PeriodiciteRemboursement
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
    primeSimple?: number,
    primeDiffere?: number,
    primeDecouvert?: number,
    primePerteEmploi?: number,
    numeroDeCompteUABVie?: string,
    tauxAmortissement?: number,
    tauxDecouvert?: number,
}

export interface InformationEmploi {
    id?: number,
    isPerte?: boolean,
    isDeleted?: boolean,
    employeur?: string,
    dateEmbauche?: string,
    adresseEmployeur?: string,
    professionActuelle?: string,
    typeDeContrat?: string,
    telEmployeur?: string,
    numeroCNSS?: string,
    numeroRCCMIFU?: string,
}

export interface PeriodiciteRemboursement {
    id?: number,
    isDeleted?: boolean,
    code?: string,
    libelle?: string,
}
export interface Civilite {
     id?: number,
     code?: string,
     libelle?: string,
}
