import { AxiosInstance } from "axios";
import axios from "../api/axios";
import SignupRequest from "../api/model/SignupRequest";
import useAxiosPrivate from "../auth/hooks/useAxiosPrivate";
import { EntryPoint } from "./common";

export function PostSignUp (axios: AxiosInstance,token: String) {
    return axios.post(EntryPoint.CHECK_TOKEN + token, {})
}

export function PostSignUpWithRole (axios: AxiosInstance, token: String, role: SignupRequest){
    return axios.post(EntryPoint.INSCRIPTION_URL + token, JSON.stringify(role));
}