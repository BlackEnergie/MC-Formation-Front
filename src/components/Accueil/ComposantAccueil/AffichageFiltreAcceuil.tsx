import {Autocomplete, Stack, TextField} from "@mui/material";
import React from "react";
import {filtre, getFiltre, setFiltre} from "./FiltreAccueil";
type Props = { filtre: filtre };

function AffichageFiltreAcceuil(props: Props) {

    console.log(props.filtre)


    let newfiltre : filtre = getFiltre();

    return (

        <Stack spacing={1} sx={{width: 300}}>
            <Autocomplete
                freeSolo
                multiple
                id="free-solo-2-demo"
                disableClearable
                options={props.filtre.statut}
                onChange= {(event, value) =>{
                    newfiltre.statut = value;
                    setFiltre(newfiltre)
                } }
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
                onChange= {(event, value) =>{
                    newfiltre.domaines = value;
                    setFiltre(newfiltre)
                } }
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
                onChange= {(event, value) =>{
                    newfiltre.cadre = value;
                    setFiltre(newfiltre)
                } }
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
                variant="outlined"
                onInput={(event) => {
                    newfiltre.sujet = event.currentTarget.ariaValueText
                    setFiltre(newfiltre)
                }}
            />

            <Autocomplete
                freeSolo
                multiple
                id="free-solo-2-demo"
                disableClearable
                options={props.filtre.asso}
                onChange= {(event, value) =>{
                    newfiltre.asso = value;
                    setFiltre(newfiltre)
                } }
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
                onChange= {(event, value) =>{
                    newfiltre.formateurs = value;
                    setFiltre(newfiltre)
                } }
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