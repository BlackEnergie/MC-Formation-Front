export const BASE_URL = "http://" + window.location.hostname + ":8080";

export enum EntryPoint {
    ALL_FORMATION = '/formations',
    FORMATION_BY_ID = '/formation/',
    FORMATION_ASSIGN_FORMATEUR='/formation/affectation',
    FORMATION_LIKE_FORMATION='/formation/interesser',
    GENERAL_SIGN_UP = '/auth/signup/checkToken?token=',
    CHECK_TOKEN = '/auth/signup/checkToken?token=',
    INSCRIPTION_URL = '/auth/signup/create?token=',
    INVITE_MAIL_URL = '/auth/signup/invite',
    LOGIN_URL = '/auth/signin',
    DOMAINES = '/data/domaines',
    DEMANDE = '/demande/creer',
    RESET_PASSWORD_MAIL_URL='/auth/resetPassword/invite',
    RESET_PASSWORD_NEW_PASSWORD = '/auth/resetPassword/save',
    RESET_PASSWORD_CHECK_TOKEN = '/auth/resetPassword/checkToken',
    DEMANDE_FAVORABLE = '/utilisateur/demandesFavorables',
    FORMATEUR_DETAIL = '/utilisateur/formateur',
    ASSOCIATIONS_USER_INFO = '/utilisateur/associations',
    MEMBRES_BUREAU_NATIONAL_USER_INFO = '/utilisateur/membresBureauNational',
    FORMATEURS_USER_INFO = '/utilisateur/formateurs',
    INVITATIONS_INFO = '/utilisateur/invitations',
    MODIFICATION_ACTIF = '/utilisateur/modification/actif/',
    INVITATION_RELANCE = '/auth/signup/notify',
    INVITATION_SUPPRIMER = '/auth/signup/invite/cancel'
}

export const headersTemplate = {
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
}
