import React, {useEffect, useState} from "react";
import { FetchDomaines } from "../../serverInteraction/FetchData"
import useAxiosPrivate from '../../auth/hooks/useAxiosPrivate';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {Grid} from "@mui/material";
import { FetchInformationUserById } from '../../serverInteraction/FetchUtilisateur';
import {useParams} from "react-router-dom";
import decodeToken from "../../auth/decodeToken";




function AffichageMonCompte() {

    const [information, setInformation] = useState(null);

    const axiosPrivate = useAxiosPrivate()
    let id = decodeToken(localStorage.getItem("accessToken")).decoded.id;

    useEffect(() => {
        getInfoUser();
    }, [])
    const getInfoUser = async () => {
        try {
            const response = await FetchInformationUserById(axiosPrivate, id)
            setInformation(response?.data);

        } catch (err) {
            console.error(err);
        }
    }

    const data = {
        nomutilisateur : information?.nomUtilisateur,
        nom : information?.formateurApi?.nom,
        prenom : information?.formateurApi?.prenom,
        email : information?.email,
        poste : information?.membreBureauNationalApi?.poste,
        ville : information?.associationApi?.ville,
        college : information?.associationApi?.college,
        acronyme : information?.associationApi?.acronyme,
        nomComplet : information?.associationApi?.nomComplet
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
                    </Grid>
                <Grid item xs>
                </Grid>
            </Grid></div></div></div>

        </>


    )
}
export default AffichageMonCompte;
