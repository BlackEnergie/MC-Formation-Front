import React, {useEffect, useState} from "react";
import useAxiosPrivate from '../../auth/hooks/useAxiosPrivate';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {Grid, Skeleton} from "@mui/material";
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
            <div className="container-fluid">
                {/* Conteneur Info Domaines */}
                <div className="container shadow p-4 mb-3 bg-white rounded">
                    <div className="row">
                        <div className="row justify-content-md-center mt-1">
                            <div className="col col-lg-5">
                                <h3 className="color-mc">
                                    Mes informations
                                </h3>
                                <hr/>
                            </div>
                        </div>
                        <Grid container spacing={3}>
                            <Grid item xs>
                            </Grid>
                            <Grid item xs={4} style={{backgroundColor: "white"}}>

                                <TableContainer component={Paper} sx={{maxHeight: 350}}>
                                    <Table stickyHeader sx={{minWidth: 100}} aria-label="customized table">

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
                                <Nav.Link>
                                    <Link to="/modificationMonCompte">
                                        <Box textAlign='center'>
                                            <Button
                                                variant="contained"
                                                size="medium"
                                                style={{
                                                    marginTop: 15,
                                                }}>
                                                Modifier
                                            </Button>
                                        </Box>
                                    </Link>
                                </Nav.Link>
                            </Grid>
                            <Grid item xs>
                            </Grid>
                        </Grid></div>
                </div>
            </div>

        </>


    )
}

export default AffichageMonCompte;
