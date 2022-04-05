export default class Demande {

    date: Date;
    sujet : string;
    detail : string;
    domaines : string[];

    constructor(date:Date = new Date(), sujet:string, detail:string, domaines:string[]) {
        this.date = date;
        this.sujet = sujet;
        this.detail = detail;
        this.domaines = domaines;
    }
}
