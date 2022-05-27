import React, {useEffect, useState} from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material';
import {createUserToken} from '../Admin';
import {AccessTimeFilled, CircleNotifications, Delete} from '@mui/icons-material';
import {getTimeBetweenDates, TimeObject} from '../../../utils/DateUtils';
import {LoadingButton} from '@mui/lab';
import {PostCancelInvitation, PostNotifyInvitation} from '../../../serverInteraction/PostAdmin';
import useAxiosPrivate from '../../../auth/hooks/useAxiosPrivate';
import {toast} from 'react-hot-toast';

const RowDataInvitations = (props) => {
    const [loadingRelance, setLoadingRelance] = useState(false)
    const [loadingSupprimer, setLoadingSupprimer] = useState(false)
    const [liveness, setLiveness] = useState(0)

    const axiosPrivate = useAxiosPrivate()
    let userToken: createUserToken = props.userToken;

    useEffect(() => {
         userToken = props.userToken;
    }, [props.userToken])

    const getColorFromTime = (time: TimeObject) => {
        if (time.isPassed) return "inherit"
        if (time.hours > 16) return "success";
        else if (time.hours < 8) return "warning";
    }

    const getColoredClock = (time: TimeObject) => {
        if (time.isPassed) return <CircleNotifications color="disabled"/>
        if (time.hours > 16) return <AccessTimeFilled color="success"/>;
        else if (time.hours < 8) return <AccessTimeFilled color="warning"/>;
    }

    const getTimeObjectFromNow = (date: Date) => {
        return getTimeBetweenDates(date, new Date());
    }

    const afficherValidite = (expiration: Date) => {
        let timeObject = getTimeObjectFromNow(expiration);
        return (
            <>
                {
                    timeObject.isPassed ?
                       'Expiré depuis ' + Math.abs(timeObject.days) + ' jours et ' + Math.abs(timeObject.hours) + ' heures'
                    : timeObject.hours + ' heures, ' + timeObject.minutes + ' minutes'
                }
            </>
        )
    }

    const postRelance = async () => {
        try {
            setLoadingRelance(true)
            const response = await PostNotifyInvitation(axiosPrivate, userToken.id)
            setLoadingRelance(false)
            userToken.expirationDate = new Date(response.data.expiration)
            toast.success(response.data.message)
            setLiveness(liveness + 1)
        } catch (e) {
            toast.error(e.response.data?.message)
            setLoadingRelance(false)
        }
    }

    const postSupprimerInvitation = async () => {
        try {
            setLoadingSupprimer(true)
            const response = await PostCancelInvitation(axiosPrivate, userToken.id)
            if(response.data.code===200)
            setLoadingSupprimer(false)
            if (response.data?.code === 200) {
                toast.success(response.data.message)
                userToken.id=null;
                setLiveness(liveness + 1)
            }
        } catch (e) {
            toast.error(e.response.data?.message)
            setLoadingSupprimer(false)
        }
    }

    return (
        <>
        {!userToken.id 
            ?
            <></>
            :
            <TableRow key={userToken.id}>
                <TableCell align="center" >{userToken.email}</TableCell>
                <TableCell align="center" >{userToken.role}</TableCell>
                <TableCell align="center" >{afficherValidite(userToken.expirationDate)}</TableCell>
                <TableCell align="center" >
                    <LoadingButton
                        loading={loadingRelance}
                        color={getColorFromTime(getTimeObjectFromNow(userToken.expirationDate))}
                        variant="outlined"
                        title="Prolonger et notifier"
                        onClick={() => postRelance()}
                        endIcon={getColoredClock(getTimeObjectFromNow(userToken.expirationDate))}>
                        Relancer
                    </LoadingButton>
                    <LoadingButton
                        loading={loadingSupprimer}
                        color="error"
                        variant="outlined"
                        title="Supprimer définitivement l'invitation"
                        onClick={() => postSupprimerInvitation()}>
                        <Delete/>
                    </LoadingButton>
                </TableCell>
            </TableRow>
       }
    </>
    )
}

const Invitations = (props) => {

    const invitations: createUserToken[] = props.invitations;

    return (
        <>
            <Table sx={{minWidth: 650}}>
                <TableHead>
                    <TableRow>
                        <TableCell align="center" >Email</TableCell>
                        <TableCell align="center" >Role</TableCell>
                        <TableCell align="center" >Validité</TableCell>
                        <TableCell align="center" sx={{width: '100px'}}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        invitations?.map((userToken: createUserToken) => {
                            return (
                                <RowDataInvitations userToken={userToken}/>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </>
    )

}

export default Invitations;
