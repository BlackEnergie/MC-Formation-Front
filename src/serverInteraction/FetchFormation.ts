import { AxiosInstance } from "axios";
import useAxiosPrivate from "../auth/hooks/useAxiosPrivate";
import { EntryPoint, headersTemplate } from "./common";

export function FetchAllFormation ( axios:AxiosInstance, offset: Number, offsetParam: Number, limitParam: {value: Number}, statutParam: String, statutFiltre: String) {
    return axios.get(EntryPoint.ALL_FORMATION, {
        params: {
            offset: (offset != null ? 0 : offsetParam),
            limit: limitParam.value,
            statut: (statutParam != null ? statutParam : statutFiltre)
        },
        headers: headersTemplate
    })
}

export function FetchFormationById(axios:AxiosInstance, id: String){
    return axios.get(EntryPoint.FORMATION_BY_ID + id, {
        headers: headersTemplate
    }); 
}