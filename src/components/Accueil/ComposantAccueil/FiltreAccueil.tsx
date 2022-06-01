import { Statut } from "../../../utils/StatutUtils";
import { formation } from "./AccueilAffichage";

export interface domaines {
  code: string;
  libelle: string;
  description: string;
}

export interface filtre {
  date_debut: string;
  date_fin: string;
  statut: string[];
  domaines: string[];
  cadre: string[];
  sujet: string;
  asso: string[];
  formateurs: string[];
}

export function GetFullFilter(data: formation[]): filtre {
  return{
    date_debut: "",
    date_fin: "",
    statut: [Statut.DEMANDE, Statut.A_ATTRIBUER, Statut.A_VENIR, Statut.PASSEE],
    domaines: getDomainesList(data),
    cadre: getCadreList(data),
    sujet: "",
    asso: getAssoList(data),
    formateurs: getListFormateurs(data),
  };
}

function getAssoList(data: formation[]) {
  const listAsso: string[] = [];

  data.map((data) => {
    listAsso.push(data.association.acronyme);
  });

  return listAsso.filter(function (ele, pos) {
    return listAsso.indexOf(ele) == pos;
  });
}

function getListFormateurs(data: formation[]) {
  const listFormateurs: string[] = [];

  data.map((data) => {
    data.formateurs.map((formateur) => {
      listFormateurs.push(formateur.prenom + " " + formateur.nom);
    });
  });

  return listFormateurs.filter(function (ele, pos) {
    return listFormateurs.indexOf(ele) == pos;
  });
}

function getCadreList(data: formation[]) {
  const listCadre: string[] = [];

  data.map((data) => {
    listCadre.push(data.cadre);
  });

  return listCadre.filter(function (ele, pos) {
    return listCadre.indexOf(ele) == pos && ele !== undefined;
  });
}

function getDomainesList(data: formation[]) {
  const listDomaines: string[] = [];

  data.map((data) => {
    data.domaines.map((domaine) => {
      listDomaines.push(domaine.libelle);
    });
  });

  return listDomaines.filter(function (ele, pos) {
    return listDomaines.indexOf(ele) == pos;
  });
}
