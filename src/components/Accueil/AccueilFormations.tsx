import React, { useEffect, useState } from "react";
import { FetchAllFormation } from "../../serverInteraction/FetchFormation";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";
import TableAccueil from "./ComposantAccueil/TableAccueil";
import {
  filter,
  FiltreAccueil,
  getFiltre,
} from "./ComposantAccueil/FiltreAccueil";
import { Grid } from "@mui/material";

function Accueil() {
  const [data, setData] = useState([]);
  const [filtreAccueil, setFiltre] = useState(getFiltre());

  const axiosPrivate = useAxiosPrivate();

  const getFormationsAccueil = async () => {
    try {
      const response = await FetchAllFormation(axiosPrivate);
      setData(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFormationsAccueil();
  }, []);

  useEffect(() => {
    setFiltre(getFiltre());
    console.log("test");
  }, [filter]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={3} marginTop={5}>
          <Grid marginLeft={6}>
            <FiltreAccueil data={data} />
          </Grid>
        </Grid>
        <Grid xs={9}>
          <TableAccueil data={data} filtre={filtreAccueil} />
        </Grid>
      </Grid>
    </>
  );
}

export default Accueil;
