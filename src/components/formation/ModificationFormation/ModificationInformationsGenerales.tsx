import React, {useState} from 'react';
import {Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField, textFieldClasses} from "@mui/material";
import {styled} from "@mui/material/styles";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Partie from "../../../api/model/Partie";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {animatedScrollTo} from "react-select/dist/declarations/src/utils";
import Domaine from "../../../api/model/Domaine";
import Formation from "../../../api/model/Formation";
import DeleteIcon from "@mui/icons-material/Delete";
import Association from "../../../api/model/Association";
import {formation} from "../../Accueil/ComposantAccueil/AccueilAffichage";
import {Statut, statutToString} from "../../../utils/StatutUtils";

const ModificationInformationsGenerales = (props) => {

    const [liveness, setLiveness] = useState(0);

    let stat = [Statut.DEMANDE, Statut.A_ATTRIBUER, Statut.A_VENIR, Statut.PASSEE];
    console.log(stat);


    let valueDomaine ;
   let temporaireDonnee = props.formation;

   let libelleDomaine = props.domaine.map( (item, index) => {

       return {
           label : item.libelle,
           value : item,
           key: item.code,

       }
    });




    const StyledTextField = styled(TextField)(({theme}) => ({
        [`&.${textFieldClasses}`]: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            fontSize: 20,
        },
    }));

    const StyledTableCell = styled(TableCell)(({theme}) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            height: 55
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
            verticalAlign: 'bottom',

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



    const handleChange = (s) => {
        let items = props.formation;
        switch (s) {
            case 'Statut' :
                items.statut = temporaireDonnee.statut;
                break;
            case "cadre" :
                items.cadre = temporaireDonnee.cadre;
                break;
            case "type" :
                items.type = temporaireDonnee.type;
                break;
            case "date" :
                items.date = temporaireDonnee.date;
                break;
        }
        props.majFormation(items);
        console.log(props.formation)
    };


    const handleItemDelete = (i,s) => {

        let newFormation = props.formation;
        switch (s) {
            case 'Domaine' :
                newFormation.domaines = props.formation.domaines.filter((item, index) => index !== i);
                break;
            case 'Formateur':
                newFormation.formateurs = props.formation.formateurs.filter((item, index) => index !== i);
                break;
            case 'Asso':
                newFormation.association = props.formation.association.filter((item, index) => index !== i);
                break;
        }
        props.majFormation(newFormation);
        setLiveness(liveness+1);
        console.log(props.formation)
    }


    const handleAjout = (s, v) => {
        let newFormation = props.formation;
        switch (s) {
            case 'Domaine' :
                const newdomaine = {
                    id: getMax(props.formation.domaines),
                    code: v.key,
                    libelle: v.value.libelle,
                    description: v.value.description,
                }
                newFormation.domaines.push(newdomaine);
                break;
            case 'Formateurs':
                const newformateur = {
                    id: getMax(props.formation.domaines),
                    nom: temporaireDonnee.formateur.nom,
                    prenom: temporaireDonnee.formateur.prenom,
                }
                newFormation.formateur.push(newformateur);
                break;
            case 'Asso':
                const newassociation = {
                    nomComplet: temporaireDonnee.associationsInteressees.association.nomComplet,
                    ville: temporaireDonnee.associationsInteressees.association.ville,
                }
                newFormation.associationsInteressees.push(newassociation);

                break;
        }
        props.majFormation(newFormation);
        setLiveness(liveness+1);
        console.log(props.formation)

    }


    function getMax(list) {
        let cpt = 1;
        list.forEach(val => {
            if (val.id > cpt) {
                cpt = val.id
            }
        })
        cpt++;
        return cpt;
    }

    function isFormateurVide() {

        if(!props.formation.formateur){
            return true
        }else {
            return false
        }
    }

    const AfficherDataInfoGenerales = () => {
        return (
            <>
            <StyledTableRow>
                <StyledTableCell>Statut</StyledTableCell>
                <StyledTableCell>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options = {stat}
                        onChange={(event, value) => {
                            temporaireDonnee.statut = value;
                            handleChange("statut")
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Domaine"
                                InputProps={{
                                    ...params?.InputProps,
                                    type: 'search',
                                }}
                            />
                        )}
                    />
                </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
                <StyledTableCell>Cadre</StyledTableCell>
                <StyledTableCell>
                    <StyledTextField
                        fullWidth={true}
                        defaultValue={props.formation.cadre}
                        variant="standard"
                        inputProps={{style: {fontSize: 12}}}
                        size="small"
                        multiline={true}
                        onChange={
                            (event) => {
                                temporaireDonnee.cadre = event.target.value;
                                handleChange("cadre");
                            }
                        }>
                    </StyledTextField>
                </StyledTableCell>
            </StyledTableRow>
        <StyledTableRow>
            <StyledTableCell>Type</StyledTableCell>
            <StyledTableCell>
                    <StyledTextField
                        fullWidth={true}
                        defaultValue={props.formation.type}
                        variant="standard"
                        inputProps={{style: {fontSize: 12}}}
                        size="small"
                        multiline={true}
                        onChange={
                            (event) => {
                                temporaireDonnee.type = event.target.value;
                                console.log(temporaireDonnee.type)
                                handleChange("type");
                            }
                        }>
                    </StyledTextField>
                </StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>
                    <StyledTextField
                        fullWidth={true}
                        defaultValue={props.formation.date}
                        variant="standard"
                        inputProps={{style: {fontSize: 12}}}
                        size="small"
                        multiline={true}
                        onChange={
                            (event) => {
                                temporaireDonnee.date = event.target.value;
                                handleChange("date")
                            }}>
                    </StyledTextField>
                </StyledTableCell>
            </StyledTableRow>
            </>
        )
    }


    const AfficherDataDomaine = () => {
        return props.formation.domaines?.map(
            (info, i) => {
                return (
                    <StyledTableRow key={info.code} title={info.description}>
                        <StyledTableCell>
                            {info.code}
                        </StyledTableCell>
                        <StyledTableCell>
                            {info.libelle}
                        </StyledTableCell>
                        <TableCell
                            align="center">
                            <a onClick={() => handleItemDelete(i,"Domaine")}>
                                <DeleteIcon className="Icones"/>
                            </a>
                        </TableCell>
                    </StyledTableRow>
                )
            }
        )
    }


    const AfficherDataFormateur = props.formation.formateurs?.map(
            (info, i) => {
                console.log(info)
                return (
                    <StyledTableRow key={info.id}>
                        <StyledTableCell>
                            {info.nom}
                        </StyledTableCell>
                        <StyledTableCell>
                            {info.prenom}
                        </StyledTableCell>
                        <TableCell
                            align="center">
                            <a onClick={() => handleItemDelete(i, "Formateur")}>
                                <DeleteIcon className="Icones"/>
                            </a>
                        </TableCell>
                    </StyledTableRow>
                )
            }
    )

    /*
    const AfficherAssociationsInteressees = () => {

        return props.formation.associationciationsInteressees?.map(
            (info, i) => {
                return (
                    <StyledTableRow key={info.id}>
                        <StyledTableCell>{info.nomComplet}</StyledTableCell>
                        <StyledTableCell>{info.ville}</StyledTableCell>
                        <TableCell
                            align="center">
                            <a onClick={() => handleItemDelete(i, "Asso")}>
                                <DeleteIcon className="Icones"/>
                            </a>
                        </TableCell>
                    </StyledTableRow>
                )
            }
        )
    }
*/

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Typography
                    sx={{flex: '1 1 100%', p: 1}}
                    variant="h5"
                    color="primary"
                    id="tableTitle"
                    component="div"> Informations Générales
                </Typography>
                <TableContainer component={Paper} sx={{maxHeight: 350}}>
                    <Table stickyHeader sx={{minWidth: 100}} aria-label="customized table">
                        <StyledTableHead>
                            <StyledTableRow>
                                <StyledTableCell sx={{width: 100}}></StyledTableCell>
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
                    component="div">Domaine(s)
                </Typography>
                <TableContainer component={Paper} sx={{maxHeight: 350}}>
                    <Table stickyHeader aria-label="customized table">
                        <StyledTableHead>
                            <StyledTableRow>
                                <StyledTableCell sx={{width: 100}}>Code</StyledTableCell>
                                <StyledTableCell>Nom</StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                            </StyledTableRow>
                        </StyledTableHead>
                        <TableBody>
                            {AfficherDataDomaine()}
                            <StyledTableRow key={10000}>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options = {libelleDomaine}
                                        onChange={(event, value) => {
                                             valueDomaine = value;
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Domaine"
                                                InputProps={{
                                                    ...params?.InputProps,
                                                    type: 'search',
                                                }}
                                            />
                                        )}
                                    />
                                </StyledTableCell>
                                <TableCell
                                    align="center">
                                    <a onClick={() => handleAjout("Domaine", valueDomaine)}>
                                        <AddBoxIcon className="Icones"/>
                                    </a>
                                </TableCell>
                            </StyledTableRow>
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
                    component="div">Formateur(s)</Typography>
                <TableContainer component={Paper} sx={{maxHeight: 350}}>
                    <Table sx={{minWidth: 100}} aria-label="customized table">
                        <StyledTableHead>
                            <StyledTableRow>
                                <StyledTableCell>Nom</StyledTableCell>
                                <StyledTableCell>Prenom</StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                            </StyledTableRow>
                        </StyledTableHead>
                        <TableBody>
                            {AfficherDataFormateur}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            { /*
            <Grid item xs={6}>
                <Typography
                    sx={{flex: '1 1 100%', p: 1}}
                    variant="h5"
                    id="tableTitle"
                    color="primary"
                    component="div">Association(s) intéréssée(s)</Typography>
                <TableContainer component={Paper} sx={{maxHeight: 350}}>
                    <Table stickyHeader sx={{minWidth: 100}} aria-label="customized table">
                        <StyledTableHead>
                            <StyledTableRow>
                                <StyledTableCell>Nom</StyledTableCell>
                                <StyledTableCell>Ville</StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                            </StyledTableRow>
                        </StyledTableHead>
                        <TableBody>
                            {AfficherAssociationsInteressees()}
                            <StyledTableRow key={10000}>
                                <StyledTableCell>
                                    <StyledTextField
                                        fullWidth={true}
                                        variant="standard"
                                        inputProps={{style: {fontSize: 12}}}
                                        size="small"
                                        multiline={true}
                                        onChange={
                                            (event, i=0) => {
                                                temporaireDonnee.associationsInteressees.association[i].nomComplet = event.target.value;
                                            }
                                        }
                                        onKeyPress={e => e.key === 'Enter' && handleAjout('Asso')}
                                    >
                                    </StyledTextField>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <TextField
                                        fullWidth={true}
                                        variant="standard"
                                        inputProps={{style: {fontSize: 12}}}
                                        size="small"
                                        multiline={true}
                                        onChange={
                                            (event, i=0) => {
                                                temporaireDonnee.associationsInteressees.association[i].ville = event.target.value;
                                            }
                                        }
                                        onKeyPress={e => e.key === 'Enter' && handleAjout('Asso')}
                                    >
                                    </TextField>
                                </StyledTableCell>
                                <TableCell
                                    align="center">
                                    <a onClick={() => handleAjout('Asso')}>
                                        <AddBoxIcon className="Icones"/>
                                    </a>
                                </TableCell>
                                </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            */
            }
        </Grid>
    )
}


export default ModificationInformationsGenerales;