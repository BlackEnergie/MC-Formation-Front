import {AxiosInstance} from 'axios';
import {EntryPoint, headersTemplate} from './common';

export function FetchMembresBureauNational(axios: AxiosInstance) {
    return axios.get(EntryPoint.MEMBRES_BUREAU_NATIONAL_USER_INFO, {
        headers: headersTemplate
    });
}

export function FetchAssociations(axios: AxiosInstance) {
    return axios.get(EntryPoint.ASSOCIATIONS_USER_INFO, {
        headers: headersTemplate
    });
}

export function FetchFormateurs(axios: AxiosInstance) {
    return axios.get(EntryPoint.FORMATEURS_USER_INFO, {
        headers: headersTemplate
    });
}

export function FetchInvitations(axios: AxiosInstance) {
    return axios.get(EntryPoint.INVITATIONS_INFO, {
        headers: headersTemplate
    });
}
