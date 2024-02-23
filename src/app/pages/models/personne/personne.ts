export class Personne {
    public id?: number;
    public nom?: string;
    public prenom?: string;
    public nomDeJeuneFille?: string;
    public dateDeNaissance?: string;
    public lieuDeNaissance?: string;
    public taille?: number;
    public poids?: number;
    public tension?: string;
    public professionActuelle?: string;
    public employeur?: string;
    public numeroPiecePasseport?: string;
    public dateEtablissement?: string;
    public lieuEtablissement?: string;
    public adressePostale?: string;
    public telephone?: string;
    public email?: string;
    public telephoneSecours?: string;
    public emailSecours?: string;
    public adresseSecours?: string;


    constructor(
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

    ) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.nomDeJeuneFille = nomDeJeuneFille;
        this.dateDeNaissance = dateDeNaissance;
        this.lieuDeNaissance = lieuDeNaissance;
        this.taille = taille;
        this.poids = poids;
        this.tension = tension;
        this.professionActuelle = professionActuelle;
        this.employeur = employeur;
        this.numeroPiecePasseport = numeroPiecePasseport;
        this.dateEtablissement = dateEtablissement;
        this.lieuEtablissement = lieuEtablissement;
        this.adressePostale = adressePostale;
        this.telephone = telephone;
        this.email = email;
        this.telephoneSecours = telephoneSecours;
        this.emailSecours = emailSecours;
        this.adresseSecours = adresseSecours;
    }


}
