export default class Formateur {


    constructor(email, password, nomUtilisateur, nom, prenom) {
        this.email = email;
        this.password = password;
        this.nomUtilisateur = nomUtilisateur;
        this.formateur = {"nom":nom, "prenom":prenom};
    }
}