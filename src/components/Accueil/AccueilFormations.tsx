import React, { useEffect, useState } from "react";
import { FetchAllFormation } from "../../serverInteraction/FetchFormation";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";
import TableAccueil, { formation } from "./ComposantAccueil/TableAccueil";
import { FiltreAccueil } from "./ComposantAccueil/FiltreAccueil";
import { Grid, Typography } from "@mui/material";

function Accueil() {
  const [data, setData] = useState([]);

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

  FiltreAccueil(data);

  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={3}>
          
        </Grid>
        <Grid xs={9}>
          <TableAccueil data={data} />
        </Grid>
      </Grid>
    </>
  );
}

export default Accueil;
