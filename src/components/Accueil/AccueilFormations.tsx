import React, { useEffect, useState } from "react";
import { FetchAllFormation } from "../../serverInteraction/FetchFormation";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";
import AccueilAffichage from "./ComposantAccueil/AccueilAffichage";
import decodeToken from "../../auth/decodeToken";
import { FetchDemandesFavorables, FetchFormateur } from "../../serverInteraction/FetchData";

function Accueil() {
  const [data, setData] = useState([]);
  const [userInfo, setUserInfo] = useState(undefined)

  const axiosPrivate = useAxiosPrivate();

  const getFormationsAccueil = async () => {
    try {
      const response = await FetchAllFormation(axiosPrivate);
      setData(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getUserDetail = async () => {
    try {
      const role = decodeToken(localStorage.getItem("accessToken")).decoded.role
      if (role === "ROLE_ASSO"){
        const response = await FetchDemandesFavorables(axiosPrivate)
        setUserInfo(response.data)
      }
      if (role === "ROLE_FORMATEUR"){
        const response = await FetchFormateur(axiosPrivate)
        setUserInfo(response.data)
      }
    } catch(err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getFormationsAccueil();
  }, []);

  useEffect(() => {
    getUserDetail();
  }, [])

  return AccueilAffichage(data, userInfo);
}

export default Accueil;
