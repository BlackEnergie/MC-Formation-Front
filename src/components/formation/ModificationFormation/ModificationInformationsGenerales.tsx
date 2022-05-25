import React, {useState} from 'react';
import {Autocomplete, TextField, textFieldClasses} from "@mui/material";
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
import Domaine from "../../../api/model/Domaine";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Select from 'react-select';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import AddBoxIcon from "@mui/icons-material/AddBox";
import {
    Statut,
    statutToString,
    statutToStyle,
} from "../../../utils/StatutUtils";

const optionsStatut =[
    {value: 'DEMANDE', label:'Demande'},
    {value: 'A_ATTRIBUER', label:'À attribuer'},
    {value: 'A_VENIR', label:'À venir'},
    {value: 'PASSEE', label:'Passée'},
]

const ModificationInformationsGenerales = (props) => {
    const [liveness, setLiveness] = useState(0);
    let temporaireDonnee = props.formation;
    let tempFormateur= null;
    let listeFormateurs = props.formateurs.map((item, index) => {
        return {
            label: item.nom + " " + item.prenom,
            value: item,
            key: item.id,

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
            height: 55,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 12,
            paddingTop:0,
            paddingBottom:0,
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
            paddingTop:0,
            paddingBottom:0,
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
        height:65,
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
    const StyledTableRowInput = styled(TableRow)(({theme}) => ({
        backgroundColor:'rgba(211,211,211,0.04)',
        height:65,
    }));

    const handleChange = (s) => {
        let items = props.formation;
        switch (s) {
            case 'Statut' :
                if (typeof(temporaireDonnee.statut != 'undefined')) {
                    items.statut = temporaireDonnee.statut;
                }
                break;
            case "cadre" :
                if (typeof(temporaireDonnee.cadre != 'undefined')) {
                    items.cadre = temporaireDonnee.cadre;
                }
                break;
            case "date" :
                if (typeof(temporaireDonnee.date != 'undefined')){
                    let annee = temporaireDonnee.date.getFullYear();
                    let mois = temporaireDonnee.date.getMonth()+1;
                    mois = mois.toString().padStart(2,'0');
                    let jour = temporaireDonnee.date.getDate();
                    jour = jour.toString().padStart(2,'0');
                    items.date = annee + "-" +mois + "-" + jour;
                    setLiveness(liveness+1);
                }
                break;
        }
        props.majFormation(items);
    };
    const handleItemDelete = (i, s) => {

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
        setLiveness(liveness + 1);
    }
    const handleAjout = (s, v) => {
        let newFormation = props.formation;
        switch (s) {
            case 'Formateurs':
                const newformateur = {
                    id : v.value.id,
                    nom: v.value.nom,
                    prenom: v.value.prenom,
                }
                newFormation.formateurs.push(newformateur);
                break;
        }
        props.majFormation(newFormation);
        setLiveness(liveness + 1);
    }
    const AfficherDataInfoGenerales = () => {
        return (
            <>
                <StyledTableRow >
                    <StyledTableCellHead>Statut</StyledTableCellHead>
                    <StyledTableCell>
                        <Autocomplete
                            fullWidth={true}
                            size="small"
                            disablePortal
                            defaultValue={statutToString(props.formation.statut)}
                            options={optionsStatut}
                            onChange={(event, value) => {
                                temporaireDonnee.statut = value['value'];
                                handleChange("Statut")
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Type de formation"
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
                    <StyledTableCellHead>Cadre</StyledTableCellHead>
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
                    <StyledTableCellHead>Date</StyledTableCellHead>
                    <StyledTableCell>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                label="Date de la formation"
                                value={props.formation.date}
                                inputFormat="yyyy-MM-dd"
                                mask={"____-__-__"}
                                onChange={
                                    (newValue) => {
                                        temporaireDonnee.date = newValue;
                                        handleChange("date");
                                    }}
                                renderInput={(params) => <TextField size="small" {...params} />}
                            />
                        </LocalizationProvider>
                    </StyledTableCell>
                </StyledTableRow>
            </>
        )
    }

    const AfficherDataFormateur = props.formation.formateurs?.map(
        (info, i) => {
            return (
                <StyledTableRow key={info.id}>
                    <StyledTableCell>
                        {info.nom}
                    </StyledTableCell>
                    <StyledTableCell>
                        {info.prenom}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                        <Button onClick={() => handleItemDelete(i, "Formateur")}>
                            <DeleteIcon className="Icones"/>
                        </Button>
                    </StyledTableCell>
                </StyledTableRow>
            )
        }
    )

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
                <TableContainer component={Paper} sx={{maxHeight: 350, mt:1}}>
                    <Table sx={{minWidth: 100}} aria-label="customized table">
                        <TableBody>
                            <StyledTableRowInput >
                                <StyledTableCell>
                                    <Autocomplete
                                        fullWidth={true}
                                        size="small"
                                        disablePortal
                                        options={listeFormateurs}
                                        onChange={(event, value) => {
                                            tempFormateur = value;
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Nom Prénom du formateur"
                                                InputProps={{
                                                    ...params?.InputProps,
                                                    type: 'search',
                                                }}
                                            />
                                        )}
                                    />
                                </StyledTableCell>
                                <StyledTableCell width={40}>
                                    <Button onClick={() => handleAjout("Formateurs",tempFormateur)}>
                                        <AddBoxIcon className="Icones"/>
                                    </Button>
                                </StyledTableCell>
                            </StyledTableRowInput>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}

export default ModificationInformationsGenerales;
