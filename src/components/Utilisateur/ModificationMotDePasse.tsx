import React, {useState} from "react";
import toast from "react-hot-toast";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {Link, useNavigate} from "react-router-dom";
import {PutUserPassword} from '../../serverInteraction/PutUser';
import Button from "@mui/material/Button";
import UtilisateurModificationMotDePasse from "../../api/model/UtilisateurModificationMotDePasse";
import useAxiosPrivate from '../../auth/hooks/useAxiosPrivate';
import Container from "@mui/material/Container";
import {Typography} from "@mui/material";
import {hashPassword} from "../../utils/PasswordUtils";
import {
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";


interface State {
    password: String;
    newpassword: String;
    confirmpassword: String;
    showNewPassword: boolean;
    showPassword: boolean;
    showConfirmPassword: boolean;
}

function ModificationMotDePasse() {
    const utilisateur = new UtilisateurModificationMotDePasse();
    const [hasUnfilled, setHasUnfilled] = useState({password:"",newPassword:"",confirmPassword:"",badMatch:""});
    const [showWarning, setShowWarning] = useState({password:false,newPassword:false,confirmPassword:false,badMatch:false});
    const axiosPrivate = useAxiosPrivate();

    const [values, setValues] = React.useState<State>({
        password: "",
        newpassword: "",
        confirmpassword: "",
        showPassword: false,
        showNewPassword: false,
        showConfirmPassword: false
    });

    const navigate = useNavigate();

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
    const handleClickShowNewPassword = () => {
        setValues({
            ...values,
            showNewPassword: !values.showNewPassword,
        });
    };
    const handleClickShowConfirmPassword = () => {
        setValues({
            ...values,
            showConfirmPassword: !values.showConfirmPassword,
        });
    };

    const handleChange =
        (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({...values, [prop]: event.target.value});
        };


    const validate = () => {
        let hasUnfilled = {password:"",newPassword:"",confirmPassword:"",badMatch:""};
        let showWarning = {password:false,newPassword:false,confirmPassword:false,badMatch:false};
        let isValid = true;
        if (values.password == "") {
            isValid=false;
            hasUnfilled["password"] = "Le champ ancien mot de passe est obligatoire";
            showWarning["password"] = true;
        }
        if (values.newpassword == "") {
            isValid = false;
            hasUnfilled["newPassword"] = "Le champ nouveau mot de passe est obligatoire";
            showWarning["newPassword"] = true;
        }
        if (values.confirmpassword != values.newpassword) {
            isValid = false;
            hasUnfilled["badMatch"] = "Les mots de passe ne correspondent pas";
            showWarning["badMatch"] = true;
        }
        if (values.confirmpassword == "") {
            isValid = false;
            hasUnfilled["confirmPassword"] = "Le champ confirmation du nouveau mot de passe est obligatoire";
            showWarning["confirmPassword"] = true;
        }
        if (isValid) {
            handleSubmit();
        } else {
            setHasUnfilled(hasUnfilled);
            setShowWarning(showWarning);
        }
    }

    const handleSubmit = async () => {
        try {
            utilisateur.password = hashPassword(values.password)
            utilisateur.newPassword = hashPassword(values.newpassword)
            let response = await PutUserPassword(axiosPrivate, utilisateur);
            if (response.data.code == 200) {
                toast.success(response.data.message);
            }
            navigate("/compte");
        } catch (err) {
            toast.error(err.response?.data?.message);
        }
    }

    return (
        <>
            <Container>
                <Grid id="" style={{
                    boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)"
                }}
                >
                    <Box textAlign={'center'}>
                        <Typography variant="h4" color="primary" style={{marginBottom: 15}}>Changer votre mot de
                            passe</Typography>
                        <InputLabel>Ancien mot de passe</InputLabel>
                        <Input
                            error={showWarning.password}
                            required
                            name="password"
                            type={values.showPassword ? "text" : "password"}
                            id="password"
                            onChange={handleChange("password")}
                            style={{marginBottom: 15}}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="password"
                                        onClick={handleClickShowPassword}
                                    >
                                        {values.showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        {showWarning.password
                            ?
                            <Typography color="red" style={{marginBottom: 20}}>{hasUnfilled.password}</Typography>
                            : <></>
                        }
                    </Box>
                    <Box textAlign={'center'}>
                        <InputLabel>Nouveau mot de passe</InputLabel>
                        <Input
                            required
                            error={showWarning.newPassword}
                            name="new-password"
                            type={values.showNewPassword ? "text" : "password"}
                            id="new-password"
                            onChange={handleChange("newpassword")}
                            style={{marginBottom: 15}}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="password"
                                        onClick={handleClickShowNewPassword}
                                    >
                                        {values.showNewPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        {showWarning.newPassword
                            ?
                            <Typography color="red" style={{marginBottom: 20}}>{hasUnfilled.newPassword}</Typography>
                            : <></>
                        }
                    </Box>
                    <Box textAlign={'center'}>
                        <InputLabel>Confirmation du nouveau mot de passe</InputLabel>
                        <Input
                            error={showWarning.confirmPassword}
                            required
                            name="confirmation-password"
                            type={values.showConfirmPassword ? "text" : "password"}
                            id="confirmation-password"
                            onChange={handleChange("confirmpassword")}
                            style={{marginBottom: 15}}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="password"
                                        onClick={handleClickShowConfirmPassword}
                                    >
                                        {values.showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        {showWarning.confirmPassword
                            ?
                            <Typography color="red" style={{marginBottom: 20}}>{hasUnfilled.confirmPassword}</Typography>
                            : <></>
                        }
                    </Box>
                    <Box textAlign={'center'}>
                        <Link to="/compte" style={{textDecoration: 'none'}}>
                            <Button
                                variant="contained"
                                style={{
                                    marginTop: 15,
                                    marginBottom: 15,
                                    marginRight: 20
                                }}>
                                Retour
                            </Button>
                        </Link>
                        <Button
                            variant="contained"
                            size="medium"
                            style={{
                                marginTop: 15,
                                marginBottom: 20
                            }}
                            onClick={validate}
                        >
                            Enregistrer
                        </Button>
                    </Box>
                </Grid>
            </Container>
        </>
    )
}

export default ModificationMotDePasse;