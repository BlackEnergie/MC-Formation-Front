import {EntryPoint} from "./common";
import { axiosPrivate } from "../api/axios";

export function PostResetMdp(email: String) {

    return axiosPrivate.post(EntryPoint.RESET_PASSWORD_MAIL_URL,"", {
        params: {
            email: email
        }
    });
}