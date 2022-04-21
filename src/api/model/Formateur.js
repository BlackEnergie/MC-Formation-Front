export default class Formateur {


    constructor(password, nomUtilisateur, nom, prenom) {
        this.password = password;
        this.nomUtilisateur = nomUtilisateur;
        this.formateur = {"nom":nom, "prenom":prenom};
    }
}