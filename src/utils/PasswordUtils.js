import {sha256} from "js-sha256";

const salt = "d991a90d4ce11b6c3bf0f9ba7392cb77e6c0e102374c554fed043aa43be5e175";

export const hashPassword = (password) => {
    return sha256(salt + password);
}
