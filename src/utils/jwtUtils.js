import jwt_decode from "jwt-decode";

const jwtUtils = ( jwt ) => {

    let result = false;

    try {
        let decoded = jwt_decode(jwt);
        let date = new Date();
        console.log(decoded);

        if (jwt !== null && ((decoded.exp * 1000) > (date.getTime()))) {
            result = true;
        }

    }
    catch (err) {
        console.log(err);
    }

    return result;
}

export default jwtUtils;