import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import React, {useState} from 'react';
import {AiOutlineRollback} from "react-icons/ai";
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import {PostResetMdp} from "../../../serverInteraction/PostResetMdp";
import useAxiosPrivate from "../../../auth/hooks/useAxiosPrivate";

const MotDePasseOublie = () => {

    const [email, setMail] = useState('');
    const [hasUnfilled, setHasUnfilled] = useState({email: ""});
    const [loading, setLoading] = useState(false);


    const axiosPrivate = useAxiosPrivate();

    const handleSubmit = async () => {
        try {
            setLoading(true)
            const response = await PostResetMdp(axiosPrivate, email)
            toast.success(response.data.message);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }


    const validate = (e) => {
        e.preventDefault();
        let hasUnfilled = {email: ""};
        let isValid = true;
        if (!email) {
            isValid = false;
        }
        if (isValid) {
            handleSubmit();
        } else {
            setHasUnfilled(hasUnfilled);
        }
    }

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
                    <TextField id="outlined-basic" label="Adresse mail" variant="outlined" margin="normal" sx={{mr:2}} size="small"
                               onChange={event => setMail(event.target.value)}
                    />
                </div>
                <Button variant="contained" color="secondary"
                        onClick={validate}>Confirmer</Button>
            </Grid>
            
            </Grid>
        </>

    )
}

export default MotDePasseOublie;