import jwt_decode, { JwtPayload } from "jwt-decode";

/**
 * Retourne True et le token décodé si le token n'est pas expiré
 * @param  {string} jwt [description]
 * @return {boolean}    [description]
 */
const decodeToken = ( jwt ) => {

    let resultat = {isValid:false, decoded:jwt};

    try {
        let decoded = jwt_decode<JwtPayload>(jwt);
        let date = new Date();

        if (((decoded.exp * 1000) > (date.getTime()))) {
            resultat={isValid:true, decoded:decoded};
        }

    }
    catch (err) {
        console.log(err);
        window.location.replace("/connexion")
    }

    return resultat;
}

export default decodeToken;
