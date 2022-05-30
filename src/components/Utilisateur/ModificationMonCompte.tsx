import React, {useEffect, useState} from "react";
import useAxiosPrivate from '../../auth/hooks/useAxiosPrivate';
import TextField from "@mui/material/TextField";
import {FetchInformationUserById} from '../../serverInteraction/FetchUtilisateur';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Autocomplete, Container, Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {PutUpdateUser} from '../../serverInteraction/PutUser';
import toast from "react-hot-toast";
import jwtUtils from '../../../src/auth/decodeToken';
import UtilisateurInfo from "../../api/model/UtilisateurInfo";
import {FetchDomaines} from "../../serverInteraction/FetchData";
import Domaine from "../../api/model/Domaine";

interface selectElement {
    value: string,
    label: string
}

function AfficherDataDomaines(domaines: Domaine[]) {
    let listeDomaines = [];
    if (domaines !== undefined) {
        domaines.map(
            (domaine) => {
                listeDomaines.push(
                    {
                        "value": domaine?.code,
                        "label": domaine?.libelle
                    }
                )
            }
        )
        return listeDomaines;
    }
}

function SelectElementDomaineToCode(domaines: selectElement[]) {
    let listeCodes = [];
    domaines?.map(
        (domaine) => {
            listeCodes.push(
                {
                    "code": domaine?.value,
                    "libelle": domaine?.label
                }
            )
        }
    )
    return listeCodes;
}

