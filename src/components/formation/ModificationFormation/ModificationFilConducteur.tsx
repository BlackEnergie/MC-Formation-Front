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
import toast from "react-hot-toast";
import {PostFormation} from "../../../serverInteraction/PostFormation";
import useAxiosPrivate from "../../../auth/hooks/useAxiosPrivate";

const ModificationFilConducteur = (formation) => {

    const axiosPrivate = useAxiosPrivate();


    const handleSubmit = async () => {
        try {
            const response = await PostFormation(axiosPrivate, filConducteur);
            toast.success("youpi");
        } catch (err) {
            toast.error("lol");
        }
    };


    const INITIAL_PARTIE: Partie = {
        id: 0,
        plan: "",
        timing: "",
        contenu: "",
        methodologie: "",
    }
    let temporairePartie = INITIAL_PARTIE;
    const [filConducteur, setFilConducteur] = useState(JSON.parse(formation.formation.parties));


    const handleChange = (i, s) => {

        let items = filConducteur;
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
        ;
        setFilConducteur(items);
    };


    const AfficherDataFilConducteur = () => filConducteur?.map(
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

    const handleItemDeletedPartie = (i) => {
        setFilConducteur(filConducteur.filter((item, index) => index !== i));
    }
    const handleAjoutPartie = () => {
        setFilConducteur(
            filConducteur => [...filConducteur,
                {
                    id: getMax(filConducteur),
                    plan: temporairePartie.plan,
                    timing: temporairePartie.timing,
                    contenu: temporairePartie.contenu,
                    methodologie: temporairePartie.methodologie
                }
            ]
        );
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
                                    onKeyPress={e => e.key === 'Enter' && handleAjoutPartie()}
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
                                    onKeyPress={e => e.key === 'Enter' && handleAjoutPartie()}
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
                                    onKeyPress={e => e.key === 'Enter' && handleAjoutPartie()}
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
            <button type="button" className="btn btn-mc"
                    onClick={handleSubmit}>Sauvegarder
            </button>
        </Grid>
    )
}

export default ModificationFilConducteur;
