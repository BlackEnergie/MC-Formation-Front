import React, {useEffect, useState} from 'react';
import ModificationFicheDeFormation from "./ModificationFicheDeFormation";
import ModificationFilConducteur from "./ModificationFilConducteur";
import {useParams} from "react-router-dom";
import {FetchFormationById} from '../../../serverInteraction/FetchFormation';
import useAxiosPrivate from '../../../auth/hooks/useAxiosPrivate';
import Formation from '../../../api/model/Formation';
import {Accordion, AccordionDetails, AccordionSummary, Container, Typography } from '@mui/material';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import NavFormation from "../NavigationFormation/NavFormation";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ModificationInformationsGenerales from "./ModificationInformationsGenerales";

const ModificationFormation = () => {
    const INITIAL_FORMATION: Formation = new Formation()
    let {id} = useParams();
    const axiosPrivate = useAxiosPrivate()
    const [formation, setFormation] = useState(INITIAL_FORMATION);
    const [showComponent, setShowComponent] = useState(0);

    useEffect(() => {
        getFormationDetails();
    }, [])

    const majFormation = (newFormation) => {
        setFormation(newFormation);
    }

    const getFormationDetails = async () => {
        try {
            const response = await FetchFormationById(axiosPrivate, id);
            setFormation(response?.data);
            setShowComponent(1);
        } catch (err) {
            console.error(err);
        }
    }
    const majShowComponent = (val) => {
        setShowComponent(val);
    }

    const sauvegarderTout = () => {
        // TODO: Save
    }

    console.log(formation);
    return (

        <Container maxWidth={"xl"}>
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
                        Informations demande
                    </Typography>
                </AccordionSummary>
                {/*
<AccordionDetails>
<InformationsDemande formation={formation} loading={loading} setLoading={setLoading}/>
</AccordionDetails>
*/}
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header">
                    <Typography
                        fontWeight="bold"
                        color="primary"
                        component="h1"
                        variant="h5">
                        Informations {formation.type? formation.type.toLowerCase(): 'formation'}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <ModificationInformationsGenerales formation={formation}  majFormation={majFormation}/>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel2a-content"
                    id="panel2a-header">
                    {/*
                    <Typography
                        fontWeight="bold"
                        color="primary"
                        component="h1"
                        variant="h5">
                        {nomFiche}
                    </Typography>
                    */}
                </AccordionSummary>
                <AccordionDetails>

                    <ModificationFilConducteur formation={formation} majFormation={majFormation}/>
                </AccordionDetails>
            </Accordion>

        </Container>


    )
}

export default ModificationFormation;
