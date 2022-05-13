import Domaine from './Domaine';
import Association from './Association';
import {Statut} from '../../utils/StatutUtils';

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
    statut: Statut;
    association: Association;
    associationsInteressees: Association[];

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
        this.statut = undefined;
        this.association = new Association();
        this.associationsInteressees = [];
    }
}
