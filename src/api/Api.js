
export default class Api {

    URL = {
        SERVER: 'http://localhost:8080',
        UTILISATEUR: '/api/auth/signin'
    }

    CONTENT_TYPE = {
        json: 'application/json',
        html: 'text/html'
    }
    postAuthentificationURL() {
        return this.URL.SERVER + this.URL.UTILISATEUR
    }
    getRequestOptions(method, contentType, body) {
        if (typeof body !== "string") {
            body = JSON.stringify(body);
        }
        return {
            method: method,
            headers: {'Content-Type':contentType},
            body: body
        }
    }
    async postAuthentification(utilisateur) {
        let request = this.getRequestOptions('POST', this.CONTENT_TYPE.json, utilisateur);
        let donnee;
         await fetch(this.postAuthentificationURL(), request)
        .then(function(response) {
            return response.json();
          }).then(function(data) {
            donnee= data;
          });
        return donnee;
    }

}
