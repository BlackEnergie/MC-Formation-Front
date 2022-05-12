import React, { useEffect, useState } from "react";
import { FetchAllFormation } from "../../serverInteraction/FetchFormation";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";
import AccueilAffichage from "./ComposantAccueil/AccueilAffichage";

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

  return AccueilAffichage(data)
    ;
}

export default Accueil;
