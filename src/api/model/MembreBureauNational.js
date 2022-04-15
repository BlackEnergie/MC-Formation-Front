export default class MembreBureauNational {


    constructor(email, password, nomUtilisateur, poste) {
        this.email = email;
        this.password = password;
        this.nomUtilisateur = nomUtilisateur;
        this.membreBureauNational = {"poste":poste};
    }
}