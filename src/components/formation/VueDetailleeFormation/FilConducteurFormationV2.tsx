import React from 'react';
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

const FilConducteurFormation = (formation) =>{
    
    let Donnee = formation.formation;
    const AfficherDataFilConducteur = Donnee.data?.map(
        (info) => {
            return (
                <StyledTableRow key={info.id}>
                    <StyledTableCell>{info.id}</StyledTableCell>
                    <StyledTableCell>{info.plan}</StyledTableCell>
                    <StyledTableCell>{info.timing}</StyledTableCell>
                    <StyledTableCell>{info.contenu}</StyledTableCell>
                    <StyledTableCell>{info.methodologie}</StyledTableCell>
                </StyledTableRow>
            )
        }
    )

    const StyledTableCell = styled(TableCell)(({theme}) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
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
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    return(

            <Grid>
                <TableContainer component={Paper} sx={{maxHeight: 250}}>
                    <Table sx={{minWidth: 100}} aria-label="customized table">
                        <StyledTableHead>
                            <StyledTableRow>
                                <StyledTableCell>#</StyledTableCell>
                                <StyledTableCell>Plan/Partie</StyledTableCell>
                                <StyledTableCell>Timing</StyledTableCell>
                                <StyledTableCell>Contenu</StyledTableCell>
                                <StyledTableCell>Méthodologie pédagogique</StyledTableCell>
                            </StyledTableRow>
                        </StyledTableHead>
                        <TableBody>
                            {AfficherDataFilConducteur}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
    )
}

export default FilConducteurFormation;