import { Banque } from "../banque/banque";

export class Agence {
    public id?: number;
    public libelle?: string;
    public banqueId?: number;
    public banque?: Banque;

    constructor(
        id?: number,
        libelle?: string,
        banqueId?: number,
        banque?: Banque,
    ) {
        this.id = id;
        this.libelle = libelle;
        this.banqueId = banqueId;
        this.banque = banque;
    }
}
