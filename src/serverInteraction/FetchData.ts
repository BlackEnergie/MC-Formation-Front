import { AxiosInstance } from "axios";
import { EntryPoint, headersTemplate } from "./common";

export function FetchDomaines(axios: AxiosInstance, controller: AbortController) {
    return axios.get(EntryPoint.DOMAINES, {
        signal: controller.signal,
        headers: headersTemplate
    });
}

export function FetchFormateur(axios: AxiosInstance) {
    return axios.get(EntryPoint.FORMATEUR_DETAIL, {
        headers: headersTemplate
    });
}

export function FetchDemandesFavorables (axios: AxiosInstance) {
    return axios.get(EntryPoint.DEMANDE_FAVORABLE, {
        headers: headersTemplate
    });
}