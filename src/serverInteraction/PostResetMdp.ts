import {EntryPoint} from "./common";
import axios from "../api/axios";
import {AxiosInstance} from "axios";

export function PostResetMdp(axios: AxiosInstance,email: String) {

    return axios.post(EntryPoint.RESET_PASSWORD_MAIL_URL+"?email="+email);
}