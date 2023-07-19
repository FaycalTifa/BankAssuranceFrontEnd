
export interface IPoste {
    id?: number;
    code?: string;
    libelle?: string;
}
export class Poste implements IPoste{
    constructor(
        public id?: number,
        public code?: string,
        public libelle?: string,
    ){
    }
}
export function getPosteIdentifier(poste: IPoste): number | undefined {
    return poste.id;
}
