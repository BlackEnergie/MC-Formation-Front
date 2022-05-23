import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material';
import {formateurUserInfo} from '../Admin';

const Formateurs = (props) => {

    const utilisateurs: formateurUserInfo[] = props.formateurs;

    return (
        <>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Nom Utilisateur</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Nom</TableCell>
                        <TableCell>Prénom</TableCell>
                        <TableCell>Date création</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        utilisateurs?.map((utilisateur: formateurUserInfo) => {
                            return (
                                <TableRow key={utilisateur.id}>
                                    <TableCell>{utilisateur.id}</TableCell>
                                    <TableCell>{utilisateur.nomUtilisateur}</TableCell>
                                    <TableCell>{utilisateur.email}</TableCell>
                                    <TableCell>{utilisateur.nom}</TableCell>
                                    <TableCell>{utilisateur.prenom}</TableCell>
                                    <TableCell>{utilisateur.dateCreation}</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </>
    )

}

export default Formateurs;
