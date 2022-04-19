import jwt_decode from "jwt-decode";

/**
 * Retourne True et le token décodé si le token n'est pas expiré
 * @param  {string} jwt [description]
 * @return {boolean}    [description]
 */
const decodeToken = ( jwt ) => {

    let resultat = [false, jwt];

    try {
        let decoded = jwt_decode(jwt);
        let date = new Date();
        console.log(decoded);

        if (((decoded.exp * 1000) > (date.getTime()))) {
            resultat = [true, decoded];
        }

    }
    catch (err) {
        console.log(err);
    }

    return resultat;
}

export default decodeToken;