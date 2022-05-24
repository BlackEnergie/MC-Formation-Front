import React, {useState} from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material';
import {createUserToken} from '../Admin';
import {AccessTimeFilled, CircleNotifications} from '@mui/icons-material';
import {getTimeBetweenDates} from '../../../utils/DateUtils';
import {LoadingButton} from '@mui/lab';

const Invitations = (props) => {

    const [relanceLoading, setRelanceLoading] = useState(false)
    const invitations: createUserToken[] = props.invitations;

    const getColoredClock = (hours: number) => {
        if (hours > 16) return <AccessTimeFilled color="success"/>;
        else if (hours > 8) return <AccessTimeFilled color="warning"/>;
        return <CircleNotifications color="error"/>
    }

    const getTimeObjectFromNow = (date: Date) => {
        return getTimeBetweenDates(date, new Date());
    }

    const afficherValidite = (expiration: Date) => {
        let timeObject = getTimeObjectFromNow(expiration);
        return (
            <>
                {timeObject.hours + ' heures, ' + timeObject.minutes + ' minutes '}
            </>
        )
    }

    return (
        <>
            <Table sx={{minWidth: 650}}>
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Validité</TableCell>
                        <TableCell sx={{width: '100px'}}>Action</TableCell>
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
                                    <TableCell>{afficherValidite(utilisateur.expirationDate)}</TableCell>
                                    <TableCell>
                                        <LoadingButton
                                            loading={relanceLoading}
                                            sx={{padding:0, minWidth:'24px', maxWidth:'24px'}}
                                            title="Prolonger et notifier">
                                            {getColoredClock(getTimeObjectFromNow(utilisateur.expirationDate).hours)}
                                        </LoadingButton>
                                    </TableCell>
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
