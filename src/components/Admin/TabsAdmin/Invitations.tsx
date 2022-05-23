import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material';
import {createUserToken} from '../Admin';

const Invitations = (props) => {

    const invitations: createUserToken[] = props.invitations;

    const getTimeBetweenDates = (expirationDate: Date) => {
        const now = new Date();
        const msBetweenDates = new Date(expirationDate.toString()).getTime() - now.getTime();
        let seconds = Math.floor(msBetweenDates / 1000);
        let minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);

        seconds = seconds % 60;
        minutes = minutes % 60;

        return (hours + " heures, " + minutes + " minutes");
    }

    return (
        <>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Validité</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        invitations?.map((utilisateur: createUserToken) => {
                            return (
                                <TableRow key={utilisateur.id}>
                                    <TableCell>{utilisateur.id}</TableCell>
                                    <TableCell>{utilisateur.email}</TableCell>
                                    <TableCell>{utilisateur.role}</TableCell>
                                    <TableCell>{getTimeBetweenDates(utilisateur.expirationDate)}</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </>
    )

}

export default Invitations;
