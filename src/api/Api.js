export default class Api {

    URL = {
        SERVER: 'http://localhost:8080',
        DEMANDE: '/demande',
        DONNEES: '/data',
        DOMAINES: '/domaines',
        POST: '/creer'
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

    getRequestOptions(method, contentType, body) {
        if (typeof body !== "string") {
            body = JSON.stringify(body);
        }
        return {
            method: method,
            headers: {contentType},
            body: body
        }
    }

    async getDonnees() {
        this.getDomaines().then(domaines => {
            console.log(domaines)
        });
    }

    getDomaines = async () => {
        
        let domaines = {};
        let request = this.getRequestOptions('GET', this.CONTENT_TYPE.json);
        return fetch(this.getDomainesUrl(), request)                
            .then((res) => res.json())
            .then((json) => {
                return json;
            });
    }

    async postDemande(demande) {
        let request = this.getRequestOptions('POST', this.CONTENT_TYPE.json, demande);
        fetch(this.postDemandeUrl(), request)
            .then(response => {
                if (response.ok) {
                    window.alert("La demande de formation est créée")
                } else {
                    window.alert("Une erreur est survenue pendant la création de la demande de formation");
                }
            });
    }

}