import {Banque} from "../banque/banque";

export class Agence {

    constructor(
        public id?: number,
        public libelle?: string,
        public banqueId ?: number,
        public banque?: Banque,
    ){
    }
}
