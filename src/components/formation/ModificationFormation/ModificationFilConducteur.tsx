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
import {TextField, textFieldClasses, Typography} from '@mui/material';

const ModificationFilConducteur = (props) => {

    const [liveness, setLiveness] = useState(0);

    const INITIAL_PARTIE: Partie = {
        id: 0,
        plan: "",
        timing: 0,
        contenu: "",
        methodologie: "",
    }
    let temporairePartie = INITIAL_PARTIE;
    let temporaireAjoutPartie = INITIAL_PARTIE;

    const handleChange = (i, s) => {
        let items = props.formation.parties;
        switch (s) {
            case 'plan' :
                items[i].plan = temporairePartie.plan;
                temporairePartie.plan = "";
                break;
            case "timing" :
                items[i].timing = Number(temporairePartie.timing);
                temporairePartie.timing = 0;
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

        if (!Number.isInteger(temporaireAjoutPartie.timing)){
            temporaireAjoutPartie.timing=0;
        }
        const newPartie: Partie = {
            id: getMax(props.formation.parties),
            plan: temporaireAjoutPartie.plan,
            timing: temporaireAjoutPartie.timing,
            contenu: temporaireAjoutPartie.contenu,
            methodologie: temporaireAjoutPartie.methodologie
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
                                    temporairePartie.timing = Number(event.target.value);
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

    const getDureeFormation= () =>{
        let sumParties = 0;
        props.formation.parties.map(
            (item) =>{
                sumParties= sumParties + item.timing;
            }
        )
        let delta = sumParties-props.formation.duree;
        if (props.formation.duree >=1){
            if (delta>0) {
                return (
                    <Typography>
                        Vous avez {delta} minutes de trop par rapport à la durée prévue
                    </Typography>
                )
            }else{
                return (
                    <Typography>
                        Vous avez encore {Math.abs(delta)} minutes à combler dans la formation
                    </Typography>
                )
            }
        }else{
            return(
                <Typography>
                    Vous n'avez pas défini la durée la formation
                </Typography>
                )
        }

    }

    const StyledTableCell = styled(TableCell)(({theme}) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
            verticalAlign: 'bottom',
            paddingTop:0,
            paddingBottom:0,
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
        height:65,
    }));
    const StyledTableRowInput = styled(TableRow)(({theme}) => ({
        backgroundColor:'rgba(211,211,211,0.04)'
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
            <Typography
                sx={{flex: '1 1 100%', p: 1}}
                variant="h5"
                color="primary"
                id="tableTitle"
                component="div">Fil Conducteur
            </Typography>
            <TableContainer component={Paper} >
                <Table stickyHeader aria-label="customized table">
                    <StyledTableHead>
                        <StyledTableRow>
                            <StyledTableCell width={"15%"}>Plan/Partie</StyledTableCell>
                            <StyledTableCell width={"5%"}>Timing(min)</StyledTableCell>
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
                                            temporaireAjoutPartie.plan = event.target.value;
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
                                            temporaireAjoutPartie.timing = Number(event.target.value);
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
                                            temporaireAjoutPartie.contenu = event.target.value;
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
                                            temporaireAjoutPartie.methodologie = event.target.value;
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
            <TableContainer component={Paper} sx={{padding:1}}>
                <Table >
                    <TableBody>
                        <TableRow >
                            <StyledTableCell align="right" sx={{pr:4, color:"#808080"}}>
                                <Typography>
                                    {getDureeFormation()}
                                </Typography>

                            </StyledTableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    )
}

export default ModificationFilConducteur;
