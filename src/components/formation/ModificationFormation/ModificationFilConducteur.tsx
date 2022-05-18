import React, {useState} from 'react';
import Grid from '@mui/material/Grid';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import {styled} from '@mui/material/styles';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Partie from '../../../api/model/Partie';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import {TextField, textFieldClasses} from '@mui/material';

const ModificationFilConducteur = (props) => {

    const [liveness, setLiveness] = useState(0);
    const INITIAL_PARTIE: Partie = {
        id: 0,
        plan: "",
        timing: "",
        contenu: "",
        methodologie: "",
    }
    let temporairePartie = INITIAL_PARTIE;

    const handleChange = (i, s) => {
        let items = props.formation.parties;
        switch (s) {
            case 'plan' :
                items[i].plan = temporairePartie.plan;
                temporairePartie.plan = "";
                break;
            case "timing" :
                items[i].timing = temporairePartie.timing;
                temporairePartie.timing = "";
                break;
            case "contenu" :
                items[i].contenu = temporairePartie.contenu;
                temporairePartie.contenu = "";
                break;
            case "methodologie" :
                items[i].methodologie = temporairePartie.methodologie;
                temporairePartie.methodologie = "";
                break;
        }
        let newFormation = props.formation;
        newFormation.parties = items;
        props.majFormation(newFormation);
    };
    const handleItemDeletedPartie = (i) => {
        let newFormation = props.formation;
        newFormation.parties = props.formation.parties.filter((item, index) => index !== i);
        props.majFormation(newFormation);
        setLiveness(liveness+1);
    }
    const handleAjoutPartie = () => {
        let newFormation = props.formation;
        const newPartie: Partie = {
            id: getMax(props.formation.parties),
            plan: temporairePartie.plan,
            timing: temporairePartie.timing,
            contenu: temporairePartie.contenu,
            methodologie: temporairePartie.methodologie
        }
        newFormation.parties.push(newPartie);
        props.majFormation(newFormation);
        setLiveness(liveness+1);
    }

    const AfficherDataFilConducteur = () => props.formation.parties?.map(
        (partie, i) => {
            return (
                <StyledTableRow key={partie.id}>
                    <StyledTableCell>
                        <StyledTextField
                            fullWidth={true}
                            defaultValue={partie.plan}
                            variant="standard"
                            inputProps={{style: {fontSize: 12}}}
                            size="small"
                            multiline={true}
                            onChange={
                                (event) => {
                                    temporairePartie.plan = event.target.value;
                                    handleChange(i, "plan");
                                }
                            }
                        >
                        </StyledTextField>
                    </StyledTableCell>
                    <StyledTableCell>
                        <StyledTextField
                            fullWidth={true}
                            defaultValue={partie.timing}
                            variant="standard"
                            inputProps={{style: {fontSize: 12}}}
                            size="small"
                            multiline={true}
                            onChange={
                                (event) => {
                                    temporairePartie.timing = event.target.value;
                                    handleChange(i, "timing");
                                }
                            }>
                        </StyledTextField>
                    </StyledTableCell>
                    <StyledTableCell>
                        <StyledTextField
                            fullWidth={true}
                            defaultValue={partie.contenu}
                            variant="standard"
                            inputProps={{style: {fontSize: 12}}}
                            size="small"
                            multiline={true}
                            onChange={
                                (event) => {
                                    temporairePartie.contenu = event.target.value;
                                    handleChange(i, "contenu");
                                }
                            }>
                        </StyledTextField>
                    </StyledTableCell>
                    <StyledTableCell>
                        <StyledTextField
                            fullWidth={true}
                            defaultValue={partie.methodologie}
                            variant="standard"
                            inputProps={{style: {fontSize: 12}}}
                            size="small"
                            multiline={true}
                            onChange={
                                (event) => {
                                    temporairePartie.methodologie = event.target.value;
                                    handleChange(i, "methodologie");
                                }
                            }>
                        </StyledTextField>

                    </StyledTableCell>

                    <TableCell
                        align="center">
                        <a onClick={() => handleItemDeletedPartie(i)}>
                            <DeleteIcon className="Icones"/>
                        </a>
                    </TableCell>
                </StyledTableRow>
            )
        }
    )

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

    const StyledTableCell = styled(TableCell)(({theme}) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
            verticalAlign: 'bottom',
        },
    }));
    const StyledTextField = styled(TextField)(({theme}) => ({
        [`&.${textFieldClasses}`]: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            fontSize: 20,
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

    return (
        <Grid marginBottom={4}>
            <TableContainer component={Paper}>
                <Table stickyHeader aria-label="customized table">
                    <StyledTableHead>
                        <StyledTableRow>
                            <StyledTableCell width={"15%"}>Plan/Partie</StyledTableCell>
                            <StyledTableCell width={"5%"}>Timing</StyledTableCell>
                            <StyledTableCell width={"20%"}>Contenu</StyledTableCell>
                            <StyledTableCell width={"55%"}>Méthodologie pédagogique</StyledTableCell>
                            <StyledTableCell width={"5%"}>Action</StyledTableCell>
                        </StyledTableRow>
                    </StyledTableHead>
                    <TableBody>

                        {/* Chargement des données*/}
                        {AfficherDataFilConducteur()}

                        {/* INPUT NOUVELLE LIGNE*/}
                        <StyledTableRow key={10000}>
                            <StyledTableCell>
                                <StyledTextField
                                    fullWidth={true}
                                    variant="standard"
                                    inputProps={{style: {fontSize: 12}}}
                                    size="small"
                                    multiline={true}
                                    onChange={
                                        (event) => {
                                            temporairePartie.plan = event.target.value;
                                        }
                                    }
                                    onKeyPress={e => e.key === 'Enter' && handleAjoutPartie()}
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
                                        (event) => {
                                            temporairePartie.timing = event.target.value;
                                        }
                                    }
                                    onKeyPress={e => e.key === 'Enter' && handleAjoutPartie()}
                                >
                                </TextField>
                            </StyledTableCell>
                            <StyledTableCell>
                                <TextField
                                    fullWidth={true}
                                    variant="standard"
                                    inputProps={{style: {fontSize: 12}}}
                                    size="small"
                                    multiline={true}
                                    onChange={
                                        (event) => {
                                            temporairePartie.contenu = event.target.value;
                                        }
                                    }
                                    onKeyPress={e => e.key === 'Enter' && handleAjoutPartie()}
                                >
                                </TextField>
                            </StyledTableCell>
                            <StyledTableCell>
                                <TextField
                                    fullWidth={true}
                                    variant="standard"
                                    inputProps={{style: {fontSize: 12}}}
                                    size="small"
                                    multiline={true}
                                    onChange={
                                        (event) => {
                                            temporairePartie.methodologie = event.target.value;
                                        }
                                    }
                                    onKeyPress={e => e.key === 'Enter' && handleAjoutPartie()}
                                >
                                </TextField>
                            </StyledTableCell>

                            <TableCell
                                align="center">
                                <a onClick={() => handleAjoutPartie()}>
                                    <AddBoxIcon className="Icones"/>
                                </a>
                            </TableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    )
}

export default ModificationFilConducteur;
