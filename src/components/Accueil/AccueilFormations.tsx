import React, { useEffect, useState } from "react";
import TableAccueil from "./TableAccueil/TableAccueil";
import { FetchAllFormation } from "../../serverInteraction/FetchFormation";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";

function Accueil() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getFormationsAccueil();
  }, []);

  const axiosPrivate = useAxiosPrivate();

  const getFormationsAccueil = async (): Promise<any> => {
    try {
      const response = await FetchAllFormation(axiosPrivate);
      setData(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="container-fluid" id="accueil">
        <div className="row">
          <div className="col">
            <TableAccueil Donnee={data} />
          </div>
        </div>
      </div>
    </>
  );
}
export default Accueil;
