import React, {useEffect, useState} from "react";
import useAxiosPrivate from '../../auth/hooks/useAxiosPrivate';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {Container, Grid, Skeleton} from "@mui/material";
import {FetchInformationUserById} from '../../serverInteraction/FetchUtilisateur';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Nav from 'react-bootstrap/Nav';
import {Link, useNavigate} from 'react-router-dom';
import UtilisateurInfo from "../../api/model/UtilisateurInfo";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import {styled} from "@mui/material/styles";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import {statutToString, statutToStyle} from "../../utils/StatutUtils";


export function AfficherDataDomaines(domaines: []) {
    let listedomaines = "";
    if (domaines !== undefined) {
        domaines.map(
            (domaine) => {
                listedomaines += domaine?.['libelle'] + ", ";
            }
        )
        listedomaines = listedomaines.replace(/,\s*$/, "");
        return listedomaines;
    }
}


function AffichageMonCompte() {

    const [information, setInformation] = useState(null);
    const initialUtilisateur: UtilisateurInfo = null;
    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        getInfoUser();
    }, [])
    const getInfoUser = async () => {
        try {
            const response = await FetchInformationUserById(axiosPrivate)
            setInformation(response?.data);


        } catch (err) {
            console.error(err);
        }
    }
    const data = {
        nomutilisateur: information?.nomUtilisateur,
        nom: information?.formateur?.nom,
        prenom: information?.formateur?.prenom,
        email: information?.email,
        poste: information?.membreBureauNational?.poste,
        ville: information?.association?.ville,
        college: information?.association?.college,
        acronyme: information?.association?.acronyme,
        nomComplet: information?.association?.nomComplet,
        domaines: information?.formateur?.domaines
    }


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

    return (

        <>
            <Container>
              <Grid id =""  style={{
                              boxShadow:"0 .5rem 1rem rgba(0,0,0,.15)"
                               }}
                   >
                    <Box textAlign={'center'}>
                        <Typography variant="h4" color="primary">Mon Compte</Typography>
                            
                            <Box textAlign={'center'} sx={{minWidth: 100,maxWidth:400,margin: 'auto'}}>
                                <TableContainer component={Paper} sx={{maxHeight: 350, marginTop:2}}>
                                    <Table stickyHeader aria-label="customized table">

                                        <TableBody>
                                            <StyledTableRow>
                                                <StyledTableCellHead>Nom Utilisateur</StyledTableCellHead>
                                                <StyledTableCell
                                                    hidden={data.nomutilisateur == undefined ? true : false}>
                                                    {data.nomutilisateur}
                                                </StyledTableCell>
                                            </StyledTableRow>
                                            {data.acronyme == undefined ? null :
                                                <StyledTableRow>
                                                    <StyledTableCellHead>Acronyme</StyledTableCellHead>
                                                    <StyledTableCell>
                                                        {data.acronyme}
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            }
                                            {data.nomComplet == undefined ? null :
                                                <StyledTableRow>
                                                    <StyledTableCellHead>Nom Complet</StyledTableCellHead>
                                                    <StyledTableCell>
                                                        {data.nomComplet}
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            }
                                            {data.nom == undefined ? null :
                                                <StyledTableRow>
                                                    <StyledTableCellHead>Nom</StyledTableCellHead>
                                                    <StyledTableCell>
                                                        {data.nom}
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            }
                                            {data.prenom == undefined ? null :
                                                <StyledTableRow>
                                                    <StyledTableCellHead>Prénom</StyledTableCellHead>
                                                    <StyledTableCell>
                                                        {data.prenom}
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            }
                                            {data.domaines == undefined ? null :
                                                <StyledTableRow>
                                                    <StyledTableCellHead>Domaine(s)</StyledTableCellHead>
                                                    <StyledTableCell>
                                                        {AfficherDataDomaines(data.domaines)}
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            }
                                            {data.poste == undefined ? null :
                                                <StyledTableRow>
                                                    <StyledTableCellHead>Poste</StyledTableCellHead>
                                                    <StyledTableCell>
                                                        {data.poste}
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            }
                                            {data.ville == undefined ? null :
                                                <StyledTableRow>
                                                    <StyledTableCellHead>Ville</StyledTableCellHead>
                                                    <StyledTableCell>
                                                        {data.ville}
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            }
                                            {data.college == undefined ? null :
                                                <StyledTableRow>
                                                    <StyledTableCellHead>Collège</StyledTableCellHead>
                                                    <StyledTableCell>
                                                        {data.college}
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            }
                                            <StyledTableRow hidden={data.email == undefined ? true : false}>
                                                <StyledTableCellHead>Email</StyledTableCellHead>
                                                <StyledTableCell>
                                                    {data.email}
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                </Box>
                                <Box textAlign='center'>
                                   <Link to="/compte/modification/motdepasse" style={{textDecoration:'none'}}>
                                        <Button
                                            variant="contained"
                                            style={{
                                                marginTop: 15,
                                                marginBottom:15,
                                                marginRight:20
                                                }}>
                                           Changer de mot de passe
                                       </Button>
                                    </Link>
                                    <Link to="/compte/modification" style={{textDecoration:'none'}} >
                                        <Button
                                            variant="contained"
                                            style={{
                                                marginTop: 15,
                                                marginBottom:15
                                            }}>
                                            Modifier
                                        </Button>
                                    </Link>
                                </Box>
                            </Box>
                        </Grid></Container>
             

        </>


    )
}

export default AffichageMonCompte;
