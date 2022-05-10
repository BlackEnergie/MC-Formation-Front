import React, { useEffect, useState } from "react";
import { FetchAllFormation } from "../../serverInteraction/FetchFormation";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import decodeToken from "../../auth/decodeToken";
import {AiOutlineEdit, AiOutlineZoomIn} from "react-icons/ai";
import { Link } from "react-router-dom";
import { statutToString } from "../../utils/StatutUtils";


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

  return Render(data);
}

interface formation {
  association: {
    acronyme: string;
    nomComplet: string;
  };
  cadre?: string;
  domaines: {
    code: string;
    libelle: string;
    description: string;
  }[];
  formateurs: {
    id: number;
    nom: string;
    prenom: string;
  }[];
  statut: Number;
  titre?: string;
  sujet: string;
  date?: string;
  id: number;
}

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
         <KeyboardArrowRight />
      </IconButton>
    </Box>
  );
}



function Render(data: formation[]) {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const domaineLibelleList = (domaines) => {
    let list = [];
    domaines.map((domaine) => {
        list.push(domaine.libelle)
    })
    return list;
  }
  
  const checkRoleAsso = () => {
    const token = decodeToken(localStorage.getItem("accessToken")).decoded;
    return token.role === "ROLE_ASSO"
  }
  
  const checkRoleBn = () => {
    const token = decodeToken(localStorage.getItem("accessToken")).decoded;
    return token.role === "ROLE_BN"
  }
  
  const checkRoleFormateur = () => {
    const token = decodeToken(localStorage.getItem("accessToken")).decoded;
    return token.role === "ROLE_FORMATEUR"
  }

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (
    <>
      <div className="container-fluid" id="accueil">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableCell align="center">Statut</TableCell>
              <TableCell align="center">Cadre</TableCell>
              <TableCell align="center">Domaine(s)</TableCell>
              <TableCell align="center">Titre</TableCell>
              <TableCell align="center">Association</TableCell>
              <TableCell align="center" hidden={!checkRoleBn()}>Formateur(s)</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableHead>
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="center" color="pink">{statutToString(row.statut)}</TableCell>
                  <TableCell align="center">{row.cadre == null ? "N/A" : row.cadre}</TableCell>
                  <TableCell align="center">{domaineLibelleList(row.domaines).join(", ")}</TableCell>
                  <TableCell align="center">{row.titre != null ? row.titre : "Provisoire : " + row.sujet}</TableCell>
                  <TableCell align="center" title={row.association.nomComplet}>{row.association.acronyme}</TableCell>
                  <TableCell align="center" hidden={!checkRoleBn()}>{row.formateurs.map((formateur) => formateur.prenom + " " + formateur.nom)}</TableCell>
                  <TableCell align="center">{row.date == null ? "N/A" : row.date}</TableCell>
                  <TableCell align="center" >
                    <Link to={'/formation/' + row.id}>
                        <AiOutlineZoomIn className="Icones me-2"/>
                    </Link>
                    {checkRoleAsso() ?
                        (<></>) :
                        (<Link to={'/formation/edit/' + row.id}>
                            <AiOutlineEdit className="Icones me-2"/>
                        </Link>)}
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow >
                <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'Lignes par page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
                align="right"
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default Accueil;
