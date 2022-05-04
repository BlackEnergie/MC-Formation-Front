import { axiosPrivate, EntryPoint, headersTemplate } from "./common";

export function fetchAllFormation (offset: Number, offsetParam: Number, limitParam: {value: Number}, statutParam: String, statutFiltre: String) {
    return axiosPrivate.get(EntryPoint.ALL_FORMATION, {
        params: {
            offset: (offset != null ? 0 : offsetParam),
            limit: limitParam.value,
            statut: (statutParam != null ? statutParam : statutFiltre)
        },
        headers: headersTemplate
    })
}

export function fetchFormationById(id: String){
    return axiosPrivate.get(EntryPoint.FORMATION_BY_ID + id, {
        headers: headersTemplate
    }); 
}