import {Autocomplete, Stack, TextField} from "@mui/material";
import React from "react";
import {filtre} from "./FiltreAccueil";
import {formation} from "./TableAccueil";

type Props = { filtre: filtre };

function AffichageFiltreAcceuil(props: Props) {

    console.log(props.filtre)

    const listFiltre = []

    return (

        <Stack spacing={1} sx={{width: 500}}>
            <Autocomplete
                freeSolo
                multiple
                id="free-solo-2-demo"
                disableClearable
                options={props.filtre.statut}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Statut"
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                        }}
                    />
                )}
            />
            <Autocomplete
                freeSolo
                multiple
                id="free-solo-2-demo"
                disableClearable
                options={props.filtre.domaines}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Domaines"
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                        }}
                    />
                )}
            />
            <Autocomplete
                freeSolo
                multiple
                id="free-solo-2-demo"
                disableClearable
                options={props.filtre.cadre}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Cadre"
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                        }}
                    />
                )}
            />

            <TextField
                id="outlined-basic"
                label="Sujet/nom"
                variant="outlined" />
            <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={props.filtre.asso}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Association"
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                        }}
                    />
                )}
            />
            <Autocomplete
                freeSolo
                multiple
                id="free-solo-2-demo"
                disableClearable
                options={props.filtre.formateurs}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Formtateurs"
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                        }}
                    />
                )}
            />
        </Stack>
    )
}


export default AffichageFiltreAcceuil;