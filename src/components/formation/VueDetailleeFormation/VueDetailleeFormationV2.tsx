import './VueDetailleeFormation.css';
import React, {useEffect, useState} from 'react';
import InformationsGeneralesFormation from "./InformationsGeneralesFormation";
import {useParams} from "react-router-dom";
import {FetchFormationById} from '../../../serverInteraction/FetchFormation';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useAxiosPrivate from '../../../auth/hooks/useAxiosPrivate';
import InformationsFicheDeFormation from "./InformationsFicheDeFormation";
import FilConducteurFormation from "./FilConducteurFormation";
import Container from "@mui/material/Container";
import InformationsGeneralesFormationV2 from "./InformationsGeneralesFormationV2";
import InformationsFicheDeFormationV2 from "./InformationsFicheDeFormationV2";
import FilConducteurFormationV2 from "./FilConducteurFormationV2";


const VueDetailleeFormationV2 = () => {
    const [formation, setFormation] = useState({
        association: {acronyme: "", nomComplet: ""}, dateDemande: "", detail: "", domaines: [], formateurs: [],
        id: 0, material: [], objectifs: [], statut: "", sujet: ""
        , contenu: "", methodologie: "", plan: "", timing: "", type: "", date: "", cadre: ""
    });
    let {id} = useParams();
    const axiosPrivate = useAxiosPrivate()


    useEffect(() => {
        getFormationDetails();
    }, [])


    const getFormationDetails = async () => {
        try {
            const response = await FetchFormationById(axiosPrivate, id)
            setFormation(response?.data);
            console.log(formation);
        } catch (err) {
            console.error(err);
        }
    }


    return (
        <Container maxWidth={"xl"}>
            <div>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography
                            fontWeight='bold'
                            color="primary"
                            component="h1"
                            variant="h5">
                            Informations détaillées
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <InformationsGeneralesFormationV2 formation={formation}/>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography
                            fontWeight='bold'
                            color="primary"
                            component="h1"
                            variant="h5">
                            Fiche de formation
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <InformationsFicheDeFormationV2 formation={formation}/>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                    >
                        <Typography
                            fontWeight='bold'
                            color="primary"
                            component="h1"
                            variant="h5">
                            Fil conducteur
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FilConducteurFormationV2 formation={formation}/>
                    </AccordionDetails>
                </Accordion>
            </div>
        </Container>

    )
}

export default VueDetailleeFormationV2;
