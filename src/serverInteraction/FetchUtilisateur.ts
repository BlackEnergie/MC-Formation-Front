import { AxiosInstance } from "axios";
import { EntryPoint, headersTemplate } from "./common";


export function FetchInformationUserById(axios:AxiosInstance){
    return axios.get(EntryPoint.INFORMATION_USER, {
        headers: headersTemplate
    });
}