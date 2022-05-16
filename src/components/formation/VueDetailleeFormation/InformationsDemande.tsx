import React from 'react';
import {Grid, Skeleton} from '@mui/material';
import {styled} from '@mui/material/styles';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import {Statut} from '../../../utils/StatutUtils';

const InformationsDemande = (props) => {

    let formation = props.formation;

    const StyledTableCell = styled(TableCell)(({theme}) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            height: 55
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableCellHead = styled(TableCell)(({theme}) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
            fontWeight: 'bold',
        },
    }));

    const StyledTableRow = styled(TableRow)(({theme}) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const StyledTableHead = styled(TableHead)(({theme}) => ({
        '&:nth-of-type(odd)': {
            fontWeight: 'bold',
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const AfficherDataInfoGenerales = () => {
        return (
            <>
                {
                    !props.loading && formation.statut !== Statut.DEMANDE.toUpperCase() ?
                        <StyledTableRow>
                            <StyledTableCellHead>Sujet</StyledTableCellHead>
                            <StyledTableCell>
                                {
                                    props.loading ? <Skeleton sx={{width: 'auto'}}/> :
                                        formation.sujet
                                }
                            </StyledTableCell>
                        </StyledTableRow>
                        : <></>
                }
                <StyledTableRow>
                    <StyledTableCellHead>Détail</StyledTableCellHead>
                    <StyledTableCell>
                        {
                            props.loading ? <Skeleton sx={{width: 'auto'}}/> :
                                formation.detail
                        }
                    </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                    <StyledTableCellHead>Association demandeuse</StyledTableCellHead>
                    <StyledTableCell>
                        {
                            props.loading ? <Skeleton sx={{width: 'auto'}}/> :
                                formation.association.nomComplet
                        }
                    </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                    <StyledTableCellHead>Date de demande</StyledTableCellHead>
                    <StyledTableCell>
                        {
                            props.loading ? <Skeleton sx={{width: 'auto'}}/> :
                                formation.dateDemande
                        }
                    </StyledTableCell>
                </StyledTableRow>
            </>
        )
    }

    const AfficherAssociationsInteressees = () => {
        return !props.loading ?
            formation.associationsInteressees?.map(
                (info) => {
                    return (
                        <StyledTableRow key={info.id}>
                            <StyledTableCell>{info.nomComplet}</StyledTableCell>
                            <StyledTableCell>{info.ville}</StyledTableCell>
                        </StyledTableRow>
                    )
                }
            ) :
            <StyledTableRow>
                <StyledTableCell><Skeleton sx={{width: 'auto'}}/></StyledTableCell>
                <StyledTableCell><Skeleton sx={{width: 'auto'}}/></StyledTableCell>
            </StyledTableRow>
    }

    const AfficherDataDomaines = () => {
        return !props.loading ?
            formation.domaines.map(
                (info) => {
                    return (
                        <StyledTableRow key={info.code} title={info.description}>
                            <StyledTableCell>
                                {info.code}
                            </StyledTableCell>
                            <StyledTableCell>
                                {info.libelle}
                            </StyledTableCell>
                        </StyledTableRow>
                    )
                }
            ) :
            <StyledTableRow>
                <StyledTableCell>
                    <Skeleton sx={{width: 'auto'}}/>
                </StyledTableCell>
                <StyledTableCell>
                    <Skeleton sx={{width: 'auto'}}/>
                </StyledTableCell>
            </StyledTableRow>
            ;
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography
                        sx={{flex: '1 1 100%', p: 1}}
                        variant="h5"
                        color="primary"
                        id="tableTitle"
                        component="div">
                        Informations Générales
                    </Typography>
                    <TableContainer component={Paper} sx={{maxHeight: 350}}>
                        <Table stickyHeader sx={{minWidth: 100}} aria-label="customized table">
                            <StyledTableHead>
                                <StyledTableRow>
                                    <StyledTableCell sx={{width: 180}}></StyledTableCell>
                                    <StyledTableCell></StyledTableCell>
                                </StyledTableRow>
                            </StyledTableHead>
                            <TableBody>
                                {AfficherDataInfoGenerales()}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={6}>
                    <Typography
                        sx={{flex: '1 1 100%', p: 1}}
                        variant="h5"
                        color="primary"
                        id="tableTitle"
                        component="div">
                        Association(s) intéressée(s)
                    </Typography>
                    <TableContainer component={Paper} sx={{maxHeight: 350}}>
                        <Table stickyHeader sx={{minWidth: 100}} aria-label="customized table">
                            <StyledTableHead>
                                <StyledTableRow>
                                    <StyledTableCell sx={{width: 180}}>Nom</StyledTableCell>
                                    <StyledTableCell>Ville</StyledTableCell>
                                </StyledTableRow>
                            </StyledTableHead>
                            <TableBody>
                                {AfficherAssociationsInteressees()}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                {!props.loading && formation.statut === Statut.DEMANDE.toUpperCase() ?
                    <Grid item xs={6}>
                        <Typography
                            sx={{flex: '1 1 100%', p: 1}}
                            variant="h5"
                            color="primary"
                            id="tableTitle"
                            component="div">
                            Domaine(s)
                        </Typography>
                        <TableContainer component={Paper} sx={{maxHeight: 350}}>
                            <Table stickyHeader sx={{minWidth: 100}} aria-label="customized table">
                                <StyledTableHead>
                                    <StyledTableRow>
                                        <StyledTableCell sx={{width: 100}}>Code</StyledTableCell>
                                        <StyledTableCell>Nom</StyledTableCell>
                                    </StyledTableRow>
                                </StyledTableHead>
                                <TableBody>
                                    {AfficherDataDomaines()}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    : <></>
                }
            </Grid>
        </>
    )
}

export default InformationsDemande;
