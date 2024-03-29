import {Banque} from "../banque/banque";

export interface IService {
    id?: number;
    libelle?: string;
    description?: string;
    postes?: Banque[];
    deleted?: boolean;
}

export class Service implements IService {
    constructor(
        public id?: number,
        public libelle?: string,
        public description?: string,
        public postes?: Banque[],
        public deleted?: boolean,
    ) {
        this.deleted = this.deleted ?? false;
    }
}

export function getServiceIdentifier(service: IService): number | undefined {
    return service.id;
}
