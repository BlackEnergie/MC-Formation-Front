import { AxiosInstance } from "axios";
import Utilisateur from "../api/model/Utilisateur";
import { EntryPoint } from "./common";

export function PostConnexion( axios: AxiosInstance, utilisateur: Utilisateur ) {
    return axios.post(EntryPoint.LOGIN_URL, JSON.stringify(utilisateur));
}