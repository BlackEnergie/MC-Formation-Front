import './VueDetailleeFormation.css';
import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
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
import {Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, Skeleton} from '@mui/material';
import {Statut} from '../../../utils/StatutUtils';
import InformationsDemande from './InformationsDemande';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import { DeleteDemande } from '../../../serverInteraction/PostDemande';
import decodeToken from '../../../auth/decodeToken';

const VueDetailleeFormation = () => {
    const [formation, setFormation] = useState(new Formation());
    const [loading, setLoading] = useState(true);
    let {id} = useParams();
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const token = decodeToken(localStorage.getItem("accessToken")).decoded;

    const checkRoleBn = () => {
        return token.role === "ROLE_BN";
      };

    useEffect(() => {
        getFormationDetails();
    }, [])

    const handleOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };

    const getFormationDetails = async () => {
        try {
            const response = await FetchFormationById(axiosPrivate, id)
            setFormation(response?.data);
            setLoading(false);
        } catch (err) {
            console.log(err)
            toast.error(err.response?.data?.message);
            if (err.response?.data?.code === 403){
                navigate('/')
            }
        }
    }


    const deleteDemande= async () => {
        handleClose();
        try {
            const response = await DeleteDemande(axiosPrivate, id)
            if(response.data.code==200){
                toast.success(response.data.message);
                navigate('/');
            }
            
        } catch (err) {
            console.log(err)
            toast.error(err.response?.data?.message);
        }
    }

    let nomFiche = 'FDF';
    if (formation && formation.type === 'Atelier') {
        nomFiche = 'FDA'
    }

    const FabStyle = {
        margin: 0,
        top: 'auto',
        right: 40,
        bottom: 40,
        left: 'auto',
        position: 'fixed',
    }

    return (
        <Container maxWidth={'xl'}>
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
                    <Box sx={{ '& > :not(style)': { mb: 10 } }}>
                        {
                            checkRoleBn() && (formation.statut === Statut.DEMANDE.toUpperCase())
                            ? <Fab sx={FabStyle} title="Supprimer la demande" color="primary" aria-label="delete" onClick={handleOpen}>
                                <DeleteIcon/>
                            </Fab>
                            :<></>
                        }
                        <Link className="text-decoration-none" to={'/formation/edit/' + formation.id}
                            title="Modifier la formation">
                            <Fab sx={FabStyle} color="primary" aria-label="edit">
                                <EditIcon/>
                            </Fab>
                        </Link>
                    </Box>
                    <Dialog
                        open={open}
                        onClose={() => handleClose()}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        >
                        <DialogTitle
                            id="alert-dialog-title"
                            color="primary"
                            textAlign="center"
                        >Confirmez-vous la suppression ?
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>Êtes-vous sûrs de vouloir supprimer la demande.</DialogContentText>
                            <DialogContentText>Cette action est irréversible.</DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Annuler</Button>
                            <Button onClick={deleteDemande} color="error" >Supprimer</Button>
                        </DialogActions>
                    </Dialog>
                </>
            }
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
                <AccordionDetails>
                    <InformationsDemande formation={formation} loading={loading} setLoading={setLoading}/>
                </AccordionDetails>
            </Accordion>
            {!loading && (formation.statut !== Statut.DEMANDE.toUpperCase()) ?
                <>
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
                            <InformationsGeneralesFormation formation={formation} loading={loading}
                                                            setLoading={setLoading}/>
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
                            <InformationsFicheDeFormation formation={formation}/>
                            <FilConducteurFormation formation={formation}/>
                        </AccordionDetails>
                    </Accordion>
                </>
                : <></>
            }
        </Container>
    )
}

export default VueDetailleeFormation;
