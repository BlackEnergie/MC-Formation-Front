import React from "react";
import { AiOutlineEdit, AiOutlineZoomIn } from "react-icons/ai";
import { Link } from "react-router-dom";
import { statut, statutToString, statutToStyle } from "../../../utils/StatutUtils";
import decodeToken from "../../../auth/decodeToken";
import { FiltreAccueil } from "./FiltreAccueil";
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
} from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { domaines, filtre } from "./FiltreAccueil";

export interface formation {
  association: {
    acronyme: string;
    nomComplet: string;
  };
  cadre?: string;
  domaines: domaines[];
  formateurs: {
    id: number;
    nom: string;
    prenom: string;
  }[];
  statut: statut;
  nom?: string;
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
    newPage: number
  ) => void;
}

type Props = { data: formation[] };

function TablePaginationActions(props: TablePaginationActionsProps) {
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
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

function filtres(data: formation[]): formation[] {
  const newdata: formation[] = [];
  let checkFormateur: boolean;
  let checkDomaine: boolean;
  data.map((data) => {
    checkFormateur = true;
    checkDomaine = true;
    if (
      filtre.statut.includes(statutToString(data.statut)) &&
      (filtre.cadre.length == 0 || filtre.cadre.includes(data.cadre)) &&
      (filtre.asso.length == 0 ||
        filtre.asso.includes(data.association.acronyme)) &&
      (data.nom
        ? data.nom.includes(filtre.sujet)
        : data.sujet.includes(filtre.sujet))
    ) {
      data.formateurs.map((formateur) => {
        if (
          !filtre.formateurs.includes(formateur.prenom + " " + formateur.nom) &&
          filtre.formateurs.length != 0
        ) {
          checkFormateur = false;
        }
      });
      if (data.formateurs.length == 0 && filtre.formateurs.length != 0) {
        checkFormateur = false;
      }
      data.domaines.map((domaine) => {
        if (
          !filtre.domaines.includes(domaine.libelle) &&
          filtre.domaines.length != 0
        ) {
          checkDomaine = false;
        }
      });
      if (checkDomaine && checkFormateur) {
        newdata.push(data);
      }
    }
  });

  return newdata;
}

function TableAccueil(props: Props) {
  const data = filtres(props.data);

  console.log(data);
  console.log(filtre);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const domaineLibelleList = (domaines) => {
    let list = [];
    domaines.map((domaine) => {
      list.push(domaine.libelle);
    });
    return list;
  };

  data.sort((a, b) => a.id - b.id);

  const checkRoleAsso = () => {
    const token = decodeToken(localStorage.getItem("accessToken")).decoded;
    return token.role === "ROLE_ASSO";
  };

  const checkRoleBn = () => {
    const token = decodeToken(localStorage.getItem("accessToken")).decoded;
    return token.role === "ROLE_BN";
  };

  const checkRoleFormateur = () => {
    const token = decodeToken(localStorage.getItem("accessToken")).decoded;
    return token.role === "ROLE_FORMATEUR";
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
              <TableCell align="center" hidden={!checkRoleBn()}>
                Formateur(s)
              </TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.id}>
                    <TableCell
                      align="center"
                      style={{ color: statutToStyle(row.statut) }}
                    >
                      {statutToString(row.statut)}
                    </TableCell>
                    <TableCell align="center">
                      {row.cadre == null ? "N/A" : row.cadre}
                    </TableCell>
                    <TableCell
                      align="center"
                      title={domaineLibelleList(row.domaines).join(", ")}
                    >
                      {domaineLibelleList(row.domaines).join(", ").length > 40
                        ? domaineLibelleList(row.domaines)
                            .join(", ")
                            .substring(0, 40) + "..."
                        : domaineLibelleList(row.domaines).join(", ")}
                    </TableCell>
                    <TableCell align="center">
                      {row.nom != null ? row.nom : "Provisoire : " + row.sujet}
                    </TableCell>
                    <TableCell
                      align="center"
                      title={row.association.nomComplet}
                    >
                      {row.association.acronyme}
                    </TableCell>
                    <TableCell align="center" hidden={!checkRoleBn()}>
                      {row.formateurs.map(
                        (formateur) => formateur.prenom + " " + formateur.nom
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {row.date == null ? "N/A" : row.date}
                    </TableCell>
                    <TableCell align="center">
                      <Link to={"/formation/" + row.id}>
                        <AiOutlineZoomIn className="Icones me-2" />
                      </Link>
                      {checkRoleAsso() ? (
                        <></>
                      ) : (
                        <Link to={"/formation/edit/" + row.id}>
                          <AiOutlineEdit className="Icones me-2" />
                        </Link>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 15]}
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "Lignes par page",
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
export default TableAccueil;
