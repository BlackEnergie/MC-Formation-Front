import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material';
import {membreBureauNationalUserInfo} from '../Admin';

const MembresBN = (props) => {

    const utilisateurs: membreBureauNationalUserInfo[] = props.membresBN;

    return (
        <>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Nom Utilisateur</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Poste</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        utilisateurs?.map((utilisateur: membreBureauNationalUserInfo) => {
                            return (
                                <TableRow key={utilisateur.id}>
                                    <TableCell>{utilisateur.id}</TableCell>
                                    <TableCell>{utilisateur.nomUtilisateur}</TableCell>
                                    <TableCell>{utilisateur.email}</TableCell>
                                    <TableCell>{utilisateur.poste}</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </>
    )

}

export default MembresBN;
