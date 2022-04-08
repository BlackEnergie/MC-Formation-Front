import './Connexion.css';
import React, {Component} from 'react';
import Utilisateur from "../api/model/Utilisateur";
import Accueil from "../Accueil/Accueil"
import Api from "../api/Api";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class Connexion extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const {cookies} =props;
        this.state = {
            input: {},
            error: '',
            token: cookies.get('token') || ''
        };
        this.api=new Api();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let input = this.state.input;
        input[event.target.name] = event.target.value;
        this.setState({
            input
        });
    }

    mapFormToUtilisateur(){
        let input = this.state.input;
        let utilisateur = new Utilisateur();
        utilisateur.nomUtilisateur = input["email"];
        utilisateur.password = input["mdp"];
        return utilisateur;
    }
    
    handleSubmit(event) {
        event.preventDefault();
        let utilisateur = this.mapFormToUtilisateur();
        this.api.postAuthentification(utilisateur).then(data =>{
            if(data){
                this.setState({token: data});
                const { cookies } = this.props;
                cookies.set('token', data, { path: '/' });
            }
            else{
                this.setState({error: "Mauvais identifiant et mot de passe."});
            }
        }).catch(e=>{
            console.log(e);
        })

    }
    render() {
        return (
            <>
            { 
            this.state.token==="" ? (
            <div className="div-Connexion">
                <img src={require("../Img/logoblue_bgwht.png")} id="logo_connexion" alt="logo-mc"/>
                <h1 id="titreConnexion">Connectez-vous à l'espace <br/> Formation de MIAGE Connection</h1>
                <form id="Form-Connexion">
                    <div className="form-group">
                        <input
                            id="email"
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            onChange={this.handleChange}
                            name="email"/>
                        
                    </div>
                    <div className="form-group mt-3 mb-3">
                        <input
                            id="mdp"
                            type="password"
                            className="form-control"
                            placeholder="Mot de passe"
                            onChange={this.handleChange}
                            name="mdp"
                        />
                    </div>
                    <div>{this.state.error}</div>
                    <input type="button" className="form-group btn btn-primary" onClick={(e) => {this.handleSubmit(e)}} value="Se Connecter" alt="buttonConnexion"/>
                </form>
                <div id="contactVP">
                    <a href="/">Entrer en contact avec VP Formation</a>
                </div>
                </div>
            ) : (<Accueil/>)
            }
            </>
        );
    }
}

export default withCookies(Connexion);
