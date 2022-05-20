import React, {useEffect, useState} from "react";
import useAxiosPrivate from '../../auth/hooks/useAxiosPrivate';
import TextField from "@mui/material/TextField";
import {FetchInformationUserById} from '../../serverInteraction/FetchUtilisateur';
import {useLocation, useNavigate} from "react-router-dom";
import {Autocomplete, Grid} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {PutUpdateUser} from '../../serverInteraction/PostDataUpdateUser';
import toast from "react-hot-toast";
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


    const handleSubmit = async () => {
        console.log(utilisateur);
        try {
            const response = await PutUpdateUser(axiosPrivate, utilisateur);
            if (response.data.code == 200) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (err) {
            toast.error('Une erreur est survenu');
            console.error(err);
        }
    }


    return (
        <>
            <div className="container-fluid">
                {/* Conteneur Info Domaines */}
                <div className="container shadow p-4 mb-3 bg-white rounded">
                    <div className="row">
                        <div className="row justify-content-md-center mt-1">
                            <div className="col col-lg-5">
                                <h3 className="color-mc">
                                    Mes informations
                                </h3>
                                <hr/>
                            </div>
                        </div>
                        <Grid container spacing={3}>
                            <Grid item xs>
                            </Grid>
                            <Grid item xs={4} style={{backgroundColor: "white"}}>
                                <Box textAlign={'center'}>
                                    <TextField
                                        id="outlined-required"
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
                                    <TextField
                                        id="outlined-required"
                                        label="Nom Complet"
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
                                    <TextField
                                        id="outlined-required"
                                        label="Nom"
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
                                    <TextField
                                        id="outlined-required"
                                        label="Prénom"
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
                                    <TextField
                                        id="outlined-required"
                                        label="Ville"
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
                                    <TextField
                                        id="outlined-required"
                                        label="Collège"
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
                                    <TextField
                                        id="outlined-required"
                                        label="Adresse Mail"
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
                                    <Box>
                                        <Button
                                            variant="contained"
                                            size="medium"
                                            style={{
                                                marginTop: 15,
                                            }}
                                            onClick={handleSubmit}
                                        >
                                            Valider
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs>
                            </Grid>
                        </Grid></div>
                </div>
            </div>
        </>

    )
}

export default AffichageModificationMonCompte;