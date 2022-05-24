import {
    Autocomplete,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from '@mui/material';
import React, {useState} from 'react';
import Select from 'react-select';
import {styled} from '@mui/material/styles';
import {tableCellClasses} from "@mui/material/TableCell";
import Formation from "../../../api/model/Formation";
import AddBoxIcon from "@mui/icons-material/AddBox";

import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";

const optionsType = [
    {value: 'Formation', label: 'Formation'},
    {value: 'Atelier', label: 'Atelier'}
];
let valueDomaine;

const ModificationFicheDeFormation = (props) =>{
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
            fontWeight: 'bold',
            height: 68.8,
        },
    }));

    let tempObj = "";
    let tempMateriels = "";
    let tempFormation = props.formation;
    const [liveness, setLiveness] = useState(0);

    let listeDomaines = props.domaine.map((item, index) => {
        return {
            label: item.libelle,
            value: item,
            key: item.code,

        }
    });
    /*            PARTIE D'AFFICHAGE          */
    const AfficherFormationDetails = () => {
        return (
            <>
                <StyledTableRow key={102}>
                    <StyledTableCellHead>Type</StyledTableCellHead>
                    <StyledTableCell>
                        <Autocomplete
                            fullWidth={true}
                            size="small"
                            disablePortal
                            defaultValue={props.formation.type}
                            options={optionsType}
                            onChange={(event,value) => {
                                tempFormation.type=value['value'];
                                handleChange("type");
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
                <StyledTableRow key={103}>
                    <StyledTableCellHead>Audience</StyledTableCellHead>
                    <StyledTableCell>
                        <TextField
                            fullWidth={true}
                            defaultValue={props.formation.audience}
                            variant="standard"
                            inputProps={{style: {fontSize: 12}}}
                            size="small"
                            multiline={true}
                            onChange={
                                (event) => {
                                    tempFormation.audience = event.target.value;
                                    handleChange("audience");
                                }
                            }>
                        </TextField>
                    </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow key={104}>
                    <StyledTableCellHead key={"DONTMOVEIT3"}>Durée (min)</StyledTableCellHead>
                    <StyledTableCell key={"DONTMOVEIT2"}>
                        <TextField key={"DONTMOVEIT"}
                                   type="text"
                                   placeholder="Durée de la formation (en minutes)"
                                   value={props.formation.duree}
                                   inputProps={{style: {fontSize: 12}}}
                                   onChange={(event) => {
                                       tempFormation.duree = event.target.value;
                                       tempFormation.duree = tempFormation.duree.replace(/\D+/g, '');
                                       props.majFormation(tempFormation);
                                       setLiveness(liveness + 1);
                                   }}

                                   fullWidth={true}
                                   variant="standard"
                                   size="small"
                        />
                    </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow key={105}>
                    <StyledTableCellHead>Prérequis</StyledTableCellHead>
                    <StyledTableCell>
                        <TextField
                            fullWidth={true}
                            defaultValue={props.formation.prerequis}
                            variant="standard"
                            inputProps={{style: {fontSize: 12}}}
                            size="small"
                            multiline={true}
                            onChange={
                                (event) => {
                                    tempFormation.prerequis = event.target.value;
                                    handleChange("prerequis");
                                }
                            }>
                        </TextField>
                    </StyledTableCell>
                </StyledTableRow>
            </>
        )

    }

    const afficherListePedagogique = () =>
        props.formation.objectifs?.length > 0 ?
            props.formation.objectifs?.map(
                (info, i) => {
                    return (
                        <StyledTableRow key={i}>
                            <StyledTableCell>{info}</StyledTableCell>
                            <StyledTableCell align="center">
                                <Button onClick={() => handleItemDeletedObjPedagogique(i)}>
                                    <DeleteIcon className="Icones"/>
                                </Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    )
                }
            ) : <StyledTableRow key={301}>
            </StyledTableRow>


    const afficherListeDomaines = () =>
        props.formation.domaines?.length > 0 ?
            props.formation.domaines.map(
                (info, i) => {
                    return (
                        <StyledTableRow key={info.code} title={info.description}>
                            <StyledTableCell>
                                {info.code}
                            </StyledTableCell>
                            <StyledTableCell>
                                {info.libelle}
                            </StyledTableCell>
                            <StyledTableCell
                                align="center">
                                <Button onClick={() => handleItemDeletedDomaines(i)}>
                                    <DeleteIcon className="Icones"/>
                                </Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    )
                }
            ) : <StyledTableRow key={310}>
            </StyledTableRow>


    const afficherListeMateriels = () =>
        props.formation.materiels?.length > 0 ?
            props.formation.materiels.map(
                (item, i) => {
                    return (
                        <StyledTableRow key={i}>
                            <StyledTableCell>{item}</StyledTableCell>
                            <StyledTableCell align="center">
                                <Button onClick={() => handleItemDeletedMateriels(i)}>
                                    <DeleteIcon className="Icones"/>
                                </Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    )
                }
            ) : <StyledTableRow key={315}>
            </StyledTableRow>

    /*             PARTIE D'AJOUT            */
    const handleAjoutObjPedagogique = () => {
        let newFormation = props.formation;
        if (tempObj !== "")
            newFormation.objectifs.push(tempObj);
        props.majFormation(newFormation);
        setLiveness(liveness + 1);
        tempObj = "";
    }
    const handleAjoutMateriel = () => {
        let newFormation = props.formation;
        if (tempMateriels !== "")
            newFormation.materiels.push(tempMateriels);
        props.majFormation(newFormation);
        setLiveness(liveness + 1);
        tempMateriels = "";
    }
    const handleAjoutDomaines = (v) => {
        let newFormation = props.formation;
        const newdomaine = {
            code: v.key,
            libelle: v.value.libelle,
            description: v.value.description,
        }
        newFormation.domaines.push(newdomaine);
        setLiveness(liveness + 1);
    }

    /*            PARTIE DE DELETE            */
    const handleItemDeletedMateriels = (i) => {
        let newFormation = props.formation;
        newFormation.materiels = props.formation.materiels.filter((item, index) => index !== i);
        props.majFormation(newFormation);
        setLiveness(liveness + 1);
    }
    const handleItemDeletedDomaines = (i) => {
        let newFormation = props.formation;
        newFormation.domaines = props.formation.domaines.filter((item, index) => index !== i);
        props.majFormation(newFormation);
        setLiveness(liveness + 1);
    }
    const handleItemDeletedObjPedagogique = (i) => {
        let newFormation = props.formation;
        newFormation.objectifs = props.formation.objectifs.filter((item, index) => index !== i);
        props.majFormation(newFormation);
        setLiveness(liveness + 1);
    }

    /*            PARTIE DE CHANGE            */
    const handleChange = (s) => {
        let newFormation = props.formation;
        switch (s) {
            case 'type' :
                newFormation.type = tempFormation.type;
                break;
            case "audience" :
                newFormation.audience = tempFormation.audience;
                break;
            case "duree" :
                newFormation.duree = tempFormation.duree.replace(/\D/g, '');
                break;
            case "date" :
                newFormation.prerequis = tempFormation.prerequis;
                break;
        }
        props.majFormation(newFormation);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Typography
                    sx={{flex: '1 1 100%', p: 1}}
                    variant="h5"
                    color="primary"
                    id="tableTitle"
                    component="div"> Informations
                </Typography>
                <TableContainer component={Paper} sx={{maxHeight: 350}}>
                    <Table stickyHeader sx={{minWidth: 100}} aria-label="customized table">
                        <StyledTableHead>
                            <StyledTableRow key={201}>
                                <StyledTableCell width={120}></StyledTableCell>
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
                    sx={{flex: '1 1 100%', p: 1}}
                    variant="h5"
                    color="primary"
                    id="tableTitle"
                    component="div">Objectif(s) Pédagogique(s)
                </Typography>
                <TableContainer component={Paper} sx={{maxHeight: 350}}>
                    <Table stickyHeader aria-label="customized table">
                        <StyledTableHead>
                            <StyledTableRow key={202}>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell sx={{width: 40}}></StyledTableCell>
                            </StyledTableRow>
                        </StyledTableHead>
                        <TableBody>
                            {afficherListePedagogique()}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TableContainer component={Paper} sx={{maxHeight: 350}}>
                    <Table stickyHeader aria-label="customized table">
                        <TableBody>
                            <StyledTableRow key={203}>
                                <StyledTableCell>
                                    <TextField
                                        fullWidth={true}
                                        variant="standard"
                                        inputProps={{style: {fontSize: 12}}}
                                        size="small"
                                        multiline={true}
                                        onKeyPress={e => e.key === 'Enter' && handleAjoutObjPedagogique()}
                                        type="text"
                                        onChange={(e) => {
                                            tempObj = e.target.value
                                        }}
                                    >
                                    </TextField>
                                </StyledTableCell>
                                <StyledTableCell width={40}>
                                    <Button onClick={handleAjoutObjPedagogique}>
                                        <AddBoxIcon className="Icones"/>
                                    </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

            </Grid>
            <Grid item xs={6} mb={10}>
                <Typography
                    sx={{flex: '1 1 100%', p: 1}}
                    variant="h5"
                    color="primary"
                    id="tableTitle"
                    component="div">Domaine(s)</Typography>
                <TableContainer component={Paper} sx={{maxHeight: 350}}>
                    <Table stickyHeader aria-label="customized table">
                        <StyledTableHead>
                            <StyledTableRow key={206}>
                                <StyledTableCell sx={{width: 100}}>Code</StyledTableCell>
                                <StyledTableCell>Nom</StyledTableCell>
                                <StyledTableCell sx={{width: 40}}></StyledTableCell>
                            </StyledTableRow>
                        </StyledTableHead>
                        <TableBody>
                            {afficherListeDomaines()}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TableContainer component={Paper} sx={{maxHeight: 350}}>
                    <Table stickyHeader aria-label="customized table">

                        <TableBody>
                            <StyledTableRow key={207}>
                                <StyledTableCell sx={{width: 100}}></StyledTableCell>
                                <StyledTableCell sx={{padding: 0}}>
                                    <Autocomplete

                                        fullWidth={true}
                                        size="small"
                                        disablePortal
                                        id="combo-box-demo"
                                        options={listeDomaines}
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

                                <TableCell align="center" sx={{width: 40}}>
                                    <Button onClick={() => handleAjoutDomaines(valueDomaine)}>
                                        <AddBoxIcon className="Icones"/>
                                    </Button>
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
                    component="div">Besoin(s) matériel(s)</Typography>
                <TableContainer component={Paper} sx={{maxHeight: 350}}>
                    <Table stickyHeader aria-label="customized table">
                        <StyledTableHead>
                            <StyledTableRow key={209}>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell sx={{width: 40}}></StyledTableCell>
                            </StyledTableRow>
                        </StyledTableHead>
                        <TableBody>
                            {afficherListeMateriels()}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TableContainer component={Paper} sx={{maxHeight: 350}}>
                    <Table stickyHeader aria-label="customized table">

                        <TableBody>
                            <StyledTableRow key={210}>
                                <StyledTableCell>
                                    <TextField
                                        fullWidth={true}
                                        variant="standard"
                                        inputProps={{style: {fontSize: 12}}}
                                        size="small"
                                        multiline={true}
                                        onKeyPress={e => e.key === 'Enter' && handleAjoutMateriel()}
                                        type="text"
                                        onChange={(e) => {
                                            tempMateriels = e.target.value
                                        }}
                                    >
                                    </TextField>
                                </StyledTableCell>
                                <StyledTableCell align="center" width={40}>
                                    <Button onClick={handleAjoutMateriel}>
                                        <AddBoxIcon className="Icones"/>
                                    </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}

export default ModificationFicheDeFormation;
