export default class Demande {

    sujet : string;
    detail : string;
    domaines : string[];
    nomUtilisateur :string;

    constructor(sujet:string, detail:string, domaines:string[],association:string) {
        this.sujet = sujet;
        this.detail = detail;
        this.domaines = domaines;
        this.nomUtilisateur = association;
    }
}
