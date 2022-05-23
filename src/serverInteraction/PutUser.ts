import { AxiosInstance } from "axios";
import UtilisateurInfo from "../api/model/UtilisateurInfo";
import UtilisateurModificationMotDePasse from "../api/model/UtilisateurModificationMotDePasse";
import { EntryPoint, headersTemplate } from "./common";

export function PutUpdateUser(axios: AxiosInstance, utilisateur: UtilisateurInfo) {
    return axios.put(EntryPoint.MODIFICATION_INFORMATION_USER, JSON.stringify(utilisateur), {
        headers: headersTemplate
    });
}

export function PutUserPassword(axios: AxiosInstance, utilisateur: UtilisateurModificationMotDePasse) {
    return axios.put(EntryPoint.MODIFICATION_MOTDEPASSE_USER, JSON.stringify(utilisateur), {
        headers: headersTemplate
    });
}