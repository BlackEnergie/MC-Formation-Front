import { AxiosInstance } from "axios";
import { EntryPoint, headersTemplate } from "./common";


export function FetchInformationUserById(axios:AxiosInstance, id: String){
    return axios.get(EntryPoint.INFORMATION_USER + id, {
        headers: headersTemplate
    });
}