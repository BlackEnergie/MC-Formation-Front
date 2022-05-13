import './VueDetailleeFormation.css';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {FetchFormationById} from '../../../serverInteraction/FetchFormation';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useAxiosPrivate from '../../../auth/hooks/useAxiosPrivate';
import Container from '@mui/material/Container';
import InformationsGeneralesFormation from './InformationsGeneralesFormation';
import Formation from '../../../api/model/Formation';
import InformationsFicheDeFormation from './InformationsFicheDeFormation';
import FilConducteurFormation from './FilConducteurFormation';
import {toast} from 'react-hot-toast';


const VueDetailleeFormation = () => {
    const [formation, setFormation] = useState(new Formation());
    const [loading, setLoading] = useState(true);
    let {id} = useParams();
    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        getFormationDetails();
    }, [])

    const getFormationDetails = async () => {
        try {
            const response = await FetchFormationById(axiosPrivate, id)
            setFormation(response?.data);
            setLoading(false);
        } catch (err) {
            toast.error(err.message);
            console.error(err);
        }
    }

    let nomFiche = 'Fiche de formation';
    if (formation && formation.type === 'Atelier') {
        nomFiche = 'Fiche d\'Atelier'
    }

    return (
        <Container maxWidth={'xl'}>
            <div>
                <Accordion defaultExpanded={true}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography
                            fontWeight="bold"
                            color="primary"
                            component="h1"
                            variant="h5">
                            Informations détaillées
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <InformationsGeneralesFormation formation={formation} loading={loading} setLoading={setLoading}/>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography
                            fontWeight="bold"
                            color="primary"
                            component="h1"
                            variant="h5">
                            {nomFiche}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <InformationsFicheDeFormation formation={formation}/>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                    >
                        <Typography
                            fontWeight="bold"
                            color="primary"
                            component="h1"
                            variant="h5">
                            Fil conducteur
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FilConducteurFormation formation={formation}/>
                    </AccordionDetails>
                </Accordion>
            </div>
        </Container>
    )
}

export default VueDetailleeFormation;
