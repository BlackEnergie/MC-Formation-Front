import { axiosPrivate } from "../api/axios";
import Utilisateur from "../api/model/Utilisateur";
import { EntryPoint } from "./common";

export function PostConnexion( utilisateur: Utilisateur ) {
    return axiosPrivate.post(EntryPoint.LOGIN_URL, JSON.stringify(utilisateur));
}