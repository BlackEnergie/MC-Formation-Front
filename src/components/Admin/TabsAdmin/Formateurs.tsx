import React, {useState} from 'react';
import {Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography} from '@mui/material';
import {formateurUserInfo} from '../Admin';
import Domaine from '../../../api/model/Domaine';
import {CancelOutlined, CheckCircleOutline, KeyboardArrowDown, KeyboardArrowUp} from '@mui/icons-material';
import {LoadingButton} from '@mui/lab';

const RowDataFormateurs = (props) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
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
                <TableCell>{utilisateur.id}</TableCell>
                <TableCell>{utilisateur.nomUtilisateur}</TableCell>
                <TableCell>{utilisateur.email}</TableCell>
                <TableCell>{utilisateur.nom}</TableCell>
                <TableCell>{utilisateur.prenom}</TableCell>
                <TableCell>{utilisateur.dateCreation}</TableCell>
                <TableCell>
                    <LoadingButton
                        title={utilisateur.actif ? "Désactiver le compte" : "Activer le compte"}
                        variant="outlined"
                        color={utilisateur.actif ? "success" : "error"}
                        loading={loading}
                        onClick={() => {
                            props.utilisateur.actif = !utilisateur.actif ;
                            setLiveness(liveness + 1)
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
            <TableRow>
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

const Formateurs = (props) => {

    const utilisateurs: formateurUserInfo[] = props.formateurs;

    return (
        <>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Id</TableCell>
                        <TableCell>Nom Utilisateur</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Nom</TableCell>
                        <TableCell>Prénom</TableCell>
                        <TableCell>Date création</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        utilisateurs?.map(
                            (utilisateur: formateurUserInfo) =>
                                <RowDataFormateurs utilisateur={utilisateur} m={1}/>
                        )
                    }
                </TableBody>
            </Table>
        </>
    )

}

export default Formateurs;
