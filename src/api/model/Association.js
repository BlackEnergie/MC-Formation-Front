export default class Association {


    constructor(email, password, nomUtilisateur, acronyme, college, nomComplet, ville) {
        this.email = email;
        this.password = password;
        this.nomUtilisateur = nomUtilisateur;
        this.association = {"acronyme":acronyme, "college":college, "nomComplet":nomComplet, "ville":ville};
    }
}