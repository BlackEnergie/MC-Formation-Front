import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import React, {useState} from 'react';
import {AiOutlineRollback} from "react-icons/ai";
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import {PostResetMdp} from "../../../serverInteraction/PostResetMdp";
import useAxiosPrivate from "../../../auth/hooks/useAxiosPrivate";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Link as LinkMui} from "@mui/material";


const MotDePasseOublie = () => {

    const [email, setMail] = useState('');
    const [hasUnfilled, setHasUnfilled] = useState({email: ""});
    const [loading, setLoading] = useState(false);


    const axiosPrivate = useAxiosPrivate();

    const handleSubmit = async () => {
        try {
            setLoading(true)
            const response = await PostResetMdp(email)
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
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Link to="/" id="linkAccueil">
                    <Button startIcon={<AiOutlineRollback className="Icones me-2"/>}  color="primary" sx={{ml:2}} >Retour </Button>
                </Link>
            </Grid>

            <Container component="main" maxWidth="md" >
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        boxShadow : 2,
                        paddingLeft : 10,
                        paddingRight: 10,
                        paddingTop: 3,
                        paddingBottom:3,
                        borderRadius:2,
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Vous avez oublié votre mot de passe
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Votre email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            id="outlined-basic"
                            variant="outlined"
                            onChange={event => setMail(event.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={validate}
                        >
                            M'envoyer le lien
                        </Button>
                    </Box>
                    <Link to="/motDePasseOublieToken">
                        <LinkMui color="primary">Reset Mdp Temporaire</LinkMui>
                    </Link>
                </Box>
            </Container>
        </Grid>
        </>

    )
}

export default MotDePasseOublie;