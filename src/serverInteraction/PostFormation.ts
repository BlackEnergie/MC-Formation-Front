import { AxiosInstance } from "axios";
import Formation from "../api/model/Formation";
import { EntryPoint, headersTemplate } from "./common";

export function PostFormation(axios: AxiosInstance, formation: Formation) {
    return axios.put(EntryPoint.MODIFICATION_FORMATION, JSON.stringify(formation), {
        headers: headersTemplate
    });
}