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
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import {Input, TextField, textFieldClasses} from '@mui/material';

const ModificationFilConducteur = (formation) => {
    const INITIAL_PARTIE : Partie = {
        id: 0,
        plan: "",
        timing: "",
        contenu: "",
        methodologie: "",
    }
    let temporairePartie = INITIAL_PARTIE ;
    const [filConducteur , setFilConducteur] = useState(JSON.parse(formation.formation.parties));

    /*const handleChange = (attribut, i, value) => {
            setFilConducteur({
                plan:temporairePartie.plan,
                timing:temporairePartie.timing,
                contenu:temporairePartie.contenu,
                methodologie:temporairePartie.methodologie
            });
            console.log(filConducteur);
        };*/

    const handleChange = (i) => {

        let items = INITIAL_PARTIE;
        items = filConducteur;
        console.log(items[i])
        items[i].plan = temporairePartie.plan;
        items[i].timing = temporairePartie.timing;
        items[i].contenu = temporairePartie.contenu;
        items[i].methodologie = temporairePartie.methodologie;

        setFilConducteur(items);
        console.log(filConducteur[i])
    };


    const AfficherDataFilConducteur = () => filConducteur?.map(
        (partie,i) => {
            return (
                <StyledTableRow key={partie.id}>
                    <TableCell>
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
                                    handleChange(i);
                                }
                            }
                        >
                        </StyledTextField>
                    </TableCell>
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
                                    handleChange(i);
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
                                    handleChange(i);
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
                                    handleChange(i);
                                }
                            }>
                        </StyledTextField>

                    </StyledTableCell>

                    <StyledTableCell>
                        <a onClick={() => handleItemDeletedPartie(i)}>
                            <DeleteIcon className="Icones"/>
                        </a>
                    </StyledTableCell>
                </StyledTableRow>
            )
        }
    )

    const handleItemDeletedPartie = (i) => {
        setFilConducteur(filConducteur.filter((item, index) => index !== i));
    }
    const handleAjoutPartie = () =>{
        setFilConducteur(
            filConducteur => [...filConducteur,
                {
                    id:getMax(filConducteur),
                    plan:temporairePartie.plan,
                    timing:temporairePartie.timing,
                    contenu:temporairePartie.contenu,
                    methodologie:temporairePartie.methodologie
                }
            ]
        );
    }

    function getMax(list){
        let cpt=1;
        list.forEach(val=>{
            if(val.id>cpt){
                cpt=val.id
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
        },
    }));

    const StyledTextField = styled(TextField)(({theme}) => ({
        [`&.${textFieldClasses}`]: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            fontSize:20,
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
        <Grid marginBottom={4}>
            <TableContainer component={Paper} >
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
                                <TextField
                                    fullWidth={true}
                                    size="small"
                                    variant="standard"
                                    type="text"
                                    onChange={
                                        (event) => {
                                            temporairePartie.plan = event.target.value;
                                        }
                                    }
                                    onKeyPress={e => e.key === 'Enter' && handleAjoutPartie() }
                                >
                                </TextField>
                            </StyledTableCell>
                            <StyledTableCell>
                                <TextField
                                    fullWidth={true}
                                    size="small"
                                    variant="standard"
                                    type="text"
                                    onChange={
                                        (event) => {
                                            temporairePartie.timing = event.target.value;
                                        }
                                    }
                                    onKeyPress={e => e.key === 'Enter' && handleAjoutPartie() }
                                >
                                </TextField>
                            </StyledTableCell>
                            <StyledTableCell>
                                <TextField
                                    fullWidth={true}
                                    size="small"
                                    variant="standard"
                                    type="text"
                                    onChange={
                                        (event) => {
                                            temporairePartie.contenu = event.target.value;
                                        }
                                    }
                                    onKeyPress={e => e.key === 'Enter' && handleAjoutPartie() }
                                >
                                </TextField>
                            </StyledTableCell>
                            <StyledTableCell>
                                <TextField
                                    fullWidth={true}
                                    size="small"
                                    variant="standard"
                                    type="text"
                                    onChange={
                                        (event) => {
                                            temporairePartie.methodologie = event.target.value;
                                        }
                                    }
                                    onKeyPress={e => e.key === 'Enter' && handleAjoutPartie() }
                                >
                                </TextField>
                            </StyledTableCell>

                            <StyledTableCell>
                                <a onClick={() => handleAjoutPartie()}>
                                    <AddBoxIcon className="Icones"/>
                                </a>
                            </StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    )
}

export default ModificationFilConducteur;
