import React, { useEffect, useState } from "react";
import { FetchAllFormation } from "../../serverInteraction/FetchFormation";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";
import Help from "./dernierespoir/help";
import {
  filter,
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

  return Help(data)
    ;
}

export default Accueil;
