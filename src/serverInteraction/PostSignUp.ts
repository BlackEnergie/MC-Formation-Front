import { axiosPrivate } from "../api/axios";
import SignupRequest from "../api/model/SignupRequest";
import { EntryPoint } from "./common";

export function PostSignUp (token: String) {
    return axiosPrivate.post(EntryPoint.CHECK_TOKEN + token, {})
}

export function PostSignUpWithRole ( token: String, role: SignupRequest){
    return axiosPrivate.post(EntryPoint.INSCRIPTION_URL + token, JSON.stringify(role));
}