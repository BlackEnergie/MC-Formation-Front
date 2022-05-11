import { AxiosInstance } from "axios";
import { EntryPoint, headersTemplate } from "./common";

export function FetchAllFormation ( axios:AxiosInstance ) {
    return axios.get(EntryPoint.ALL_FORMATION, {
        headers: headersTemplate
    })
}

export function FetchFormationById(axios:AxiosInstance, id: String){
    return axios.get(EntryPoint.FORMATION_BY_ID + id, {
        headers: headersTemplate
    }); 
}