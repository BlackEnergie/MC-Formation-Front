import axios from "../api/axios";
import SignupRequest from "../api/model/SignupRequest";
import { axiosPrivate } from "./common";

const INSCRIPTION_URL = '/auth/signup/create?token='

export function postSignUp (token: String) {
    return axiosPrivate.post('/auth/signup/checkToken?token=' + token, {})
}

export function postSignUpWithRole (token: String, role: SignupRequest){
    return axios.post(INSCRIPTION_URL + token,
        JSON.stringify(role),
        {
            headers: {'Content-Type': 'application/json'}
        }
    );
}