export const BASE_URL = "http://" + window.location.hostname + ":8080";

export enum EntryPoint {
    ALL_FORMATION = '/formations',
    FORMATION_BY_ID = '/formation/',
    GENERAL_SIGN_UP = '/auth/signup/checkToken?token=',
    CHECK_TOKEN = '/auth/signup/checkToken?token=',
    INSCRIPTION_URL = '/auth/signup/create?token=',
    INVITE_MAIL_URL = '/auth/signup/invite',
    LOGIN_URL = '/auth/signin',
    DOMAINES = '/data/domaines',
    DEMANDE = '/demande/creer',
    RESET_PASSWORD_MAIL_URL='/auth/resetPassword/invite'

} 

export const headersTemplate = {
    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
}