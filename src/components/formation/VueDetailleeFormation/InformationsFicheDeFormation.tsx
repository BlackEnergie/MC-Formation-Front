import React, {} from 'react';
import Grid from "@mui/material/Grid";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import {styled} from "@mui/material/styles";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";

const InformationsFicheDeFormation = (props) => {

    let formation = props.formation;
    const AfficherFormationDetails = () => {
        return (
            <>
            <StyledTableRow>
                <StyledTableCellHead>Type</StyledTableCellHead>
                <StyledTableCell>{formation.type}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
                <StyledTableCellHead>Audience</StyledTableCellHead>
                <StyledTableCell>{formation.audience}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
                <StyledTableCellHead>Durée</StyledTableCellHead>
                <StyledTableCell>{formation.duree}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
                <StyledTableCellHead>Prérequis</StyledTableCellHead>
                <StyledTableCell>{formation.prerequis}</StyledTableCell>
            </StyledTableRow>
            </>
        )
    }

    const AfficherBesoinsMaterielsFormation = () => formation.materiels?.map(
        (info) => {
            return (
                <StyledTableRow>
                    <StyledTableCell>{info}</StyledTableCell>
                </StyledTableRow>
            )
        }
    )
    const AfficherObjetsPedagogiques = () => formation.objectifs?.map(
        (info) => {
            return (
                <StyledTableRow>
                    <StyledTableCell>{info}</StyledTableCell>
                </StyledTableRow>
            )
        }
    )
    const AfficherDataDomaine = () => formation.domaines?.map(
        (info) => {
            return (
                <StyledTableRow key={info.code} title={info.description}>
                    <StyledTableCell>n°{info.code}</StyledTableCell>
                    <StyledTableCell>{info.libelle}</StyledTableCell>
                </StyledTableRow>
            )
        }
    )

    const StyledTableCell = styled(TableCell)(({theme}) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            height:55
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
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
            fontWeight: "bold",
            paddingLeft: 50,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const StyledTableCellHead = styled(TableCell)(({theme}) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
            fontWeight:"bold",
        },
    }));

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Typography
                    sx={{ flex: '1 1 100%', p:1 }}
                    variant="h5"
                    color="primary"
                    id="tableTitle"
                    component="div"> Informations
                </Typography>
                <TableContainer component={Paper}   sx={{maxHeight: 350}}>
                    <Table stickyHeader sx={{minWidth: 100}} aria-label="customized table">
                        <StyledTableHead>
                            <StyledTableRow>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                            </StyledTableRow>
                        </StyledTableHead>
                        <TableBody>
                            {AfficherFormationDetails()}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={6}>
                <Typography
                    sx={{ flex: '1 1 100%', p:1}}
                    variant="h5"
                    color="primary"
                    id="tableTitle"
                    component="div">Objectif(s) Pédagogique(s)
                </Typography>
                <TableContainer component={Paper}  sx={{maxHeight: 350}}>
                    <Table stickyHeader aria-label="customized table">
                        <StyledTableHead>
                            <StyledTableRow>
                                <StyledTableCell></StyledTableCell>
                            </StyledTableRow>
                        </StyledTableHead>
                        <TableBody>
                            {AfficherObjetsPedagogiques()}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={6}>
                <Typography
                    sx={{ flex: '1 1 100%' , p:1}}
                    variant="h5"
                    color="primary"
                    id="tableTitle"
                    component="div">Domaine(s)</Typography>
                <TableContainer component={Paper} sx={{maxHeight: 350}}>
                    <Table stickyHeader sx={{minWidth: 100}} aria-label="customized table">
                        <StyledTableHead>
                            <StyledTableRow>
                                <StyledTableCell>Code</StyledTableCell>
                                <StyledTableCell>Nom</StyledTableCell>
                            </StyledTableRow>
                        </StyledTableHead>
                        <TableBody>
                            {AfficherDataDomaine()}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={6}>
                <Typography
                    sx={{ flex: '1 1 100%', p:1 }}
                    variant="h5"
                    color="primary"
                    id="tableTitle"
                    component="div">Besoin(s) matériel(s)</Typography>
                <TableContainer component={Paper}   sx={{maxHeight: 350}}>
                    <Table stickyHeader sx={{minWidth: 100}} aria-label="customized table">
                        <StyledTableHead>
                            <StyledTableRow>
                                <StyledTableCell></StyledTableCell>
                            </StyledTableRow>
                        </StyledTableHead>
                        <TableBody>
                            {AfficherBesoinsMaterielsFormation()}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}
export default InformationsFicheDeFormation;
