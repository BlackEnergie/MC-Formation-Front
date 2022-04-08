export default class Domaine {

    code : string;
    libelle : string;
    description : string;

    constructor(code:string, libelle:string, description:string) {
        this.code = code;
        this.libelle = libelle;
        this.description = description;
    }
}
