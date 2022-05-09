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


const VueDetailleeFormationV2 = () => {
    const [formation, setFormation] = useState(null);
    let {id} = useParams();
    const axiosPrivate = useAxiosPrivate()



    const getFormationDetails = async () => {
        try {
            const response = await FetchFormationById(axiosPrivate, id)
            setFormation(response?.data);
            console.log(response.data);
            console.log(formation);
        } catch (err) {
            console.error(err);
        }
    }

    getFormationDetails();
    console.log("test formation"+formation.statut);

    /*useEffect(() => {
        console.log("bite");
        getFormationDetails();
    }, [getFormationDetails])*/

    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Information Générales 1</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <InformationsGeneralesFormation formation={formation}/>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>Fiche de formation</Typography>
                </AccordionSummary>
                <AccordionDetails>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                >
                    <Typography>Fil conducteur</Typography>
                </AccordionSummary>
                <AccordionDetails>
                </AccordionDetails>
            </Accordion>
        </div>

    )
}

export default VueDetailleeFormationV2;
