
import {Agence} from "../agence/agence";


export class Gestionnaire {
    public id?: number;
    public libelle: string;
    public agenceId?: number;
    public agence?: Agence;

     constructor(
        id?: number,
        libelle?: string,
        agenceId?: number,
        agence?: Agence,
    ) {
        this.id = id;
        this.libelle = libelle;
        this.agenceId = agenceId;
        this.agence = agence;
    }
}
