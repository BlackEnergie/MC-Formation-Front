export default class Association {


    constructor(password, nomUtilisateur, acronyme, college, nomComplet, ville) {
        this.password = password;
        this.nomUtilisateur = nomUtilisateur;
        this.association = {"acronyme":acronyme, "college":college, "nomComplet":nomComplet, "ville":ville};
    }
}