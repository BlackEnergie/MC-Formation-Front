export default class Demande {

    sujet : string;
    detail : string;
    domaines : string[];

    constructor(sujet:string, detail:string, domaines:string[]) {
        this.sujet = sujet;
        this.detail = detail;
        this.domaines = domaines;
    }
}
