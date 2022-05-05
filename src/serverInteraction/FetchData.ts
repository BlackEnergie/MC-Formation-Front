import { AxiosInstance } from "axios";
import { EntryPoint, headersTemplate } from "./common";

export function FetchDomaines(axios: AxiosInstance, controller: AbortController) {
    return axios.get(EntryPoint.DOMAINES, {
        signal: controller.signal,
        headers: headersTemplate
    });
}