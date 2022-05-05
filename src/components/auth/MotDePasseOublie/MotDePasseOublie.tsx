import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import React, {useState} from 'react';
import {AiOutlineRollback} from "react-icons/ai";
import { Link } from 'react-router-dom';

const MotDePasseOublie = () => {


    return(
        <>
        <Grid container>
            <Grid item xs={2}>
                <Link to="/" id="linkAccueil">
                    <Button startIcon={<AiOutlineRollback className="Icones me-2"/>}  color="primary" sx={{ml:2}} >Retour </Button>
                </Link>
            </Grid>
            <Grid item xs={8}>
                <div>
                    Recevoir un mail pour changer votre mot de passe :
                </div>
                <div>
                    <TextField id="outlined-basic" label="Adresse mail" variant="outlined" margin="normal" sx={{mr:2}} size="small" />
                </div>
                <Button variant="contained" color="secondary">Confirmer</Button>
            </Grid>
            
            </Grid>
        </>

    )
}

export default MotDePasseOublie;