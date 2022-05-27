import React, {useEffect, useState} from 'react';
import Domaine from "../../../api/model/Domaine";
import Demande from "../../../api/model/Demande";
import useAxiosPrivate from '../../../auth/hooks/useAxiosPrivate';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { FetchDomaines } from '../../../serverInteraction/FetchData';
import { PostDemande } from '../../../serverInteraction/PostDemande';
import {Alert, Autocomplete, Box, Button, Divider, Fab, Grid, TextField, Typography} from '@mui/material';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import decodeToken from '../../../auth/decodeToken';
import toast from 'react-hot-toast';

const DemandeFormation = () => {

    const INITIAL_DOMAINE: Domaine[] = [];
    const [domaine, setDomaine] = useState(INITIAL_DOMAINE);
    const [sujet, setSujet] = useState('');
    const [detail, setDetail] = useState('');
    const [selectedDomaines, setSelectedDomaines] = useState([]);
    const [hasUnfilled, setHasUnfilled] = useState({selectedDomaines:"",sujet:"",detail:""});
    const [showWarning, setShowWarning] =useState({selectedDomaines:false,sujet:false,detail:false});
    const axiosPrivate = useAxiosPrivate();

    const handleSubmit = async () => {
        let demande = mapFormToDemande();
        try {
            const response = await PostDemande(axiosPrivate, demande);
            if (response.data.code == 201) {
                toast.success(response.data.message);
                resetForm();
            } else {
                toast.error(response.data.message);
            }
        } catch (err) {
            toast.error('Une erreur est survenue');
            console.error(err);
        }
    }
    const mapFormToDemande = () => {
        let demande = new Demande();
        let domainesArr = [];

        demande.sujet = sujet;
        demande.detail = detail;
        selectedDomaines.forEach(item => {
            let domaine = new Domaine();
            domaine.code = item.value.code;
            domaine.libelle = item.value.libelle;
            domaine.description = item.value.description;
            domainesArr.push(domaine);
        });
        demande.domaines=domainesArr;

        const token = decodeToken(localStorage.getItem('accessToken')).decoded;
        demande.nomUtilisateur = token.sub;

        return demande;

    }

    useEffect(() => {
        getDomaineList();
    }, [])
    const getDomaineList = async () => {
        try {
            const controller = new AbortController();

            const resDomaines = await FetchDomaines(axiosPrivate, controller);
            setDomaine(resDomaines?.data);
        } catch (err) {
            console.log(err)
        }
    };

    const resetForm = () => {
        setSujet('');
        setDetail('');
        setHasUnfilled({selectedDomaines:"",sujet:"",detail:""});
        setSelectedDomaines([]);
        setShowWarning({selectedDomaines:false,sujet:false,detail:false});
    };

    const validate = () => {

        let hasUnfilled = {selectedDomaines:"",sujet:"",detail:""};
        let showWarning = {selectedDomaines:false,sujet:false,detail:false};
        let isValid = true;

        if (!sujet) {
            isValid=false;
            hasUnfilled["sujet"] = "Renseignez un sujet.";
            showWarning["sujet"] = true;
        }
        if (!detail) {
            isValid = false;
            hasUnfilled["detail"] = "Renseignez les détails de la demande.";
            showWarning["detail"] = true;
        }
        if (selectedDomaines.length === 0) {
            isValid = false;
            hasUnfilled["selectedDomaines"] = "Renseignez au moins un domaine.";
            showWarning["selectedDomaines"] = true;
        }
        if (isValid) {
            handleSubmit();
        } else {
            setHasUnfilled(hasUnfilled);
            setShowWarning(showWarning);
        }
    }

    const FabStyle = {
        margin: 0,
        top: 70,
        right: 'auto',
        bottom: 'auto',
        left: 40,
        position: 'fixed',
    };
    const boxStyle = {
        borderRadius: '.25rem',
        padding: '1.5rem',
        marginBottom: '1rem',
        boxShadow: '0 .5rem 1rem rgba(0,0,0,.15)',
        width: '50%',
        align: 'center',
        marginLeft: 'auto',
        marginRight: 'auto'
    };
    let listeDomaines = domaine.map((item, index) => {
        return {
            label: item.libelle,
            value: item,
            key: item.code,

        }
    });


    return (
        <Box style={boxStyle} >
            <Link to="/" id="linkAccueil">
                <Fab sx={FabStyle} color="primary" aria-label="edit">
                    <KeyboardReturnIcon/>
                </Fab>
            </Link>
            <Grid mt={2} container rowSpacing={0} columnSpacing={2} width="100%">
                
                <Typography variant="h4" width="100%" textAlign="center" color="primary">
                    Demande de formation
                </Typography>

                <Grid item mt={3} width="100%">
                    <Typography mb={1}>
                        Indiquez le ou les domaines de formation ?
                    </Typography>
                    <Autocomplete
                        value={selectedDomaines}
                        multiple
                        id="free-solo-2-demo"
                        disableClearable
                        options={listeDomaines}
                        fullWidth={true}
                        //value={}
                        onChange={(event, value) => {
                            setSelectedDomaines(value);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Domaines"
                                InputProps={{
                                    ...params.InputProps,
                                    type: "search",
                                }}
                            />
                        )}
                    />
                    {showWarning.selectedDomaines == true
                        ? <Typography color="red" style={{marginTop: 20}}>{hasUnfilled.selectedDomaines}</Typography>
                        : <></>
                    }
                </Grid>
                <Grid item mt={3} width="100%">
                    <Typography mb={1}>
                        Indiquez le sujet de la formation?
                    </Typography>
                    <TextField
                        value={sujet}
                        fullWidth={true}
                        variant="standard"
                        inputProps={{style: {fontSize: 12}}}
                        size="small"
                        multiline={true}
                        onChange={
                            (event) => {
                                setSujet(event.target.value);
                            }
                        }>
                    </TextField>
                    {showWarning.sujet == true
                      ? <Typography color="red" style={{marginTop: 20}}>{hasUnfilled.sujet}</Typography>
                      : <></>
                    }
                </Grid>
                <Grid item mt={3} width="100%">
                    <Typography mb={1}>
                        Ajoutez des détails sur votre demande de formation
                    </Typography>
                    <TextField
                        value={detail}
                        fullWidth={true}
                        variant="standard"
                        inputProps={{style: {fontSize: 12}}}
                        size="small"
                        multiline={true}
                        onChange={
                            (event) => {
                                setDetail(event.target.value);
                            }
                        }>
                    </TextField>
                    {showWarning.detail == true
                        ? <Typography color="red" style={{marginTop: 20}}>{hasUnfilled.detail}</Typography>
                        : <></>
                    }

                </Grid>
                <Grid item mt={3} width="100%" sx={{display:'flex', justifyContent: 'center',}}>
                    <Button variant="contained" color="primary" type="submit" sx={{marginRight:1}} onClick={validate}>
                        Valider
                    </Button>
                    <Button variant="contained" color="primary" type="submit" sx={{marginLeft:1}} onClick={resetForm}>
                        Reset
                    </Button>
                </Grid>
            </Grid>

        </Box>
    );
}

export default DemandeFormation;



