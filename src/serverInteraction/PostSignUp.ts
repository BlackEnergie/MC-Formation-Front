import axios from "../api/axios";
import SignupRequest from "../api/model/SignupRequest";
import useAxiosPrivate from "../auth/hooks/useAxiosPrivate";

const INSCRIPTION_URL = '/auth/signup/create?token='



export function PostSignUp (token: String) {
    return useAxiosPrivate().post('/auth/signup/checkToken?token=' + token, {})
}

export function PostSignUpWithRole (token: String, role: SignupRequest){
    return axios.post(INSCRIPTION_URL + token,
        JSON.stringify(role),
        {
            headers: {'Content-Type': 'application/json'}
        }
    );
}