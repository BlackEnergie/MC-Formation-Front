import React, {useEffect, useState} from "react";
import useAxiosPrivate from '../../auth/hooks/useAxiosPrivate';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {Grid} from "@mui/material";
import { FetchInformationUserById } from '../../serverInteraction/FetchUtilisateur';
import {useParams} from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Nav from 'react-bootstrap/Nav';
import {Link, useNavigate} from 'react-router-dom';
import UtilisateurInfo from "../../api/model/UtilisateurInfo";




export function AfficherDataDomaines (domaines : [])  {
    let listedomaines = "";
    if(domaines!==undefined) {
        domaines.map(
            (domaine) => {
                listedomaines += domaine?.['libelle'] + ", ";
            }
        )
        listedomaines = listedomaines.replace(/,\s*$/, "");
        return listedomaines;
    }
}


function AffichageMonCompte() {

    const [information, setInformation] = useState(null);
    const initialUtilisateur : UtilisateurInfo = null;
    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        getInfoUser();
    }, [])
    const getInfoUser = async () => {
        try {
            const response = await FetchInformationUserById(axiosPrivate)
            setInformation(response?.data);


        } catch (err) {
            console.error(err);
        }
    }
    const data = {
        nomutilisateur : information?.nomUtilisateur,
        nom : information?.formateur?.nom,
        prenom : information?.formateur?.prenom,
        email : information?.email,
        poste : information?.membreBureauNational?.poste,
        ville : information?.association?.ville,
        college : information?.association?.college,
        acronyme : information?.association?.acronyme,
        nomComplet : information?.association?.nomComplet,
        domaines : information?.formateur?.domaines
    }




    return(

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
                <Grid item xs={4} style={{backgroundColor:"white"}}>
                        <Typography
                            align="center"
                            style={{backgroundColor:"#0085f2",borderRadius:10, color:'white'}}
                            hidden={data.nomutilisateur==undefined?true:false}>
                            Nom d'utilisateur : {data.nomutilisateur}
                        </Typography>
                        <Typography
                            align="center"
                            style={{backgroundColor:"#0085f2",borderRadius:10, color:'white'}}
                            hidden={data.acronyme==undefined?true:false}>
                            Acrononyme : {data.acronyme}
                        </Typography>
                        <Typography
                            align="center"
                            style={{backgroundColor:"#0085f2",borderRadius:10, color:'white'}}
                            hidden={data.nomComplet==undefined?true:false}>
                            Nom Complet : {data.nomComplet}
                        </Typography>
                        <Typography
                            align="center"
                            style={{backgroundColor:"#0085f2",borderRadius:10, color:'white'}}
                            hidden={data.nom==undefined?true:false}>
                            Nom : {data.nom}
                        </Typography>
                        <Typography
                            align="center"
                            style={{backgroundColor:"#0085f2",borderRadius:10, color:'white'}}
                            hidden={data.prenom==undefined?true:false}>
                            Prénom : {data.prenom}
                        </Typography>
                        <Typography
                            align="center"
                            style={{backgroundColor:"#0085f2",borderRadius:10, color:'white'}}
                            hidden={data.domaines==undefined?true:false}>
                            Domaine(s) : {AfficherDataDomaines(data.domaines)}
                        </Typography>
                        <Typography
                            align="center"
                            style={{backgroundColor:"#0085f2",borderRadius:10, color:'white'}}
                            hidden={data.poste==undefined?true:false}>
                            Poste : {data.poste}
                        </Typography>
                        <Typography
                            align="center"
                            style={{backgroundColor:"#0085f2",borderRadius:10, color:'white'}}
                            hidden={data.ville==undefined?true:false}>
                            Ville : {data.ville}
                        </Typography>
                        <Typography
                            align="center"
                            style={{backgroundColor:"#0085f2",borderRadius:10, color:'white'}}
                            hidden={data.college==undefined?true:false}>
                            Collège : {data.college}
                        </Typography>
                        <Typography
                            align="center"
                            style={{backgroundColor:"#0085f2",borderRadius:10, color:'white'}}
                            hidden={data.email==undefined?true:false}>
                            Email : {data.email}
                        </Typography>
                    <Nav.Link>
                        <Link to="/modificationMonCompte">
                            <Box textAlign='center'>
                                <Button
                                    variant="contained"
                                    size="medium"
                                    style={{
                                        marginTop: 15,
                                    }}>
                                    Modifier
                                </Button>
                            </Box>
                        </Link>
                    </Nav.Link>
                    </Grid>
                <Grid item xs>
                </Grid>
            </Grid></div></div></div>

        </>


    )
}
export default AffichageMonCompte;
