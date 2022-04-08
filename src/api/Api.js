import toast from 'react-hot-toast';

const notifySucess= () => toast.success('Les informations ont bien été envoyé');
const notifyError = () => toast.error('Une erreur est survenue');

export default class Api {

    URL = {
        SERVER: 'http://localhost:8080',
        DEMANDE: '/demande',
        DONNEES: '/data',
        DOMAINES: '/domaines',
        POST: '/creer',
        UTILISATEUR: '/api/auth/signin'
    }

    CONTENT_TYPE = {
        json: 'application/json',
        html: 'text/html'
    }

    postDemandeUrl() {
        return this.URL.SERVER + this.URL.DEMANDE + this.URL.POST;
    }

    getDomainesUrl() {
        return this.URL.SERVER + this.URL.DONNEES + this.URL.DOMAINES;
    }


    postAuthentificationURL() {
        return this.URL.SERVER + this.URL.UTILISATEUR
    }

    getRequestOptions(method, contentType, bearer, body) {
        if (typeof body !== "string") {
            body = JSON.stringify(body);
        }
        return {
            method: method,
            headers: {'Content-Type': contentType,'Authorization':'Bearer '+bearer},
            body: body
        }
    }
    getRequestOptionsWithoutBearer(method, contentType, body) {
        if (typeof body !== "string") {
            body = JSON.stringify(body);
        }
        return {
            method: method,
            headers: {'Content-Type': contentType},
            body: body
        }
    }

    async getDonnees() {
        this.getDomaines().then(domaines => {
            console.log(domaines)
        });
    }

    async getDomaines(bearer){
        let request = this.getRequestOptions('GET', this.CONTENT_TYPE.json,bearer);
        return fetch(this.getDomainesUrl(), request)
            .then((res) => res.json());
    }

    async postDemande(demande,bearer) {
        let request = this.getRequestOptions('POST', this.CONTENT_TYPE.json, bearer, demande);
        console.log(request)
        fetch(this.postDemandeUrl(), request)
            .then(response => {
                if (!response.ok) {
                    notifyError()
                }
                else{
                    notifySucess()
                }
            });
    }


    async postAuthentification(utilisateur) {
        let request = this.getRequestOptionsWithoutBearer('POST', this.CONTENT_TYPE.json, utilisateur);
        let donnee;
        await fetch(this.postAuthentificationURL(), request)
            .then(function (response) {
                if(response.status ===200){
                    return response.json();
                } return null;

            }).then(function (data) {
                donnee = data;
            });
        return donnee;
    }

}
