export default class Api {

    private URL = {
        SERVER: 'http://localhost:8080',
        DEMANDE: '/demande',
        DONNEES: '/data',
        DOMAINES: '/domaines',
        POST: '/creer'
    }

    private CONTENT_TYPE = {
        json: 'application/json',
        html: 'text/html'
    }

    private postDemandeUrl() {
        return this.URL.SERVER + this.URL.DEMANDE + this.URL.POST;
    }

    private getDomainesUrl() {
        return this.URL.SERVER + this.URL.DONNEES + this.URL.DOMAINES;
    }

    getRequestOptions(method: string, contentType: string, body: any) {
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

    async getDomaines() {
        let request = this.getRequestOptions('GET', this.CONTENT_TYPE.json);
        fetch(this.getDomainesUrl(), request)
            .then(response => {
                if (response.ok) {
                    console.log(response)
                } else {
                    window.alert('Erreur lors de la connection avec le serveur')
                }
            })
    }

    async postDemande(demande: Demande) {
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
