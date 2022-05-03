import Association from "./Association";
import Formateur from "./Formateur";
import MembreBureauNational from "./MembreBureauNational";

export default class SignupRequest {

    nomUtilisateur :String;
    password: String;
    membreBureauNational: MembreBureauNational = null;
    association: Association = null;
    formateur: Formateur = null;
}
