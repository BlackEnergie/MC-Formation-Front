import Domaine from './Domaine';
import Association from './Association';

export default class Formation {
    id: string;
    duree: string;
    date: string;
    nom: string;
    type: string;
    prerequis: string;
    audience: string;
    parties: string;
    materiels: string[];
    objectifs: string[];
    cadre: string;
    formateurs: string[];

    sujet: string;
    detail: string;
    domaines: Domaine[];
    dateDemande: string;
    statut: string;
    association: Association;

    constructor() {
        this.id = "";
        this.duree = "";
        this.date = "";
        this.nom = "";
        this.type = "";
        this.prerequis = "";
        this.audience = "";
        this.parties = "";
        this.materiels = [];
        this.objectifs = [];
        this.cadre = "";
        this.formateurs = [];

        this.sujet = "";
        this.detail = "";
        this.domaines = [];
        this.dateDemande = "";
        this.statut = "";
        this.association = new Association();
    }
}
