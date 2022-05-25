import React, {useState} from 'react';
import {Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography} from '@mui/material';
import {formateurUserInfo} from '../Admin';
import Domaine from '../../../api/model/Domaine';
import {CancelOutlined, CheckCircleOutline, KeyboardArrowDown, KeyboardArrowUp} from '@mui/icons-material';
import {LoadingButton} from '@mui/lab';

interface Props {
    formateurs: formateurUserInfo[];
    isActifChange: (id: number) => boolean;
  }

const RowDataFormateurs = (props) => {
    const [open, setOpen] = useState(false);
    const [liveness, setLiveness] = useState(0);
    const utilisateur = props.utilisateur;
    return (
        <>
            <TableRow key={utilisateur.id}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUp/> : <KeyboardArrowDown/>}
                    </IconButton>
                </TableCell>
                <TableCell align="center">{utilisateur.id}</TableCell>
                <TableCell align="center">{utilisateur.nom}</TableCell>
                <TableCell align="center">{utilisateur.prenom}</TableCell>
                <TableCell align="center">{utilisateur.nomUtilisateur}</TableCell>
                <TableCell align="center">{utilisateur.email}</TableCell>
                <TableCell align="center">{utilisateur.dateCreation}</TableCell>
                <TableCell align="center">
                    <LoadingButton
                        title={utilisateur.actif ? "Désactiver le compte" : "Activer le compte"}
                        variant="outlined"
                        color={utilisateur.actif ? "success" : "error"}
                        loading={utilisateur.loading}
                        onClick={() => {
                            utilisateur.loading = !utilisateur.loading
                          props.utilisateur.actif = props.isActifChange(utilisateur.id) ? utilisateur.actif : !utilisateur.actif;
                          setLiveness(liveness + 1);
                          utilisateur.loading = !utilisateur.loading
                        }}
                        endIcon={
                            utilisateur.actif ?
                                <CheckCircleOutline color="success"/>
                                : <CancelOutlined color="error"/>
                        }
                    >
                        {utilisateur.actif ? "Activé" : "Désactivé"}
                    </LoadingButton>
                </TableCell>
            </TableRow>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Typography variant="h6" gutterBottom component="div">
                            Domaines
                        </Typography>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Code</TableCell>
                                    <TableCell>Libelle</TableCell>
                                    <TableCell>Description</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    utilisateur?.domaines.length > 0 ?
                                        utilisateur.domaines.map((domaine: Domaine) => {
                                            return (
                                                <TableRow key={domaine.code + (utilisateur.id * 100)}>
                                                    <TableCell>{domaine.code}</TableCell>
                                                    <TableCell>{domaine.libelle}</TableCell>
                                                    <TableCell>{domaine.description}</TableCell>
                                                </TableRow>
                                            )
                                        }) : <TableRow key={utilisateur.id * 100}>
                                            <TableCell>Pas de domaine associé</TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                }
                            </TableBody>
                        </Table>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}

const Formateurs = (props: Props) => {

    const utilisateurs: formateurUserInfo[] = props.formateurs;

    return (
        <>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell align="center">Id</TableCell>
                        <TableCell align="center">Nom</TableCell>
                        <TableCell align="center">Prénom</TableCell>
                        <TableCell align="center">Nom Utilisateur</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Date création</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        utilisateurs?.map(
                            (utilisateur: formateurUserInfo) =>
                                <RowDataFormateurs utilisateur={utilisateur} m={1} isActifChange={props.isActifChange}/>
                        )
                    }
                </TableBody>
            </Table>
        </>
    )

}

export default Formateurs;