function AffichageModificationMonCompte() {

    const initialUtilisateur: UtilisateurInfo = null;

    const [information, setInformation] = useState(null);
    const [utilisateur, setUtilisateur] = useState(initialUtilisateur);
    const [hasUnfilled, setHasUnfilled] = useState({acronyme:"",college:"",nomComplet:"",ville:"",poste:"",nom:"",prenom:"",email:""});
    const [showWarning, setShowWarning] = useState({acronyme:false,college:false,nomComplet:false,ville:false,poste:false,nom:false,prenom:false,email:false});
    const [liveness, setLiveness] = useState(0);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingUser, setLoadingUser] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();


    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        getInfoUser();

    }, [])
    const getInfoUser = async () => {
        try {
            const response = await FetchInformationUserById(axiosPrivate)
            setInformation(response?.data);
            setUtilisateur(response.data);
            setLoadingUser(false);
        } catch (err) {
            console.error(err);
        }
        getDomaines();
    }

    let isMounted = true;
    let optionsArray = []
    const controller = new AbortController();


    const getDomaines = async () => {
        try {
            const response = await FetchDomaines(axiosPrivate, controller);
            for (const element of response.data) {
                optionsArray.push({value: element.code, label: element.libelle});
            }
            isMounted && setOptions(optionsArray);
            setLoading(false);
        } catch (err) {
            console.error(err);
            navigate('/connexion', {state: {from: location}, replace: true});
        }
    }

    const validate = () => {
        let token = jwtUtils(localStorage.getItem('accessToken')).decoded;
        let hasUnfilled = {acronyme:"",college:"",nomComplet:"",ville:"",poste:"",nom:"",prenom:"",email:""};
        let showWarning = {acronyme:false,college:false,nomComplet:false,ville:false,poste:false,nom:false,prenom:false,email:false};
        let isValid = true;
        if (token!== null && token.role === 'ROLE_ASSO') {
            if(utilisateur.association.acronyme ==""){
                isValid = false;
                hasUnfilled["acronyme"] = "Renseignez un acronyme.";
                showWarning["acronyme"] = true;
            }
            if(utilisateur.association.college ==""){
                isValid = false;
                hasUnfilled["college"] = "Renseignez un collège.";
                showWarning["college"] = true;
                
            }
            if(utilisateur.association.nomComplet ==""){
                isValid = false;
                hasUnfilled["nomComplet"] = "Renseignez un nom complet.";
                showWarning["nomComplet"] = true;
                
            }
            if(utilisateur.association.ville ==""){
                isValid = false;
                hasUnfilled["ville"] = "Renseignez une ville.";
                showWarning["ville"] = true;
                
            }
        }
        if(token!== null && token.role === 'ROLE_BN'){
            if(utilisateur.membreBureauNational.poste ==""){
                isValid = false;
                hasUnfilled["poste"] = "Renseignez un poste.";
                showWarning["poste"] = true;

            }
        }
        if(token!== null && token.role === 'ROLE_FORMATEUR'){
            if(utilisateur.formateur.nom ==""){
                isValid = false;
                hasUnfilled["nom"] = "Renseignez un nom.";
                showWarning["nom"] = true;

            }
            if(utilisateur.formateur.prenom ==""){
                isValid = false;
                hasUnfilled["prenom"] = "Renseignez un prénom.";
                showWarning["prenom"] = true;
            }
        }
        if(utilisateur.email==""){
            isValid = false;
            hasUnfilled["email"] = "Renseignez une adresse mail";
            showWarning["email"] = true;
        }
        if (isValid) {
            handleSubmit();
        } else {
            setHasUnfilled(hasUnfilled);
            setShowWarning(showWarning);
        }

    }
    const handleSubmit = async () => {
        try {
            const response = await PutUpdateUser(axiosPrivate, utilisateur);
            if (response.data.code == 200) {
                toast.success(response.data.message);
                navigate("/compte");
            } else {
                toast.error(response.data.message);
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            console.error(err);
        }
    }


    return (
        <>
            <Container>
                <Grid container spacing={3}  style={{boxShadow:"0 .5rem 1rem rgba(0,0,0,.15)"}}>
                    <Grid item xs>
                    </Grid>
                    <Grid item xs={4} style={{backgroundColor: "white"}}>
                        <Box textAlign={'center'}>
                            <Typography variant="h4" color="primary">Mon Compte</Typography>
                            <TextField
                                id="outlined-required"
                                error={showWarning.acronyme}
                                label="Acronyme"
                                hidden={utilisateur?.association?.acronyme == undefined ? true : false}
                                value={utilisateur?.association?.acronyme}
                                style={{
                                    marginTop: 20,
                                }}
                                onChange={(event) => {
                                    const newUtilisateur = utilisateur;
                                    newUtilisateur.association.acronyme = event.target.value;
                                    setUtilisateur(newUtilisateur);
                                    setLiveness(liveness + 1);
                                }}
                            />
                            {showWarning.acronyme
                            ?
                            <Typography color="red" style={{marginBottom: 20}}>{hasUnfilled.acronyme}</Typography>
                            : <></>
                            }
                            <TextField
                                id="outlined-required"
                                label="Nom Complet"
                                error={showWarning.nomComplet}
                                hidden={utilisateur?.association?.nomComplet == undefined ? true : false}
                                value={utilisateur?.association?.nomComplet}
                                style={{
                                    marginTop: 20,
                                }}
                                onChange={(event) => {
                                    const newUtilisateur = utilisateur;
                                    newUtilisateur.association.nomComplet = event.target.value;
                                    setUtilisateur(newUtilisateur);
                                    setLiveness(liveness + 1);
                                }}
                            />
                            {showWarning.nomComplet
                            ?
                            <Typography color="red" style={{marginBottom: 20}}>{hasUnfilled.nomComplet}</Typography>
                            : <></>
                            }
                            <TextField
                                id="outlined-required"
                                label="Nom"
                                error={showWarning.nom}
                                hidden={utilisateur?.formateur?.nom == undefined ? true : false}
                                value={utilisateur?.formateur?.nom}
                                style={{
                                    marginTop: 20,
                                }}
                                onChange={(event) => {
                                    const newUtilisateur = utilisateur;
                                    newUtilisateur.formateur.nom = event.target.value;
                                    setUtilisateur(newUtilisateur);
                                    setLiveness(liveness + 1);
                                }}
                            />
                            {showWarning.nom
                            ?
                            <Typography color="red" style={{marginBottom: 20}}>{hasUnfilled.nom}</Typography>
                            : <></>
                            }
                            <TextField
                                id="outlined-required"
                                label="Prénom"
                                error={showWarning.prenom}
                                hidden={utilisateur?.formateur?.prenom == undefined ? true : false}
                                value={utilisateur?.formateur?.prenom}
                                style={{
                                    marginTop: 20,
                                }}
                                onChange={(event) => {
                                    const newUtilisateur = utilisateur;
                                    newUtilisateur.formateur.prenom = event.target.value;
                                    setUtilisateur(newUtilisateur);
                                    setLiveness(liveness + 1);
                                }}
                            />
                             {showWarning.prenom
                            ?
                            <Typography color="red" style={{marginBottom: 20}}>{hasUnfilled.prenom}</Typography>
                            : <></>
                            }
                            {!(loading && loadingUser) ?
                                <Autocomplete
                                    multiple
                                    id="free-solo-2-demo"
                                    disableClearable
                                    options={options}
                                    hidden={utilisateur?.formateur == undefined ? true : false}
                                    /*onChange={(event, value) => {

                                    }}*/
                                    onChange={(event, value) => {
                                        const newUtilisateur = utilisateur;
                                        newUtilisateur.formateur.domaines = SelectElementDomaineToCode(value);
                                        setUtilisateur(newUtilisateur);
                                        setLiveness(liveness + 1);
                                    }}
                                    value={AfficherDataDomaines(utilisateur?.formateur?.domaines)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Domaines"

                                            InputProps={{
                                                ...params.InputProps,
                                                type: 'search',
                                            }}
                                            style={{
                                                marginTop: 20,
                                            }}
                                        />
                                    )}
                                />
                                : <></>}
                            <TextField
                                id="outlined-required"
                                label="Poste"
                                error={showWarning.poste}
                                hidden={utilisateur?.membreBureauNational?.poste == undefined ? true : false}
                                value={utilisateur?.membreBureauNational?.poste}
                                style={{
                                    marginTop: 20,
                                }}
                                onChange={(event) => {
                                    const newUtilisateur = utilisateur;
                                    newUtilisateur.membreBureauNational.poste = event.target.value;
                                    setUtilisateur(newUtilisateur);
                                    setLiveness(liveness + 1);
                                }}
                            />
                             {showWarning.poste
                            ?
                            <Typography color="red" style={{marginBottom: 20}}>{hasUnfilled.poste}</Typography>
                            : <></>
                            }
                            <TextField
                                id="outlined-required"
                                label="Ville"
                                error={showWarning.ville}
                                hidden={utilisateur?.association?.ville == undefined ? true : false}
                                value={utilisateur?.association?.ville}
                                style={{
                                    marginTop: 20,
                                }}
                                onChange={(event) => {
                                    const newUtilisateur = utilisateur;
                                    newUtilisateur.association.ville = event.target.value;
                                    setUtilisateur(newUtilisateur);
                                    setLiveness(liveness + 1);
                                }}
                            />
                            {showWarning.ville
                            ?
                            <Typography color="red" style={{marginBottom: 20}}>{hasUnfilled.ville}</Typography>
                            : <></>
                            }
                            <TextField
                                id="outlined-required"
                                label="Collège"
                                error={showWarning.college}
                                hidden={utilisateur?.association?.college == undefined ? true : false}
                                value={utilisateur?.association?.college}
                                style={{
                                    marginTop: 20,
                                }}
                                onChange={(event) => {
                                    const newUtilisateur = utilisateur;
                                    newUtilisateur.association.college = event.target.value;
                                    setUtilisateur(newUtilisateur);
                                    setLiveness(liveness + 1);
                                }}
                            />
                             {showWarning.college
                            ?
                            <Typography color="red" style={{marginBottom: 20}}>{hasUnfilled.college}</Typography>
                            : <></>
                            }
                            <TextField
                                id="outlined-required"
                                label="Adresse mail"
                                error={showWarning.email}
                                hidden={utilisateur?.email == undefined ? true : false}
                                value={utilisateur?.email}
                                style={{
                                    marginTop: 20,
                                }}
                                onChange={(event) => {
                                    const newUtilisateur = utilisateur;
                                    newUtilisateur.email = event.target.value;
                                    setUtilisateur(newUtilisateur);
                                    setLiveness(liveness + 1);

                                }}
                            />
                            {showWarning.email
                            ?
                            <Typography color="red" style={{marginBottom: 20}}>{hasUnfilled.email}</Typography>
                            : <></>
                            }
                            <Box textAlign='center'>
                                <Link to="/compte" style={{textDecoration:'none'}}>
                                    <Button
                                        variant="contained"
                                        style={{
                                            marginTop: 15,
                                            marginBottom:15,
                                            marginRight:20
                                        }}>
                                        Retour
                                    </Button>
                                </Link>
                                <Button
                                    variant="contained"
                                    size="medium"
                                    style={{
                                        marginTop: 15,
                                        marginBottom:15
                                    }}
                                    onClick={validate}
                                >
                                    Valider
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs>
                    </Grid>
                </Grid>
            </Container>
        </>

    )
}

export default AffichageModificationMonCompte;