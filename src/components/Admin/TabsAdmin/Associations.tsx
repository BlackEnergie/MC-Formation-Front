import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material';
import {associationUserInfo} from '../Admin';

const Associations = (props) => {

    const utilisateurs: associationUserInfo[] = props.associations;

    return (
        <>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Nom Utilisateur</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>College</TableCell>
                        <TableCell>Acronyme</TableCell>
                        <TableCell>Nom Complet</TableCell>
                        <TableCell>Ville</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        utilisateurs?.map((utilisateur: associationUserInfo) => {
                            return (
                                <TableRow key={utilisateur.id}>
                                    <TableCell>{utilisateur.id}</TableCell>
                                    <TableCell>{utilisateur.nomUtilisateur}</TableCell>
                                    <TableCell>{utilisateur.email}</TableCell>
                                    <TableCell>{utilisateur.college}</TableCell>
                                    <TableCell>{utilisateur.acronyme}</TableCell>
                                    <TableCell>{utilisateur.nomComplet}</TableCell>
                                    <TableCell>{utilisateur.ville}</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </>
    )

}

export default Associations;
