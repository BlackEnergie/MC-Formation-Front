import React, {useState} from "react";
import toast from "react-hot-toast";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom";
import {PutUserPassword} from '../../serverInteraction/PutUser';
import Button from "@mui/material/Button";
import UtilisateurModificationMotDePasse from "../../api/model/UtilisateurModificationMotDePasse";
import useAxiosPrivate from '../../auth/hooks/useAxiosPrivate';
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import { hashPassword } from "../../utils/PasswordUtils";
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
    newpassword:String;
    confirmpassword:String;
    showNewPassword:boolean;
    showPassword: boolean;
    showConfirmPassword:boolean;
  }

function ModificationMotDePasse() {
    const utilisateur = new UtilisateurModificationMotDePasse();
    const [errPassword, setErrPassword] = useState(null);
    const [errNewPassword, setErrNewPassword] = useState(null); 
    const [errConfirmPassword, setErrConfirmPassword] = useState(null); 
    const axiosPrivate = useAxiosPrivate();
    
    const [values, setValues] = React.useState<State>({
        password: "",
        newpassword:"",
        confirmpassword:"",
        showPassword: false,
        showNewPassword:false,
        showConfirmPassword:false
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
          setValues({ ...values, [prop]: event.target.value });
        };
    
    const handleSubmit = async () => {
        setErrNewPassword(null);
        setErrPassword(null);
        setErrConfirmPassword(null);
        if(values.password==""){
            setErrPassword("Le champ ancien mot de passe est obligatoire");
        }
        if(values.newpassword==""){
            setErrNewPassword("Le champ nouveau mot de passe est obligatoire");
        }
        if(values.confirmpassword!=values.newpassword){
            setErrConfirmPassword("Les mots de passe ne correspondent pas");
        }
        if(values.confirmpassword==""){
            setErrConfirmPassword("Le champ confirmation du nouveau mot de passe est obligatoire");
        }
        if(values.password!="" && values.newpassword!="" && values.confirmpassword!="" && values.confirmpassword==values.newpassword){

            try {
                utilisateur.password = hashPassword(values.password)
                utilisateur.newPassword = hashPassword(values.newpassword)
                let response= await PutUserPassword(axiosPrivate, utilisateur);
                if (response.data.code == 200) {
                    toast.success(response.data.message);
                }
                navigate("/compte");
            } catch (err) {
                toast.error(err.response?.data?.message);
            }
        }
    }

    return(
        <>
        <Container>
            <Grid id =""  style={{
                               boxShadow:"0 .5rem 1rem rgba(0,0,0,.15)"
                            }}
                >
                    <Box textAlign={'center'}>
                        <Typography variant="h4" color="primary" style={{marginBottom:15}}>Changer votre mot de passe</Typography>
                        <InputLabel>Ancien mot de passe</InputLabel>
                        <Input
                            error ={errPassword}
                            required
                            name="password"
                            type={values.showPassword ? "text" : "password"}
                            id="password"
                            onChange={handleChange("password")}
                            style={{marginBottom:15}}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="password"
                                onClick={handleClickShowPassword}
                                >
                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                        />
                        {errPassword!=null
                            ?
                            <Typography color="red" style={{marginBottom:20}}>{errPassword}</Typography>
                            :<></>
                        }
                    </Box>
                    <Box textAlign={'center'}>
                    <InputLabel>Nouveau mot de passe</InputLabel>
                    <Input
                            required
                            error ={errNewPassword}
                            name="new-password"
                            type={values.showNewPassword ? "text" : "password"}
                            id="new-password"
                            onChange={handleChange("newpassword")}
                            style={{marginBottom:15}}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="password"
                                onClick={handleClickShowNewPassword}
                                >
                                {values.showNewPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                        />
                         {errNewPassword!=null
                            ?
                            <Typography color="red" style={{marginBottom:20}}>{errNewPassword}</Typography>
                            :<></>
                        }
                    </Box>
                    <Box textAlign={'center'}>
                        <InputLabel>Confirmation du nouveau mot de passe</InputLabel>
                        <Input
                            error ={errConfirmPassword}
                            required
                            name="confirmation-password"
                            type={values.showConfirmPassword ? "text" : "password"}
                            id="confirmation-password"
                            onChange={handleChange("confirmpassword")}
                            style={{marginBottom:15}}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="password"
                                onClick={handleClickShowConfirmPassword}
                                >
                                {values.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                        />
                           {errConfirmPassword!=null
                            ?
                            <Typography color="red" style={{marginBottom:20}}>{errConfirmPassword}</Typography>
                            :<></>
                        }
                        </Box>
                    <Box textAlign={'center'}>
                    <Button
                        variant="contained"
                        size="medium"
                        style={{
                            marginTop: 15,
                            marginBottom:20
                        }}
                        onClick={handleSubmit}
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