import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

import ModificationFicheDeFormation from "./ModificationFicheDeFormation";
import ModificationFilConducteur from "./ModificationFilConducteur";
import ModificationInformationsGenerales from "./ModificationInformationsGenerales";

import {FetchFormationById} from '../../../serverInteraction/FetchFormation';
import {FetchDomaines} from "../../../serverInteraction/FetchData";
import useAxiosPrivate from '../../../auth/hooks/useAxiosPrivate';
import Formation from '../../../api/model/Formation';
import {domaines} from "../../Accueil/ComposantAccueil/FiltreAccueil";

import {Accordion, AccordionDetails, AccordionSummary, Container, Fab, Link, Skeleton, Typography} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SaveIcon from '@mui/icons-material/Save';

const ModificationFormation = () => {
    const FabStyle = {
        margin: 0,
        top: 'auto',
        right: 40,
        bottom: 40,
        left: 'auto',
        position: 'fixed',
    }
    const INITIAL_FORMATION: Formation = new Formation();
    const INITIAL_DOMAINE : domaines[] = [];
    let {id} = useParams();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const [formation, setFormation] = useState(INITIAL_FORMATION);
    const [loading, setLoading] = useState(true);
    const [domaine, setDomaine] = useState(INITIAL_DOMAINE);

    useEffect(() => {
        getFormationDetails().then(data => setFormation(data));
        getDomaineList();
    }, [])

    const majFormation = (newFormation) => {
        setFormation(newFormation);
    }

    const getFormationDetails = async () => {
        try {
            const response = await FetchFormationById(axiosPrivate, id);
            setFormation(response?.data);
            let data = response.data;
            setLoading(false);
            return data;
        } catch (err) {
            console.log(err)
            toast.error(err.response?.data?.message);
            if (err.response?.data?.code === 403){
                navigate('/')
            }
        }
    }

    const getDomaineList = async () => {

        try {
            const controller = new AbortController();
            const response = await FetchDomaines(axiosPrivate,controller);
            setDomaine(response?.data);
        }catch (err){
            console.log(err)
        }
    }

    useEffect(() => {
        getDomaineList();
    },[])

    let nomFiche = 'FDF';
    if (formation && formation.type === 'Atelier') {
        nomFiche = 'FDA'
    }

    return (
        <Container maxWidth={"xl"}>
            <Link className="text-decoration-none" //to={'/formation/edit/' + formation.id}
                  title="Modifier la formation">
                <Fab sx={FabStyle} color="primary" aria-label="edit">
                    <SaveIcon/>
                </Fab>
            </Link>
            {loading ?
                <Skeleton sx={{width: 'auto'}}/> :
                <>
                    <Typography
                        mb="10px"
                        color="primary"
                        variant="h4"
                        id="tableTitle"
                        component="div">
                        <span color="primary">
                            {formation.nom ? formation.nom : formation.sujet}
                        </span>
                    </Typography>
                </>
            }
            {!loading ?
                <>
                    <Accordion defaultExpanded={true}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header">
                            <Typography
                                fontWeight="bold"
                                color="primary"
                                component="h1"
                                variant="h5">
                                Informations {formation.type ? formation.type.toLowerCase() : 'formation'}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ModificationInformationsGenerales formation={formation}
                                                               majFormation={majFormation} domaine={domaine}/>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel2a-content"
                            id="panel2a-header">

                            <Typography
                                fontWeight="bold"
                                color="primary"
                                component="h1"
                                variant="h5">
                                {nomFiche}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ModificationFicheDeFormation formation={formation} majFormation={majFormation} domaine={domaine} setFormation={setFormation}/>
                            <ModificationFilConducteur formation={formation} majFormation={majFormation}/>
                        </AccordionDetails>
                    </Accordion>
                </>
                : <></>
            }
        </Container>

    )
}

export default ModificationFormation;
