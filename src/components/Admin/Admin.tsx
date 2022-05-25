import React, {useEffect, useState} from 'react';
import toast from 'react-hot-toast';
import {PostMailSingUp} from '../../serverInteraction/PostAdmin';
import useAxiosPrivate from '../../auth/hooks/useAxiosPrivate';
import LoadingButton from '@mui/lab/LoadingButton';
import {Box, Grid, MenuItem, Select, SelectChangeEvent, Tab, Tabs, TextField, Typography} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MembresBN from './TabsAdmin/MembresBN';
import {
    FetchAssociations,
    FetchFormateurs,
    FetchInvitations,
    FetchMembresBureauNational
} from '../../serverInteraction/FetchAdmin';
import MembreBureauNational from '../../api/model/MembreBureauNational';
import Association from '../../api/model/Association';
import Formateur from '../../api/model/Formateur';
import Associations from './TabsAdmin/Associations';
import Formateurs from './TabsAdmin/Formateurs';
import Invitations from './TabsAdmin/Invitations';
import Domaine from '../../api/model/Domaine';

interface Utilisateur {
    id: number,
    email: string,
    nomUtilisateur: string,
    actif: boolean
}

export interface membreBureauNationalUserInfo extends MembreBureauNational, Utilisateur {
    loading: boolean
}

export interface associationUserInfo extends Association, Utilisateur {
    loading: boolean
}

export interface formateurUserInfo extends Formateur, Utilisateur {
    loading: boolean
    dateCreation: string,
    domaines: Domaine[]
}

export interface createUserToken {
    id: number,
    email: string,
    expirationDate: Date,
    role: string,
}

const INITIAL_BN : membreBureauNationalUserInfo[] = []
const INITIAL_ASSO : associationUserInfo[] = []
const INITIAL_FORM : formateurUserInfo[] = []

