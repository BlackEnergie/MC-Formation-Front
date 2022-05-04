import useAxiosPrivate from "../auth/hooks/useAxiosPrivate"

export enum EntryPoint {
    ALL_FORMATION = '/formations',
    FORMATION_BY_ID = '/formation',
    GENERAL_SIGN_UP = '/auth/signup/checkToken?token='

} 

export const headersTemplate = {
    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
}

export const axiosPrivate = useAxiosPrivate()