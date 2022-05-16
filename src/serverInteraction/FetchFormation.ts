import { AxiosInstance } from "axios";
import { EntryPoint, headersTemplate } from "./common";
import AffectationFormation from "../api/model/AffectationFormation";
import InteresserFormation from "../api/model/InteresserFormation";


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

export function FetchAssignFormateur(axios:AxiosInstance,affectation:AffectationFormation){
    return axios.post(EntryPoint.FORMATION_ASSIGN_FORMATEUR, JSON.stringify(affectation), {
        headers: headersTemplate
    });
}

export function FetchLikeFormation(axios:AxiosInstance,interesser:InteresserFormation){
    return axios.post(EntryPoint.FORMATION_LIKE_FORMATION, JSON.stringify(interesser), {
        headers: headersTemplate
    });
}