const Admin = () => {

    interface menuItem {
        value: string,
        label: string
    }

    const roles: menuItem[] = [
        {value: 'ROLE_FORMATEUR', label: 'Formateur'},
        {value: 'ROLE_ASSO', label: 'Association'},
        {value: 'ROLE_BN', label: 'Membre du Bureau National'}
    ]

    const [email, setMail] = useState('');
    const [isValid, setIsValid] = useState({email: true});
    const [selectRole, setSelectRole] = useState(roles[0].value);
    const [loadingInvite, setLoadingInvite] = useState(false)
    const [valueTab, setValueTab] = useState(0)
    const [membresBN, setMembresBN] = useState(INITIAL_BN)
    const [associations, setAssociations] = useState(INITIAL_ASSO)
    const [formateurs, setFormateurs] = useState(INITIAL_FORM)
    const [invitations, setInvitations] = useState(undefined)
    const [bnLoaded, setBNLoaded] = useState(false)
    const [assoLoaded, setAssoLoaded] = useState(false)
    const [formateursLoaded, setFormateursLoaded] = useState(false)

    const [refresh, setRefresh] = useState(true)

    // TODO: Replacer les infos dans l'ordre des priorités

    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        getAssociations();
        getInvitations();
        getFormateurs();
        getMembresBN();
    }, [])

    useEffect(() => {
        if(bnLoaded){
            setMembresBN(membresBN.map(
                (membre): membreBureauNationalUserInfo => {
                  membre.loading = false;
                  return membre;
                }
              ))
        }
    }, [bnLoaded])
    
    useEffect(() => {
        if(assoLoaded){
            setAssociations(associations.map(
                (asso): associationUserInfo => {
                  asso.loading = false;
                  return asso;
                }
              ))
        }
    }, [assoLoaded])

    useEffect(() => {
        if(formateursLoaded){
            setFormateurs(formateurs.map(
                (form): formateurUserInfo => {
                  form.loading = false;
                  return form;
                }
              ))
        }
    }, [formateursLoaded])


    const tabs = [
        'Formateurs',
        'Associations',
        'Membres bureau national',
        'Invitations en attente'
    ]

    const showTabs = () => {
        return tabs.map(tab => {
                return (
                    <Tab label={tab}/>
                )
            }
        )
    }

    const menuItemsRole = () => {
        return roles.map((role: menuItem) => {
                return (
                    <MenuItem value={role.value}>{role.label}</MenuItem>
                )
            }
        )
    }

    const handleChangeSelect = (event: SelectChangeEvent) => {
        setSelectRole(event.target.value)
    }

    const handleSubmit = async () => {
        try {
            setLoadingInvite(true)
            const response = await PostMailSingUp(axiosPrivate, email, selectRole)
            toast.success(response.data.message);
            getInvitations()
        } catch (err) {
            toast.error(err.response.data.message);
            setIsValid({email: false})
            setLoadingInvite(false);
        }
        setLoadingInvite(false);
    }

    const validate = (e) => {
        e.preventDefault();
        let validation = {email: true};
        let isValid = true;
        if (!email) {
            isValid = false;
            validation.email = false;
            toast.error("Reseignez l'adresse email")
        }
        if (isValid) {
            handleSubmit();
        }
        setIsValid(validation);
    }

    const getMembresBN = async () => {
        try {
            const response = await FetchMembresBureauNational(axiosPrivate)
            setMembresBN(response.data)
            setBNLoaded(true)
        } catch (err) {
            console.log(err)
            toast.error(err.response?.data?.message);
        }
    }

    const getAssociations = async () => {
        try {
            const response = await FetchAssociations(axiosPrivate)
            setAssociations(response.data)
            setAssoLoaded(true)
        } catch (err) {
            console.log(err)
            toast.error(err.response?.data?.message);
        }
    }

    const getFormateurs = async () => {
        try {
            const response = await FetchFormateurs(axiosPrivate)
            setFormateurs(response.data)
            setFormateursLoaded(true)
        } catch (err) {
            console.log(err)
            toast.error(err.response?.data?.message);
        }
    }

    const getInvitations = async () => {
        try {
            const response = await FetchInvitations(axiosPrivate)
            setInvitations(response.data)
        } catch (err) {
            console.log(err)
            toast.error(err.response?.data?.message);
        }
    }

    const boxStyle = {
        borderRadius: '.25rem',
        padding: '1.5rem',
        marginBottom: '1rem',
        boxShadow: '0 .5rem 1rem rgba(0,0,0,.15)',
        width: '75%',
        align: 'center',
        marginLeft: 'auto',
        marginRight: 'auto'
    }

    return (
        <>
            <Box style={boxStyle}>
                <Typography variant="h4" color="primary">Inviter des membres</Typography>
                <form>
                    <Grid mt={2} container rowSpacing={0} columnSpacing={2} minWidth="100%">
                        <Grid item xs={6}>
                            <TextField
                                error={!isValid.email}
                                fullWidth
                                required
                                label="Email"
                                id="email"
                                value={email}
                                onChange={event => setMail(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <Select
                                fullWidth
                                label="Rôle"
                                value={selectRole}
                                id="select-role"
                                onChange={handleChangeSelect}>
                                {menuItemsRole()}
                            </Select>
                        </Grid>
                        <Grid item xs={1}>
                            <LoadingButton
                                sx={{height:'100%'}}
                                fullWidth
                                onClick={validate}
                                endIcon={<SendIcon/>}
                                loading={loadingInvite}
                                loadingPosition="end"
                                variant="contained"
                            >
                                Inviter
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </form>
            </Box>
            <Box style={boxStyle}>
                <Typography variant="h4" color="primary">Gestion utilisateurs</Typography>
                <Tabs value={valueTab}
                      onChange={(event: React.SyntheticEvent, newValue: number) => setValueTab(newValue)}
                      centered>
                    {showTabs()}
                </Tabs>
                {
                    valueTab === 0 ? <Formateurs formateurs={formateurs} setFormateurs={setFormateurs} /> :
                        valueTab === 1 ? <Associations associations={associations} setAssociations={setAssociations}/> :
                            valueTab === 2 ?
                                <MembresBN membresBN={membresBN}/>
                                : valueTab === 3 ? <Invitations invitations={invitations} setInvitations={setInvitations} />
                                    : <></>
                }
            </Box>
        </>
    )
}

export default Admin;
