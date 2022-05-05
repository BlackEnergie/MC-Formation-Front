import { AxiosInstance } from "axios";
import Demande from "../api/model/Demande";
import { EntryPoint, headersTemplate } from "./common";

export function PostDemande(axios: AxiosInstance, demande: Demande) {
    return axios.post(EntryPoint.DEMANDE, JSON.stringify(demande), {
        headers: headersTemplate
    });
}