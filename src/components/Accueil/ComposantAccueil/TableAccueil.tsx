import React from "react";
import { AiOutlineEdit, AiOutlineZoomIn } from "react-icons/ai";
import { Link} from "react-router-dom";
import { statutToString, statutToStyle } from "../../../utils/StatutUtils";
import decodeToken from "../../../auth/decodeToken";
import { FetchAssignFormateur } from "../../../serverInteraction/FetchFormation";
import useAxiosPrivate from "../../../auth/hooks/useAxiosPrivate";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow
} from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import AffectationFormation from "../../../api/model/AffectationFormation";
import toast from "react-hot-toast";

export interface formation {
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

export interface rowToDisplay{
  open:boolean;
  row:formation;
}

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

function TableAccueil(data: formation[]) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(0);

  const axiosPrivate = useAxiosPrivate();
  const token = decodeToken(localStorage.getItem("accessToken")).decoded;

  const domaineLibelleList = (domaines) => {
    let list = [];
    domaines?.map((domaine) => {
      list.push(domaine.libelle);
    });
    return list;
  };

  const formateurList = (formateurs) => {
    let list = [];
    formateurs?.map((formateur) => {
      list.push(formateur.prenom+" "+formateur.nom.toUpperCase());
    });
    return list;
  };

  data.sort((a, b) => a.id - b.id);

  const checkRoleAsso = () => {
    return token.role === "ROLE_ASSO";
  };

  const checkRoleBn = () => {
    return token.role === "ROLE_BN";
  };

  const checkRoleFormateur = () => {
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

  const handleOpen =(id:number) =>{
    setOpen(id);
  }
  const handleClose =() =>{
    setOpen(0);
  }

  const postAssignFormateur = async (row:formation) => {
    try {
      let affectation = new AffectationFormation();
      affectation.idFormation=row.id;
      affectation.nomUtilisateur=token.sub;
      const response = await FetchAssignFormateur(axiosPrivate,affectation);
      if (response.data.code == 200) {
        data.splice(data.indexOf(row),1);
        console.log("splice : "+ data);
        data.push(JSON.parse(response.data.data));
        toast.success(response.data.message);
      } 
    } catch (err) {
      toast.error(err.response.data.message);
    }
    handleClose()
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
                      {row.nom != null
                        ? row.nom
                        : "Provisoire : " + row.sujet}
                    </TableCell>
                    <TableCell
                      align="center"
                      title={row?.association?.nomComplet}
                    >
                      {row?.association?.nomComplet}
                    </TableCell>
                    <TableCell align="center" hidden={!checkRoleBn()}>
                      {row?.formateurs?.map(
                        (formateur) => formateur.prenom + " " + formateur.nom.toUpperCase()
                      )}
                      {console.log(row)
                      }
                    </TableCell>
                    <TableCell align="center">
                      {row.date == null ? "N/A" : row.date}
                    </TableCell>
                    <TableCell align="center">
                      {checkRoleBn()
                        ? <Link to={"/formation/" + row.id}>
                            <AiOutlineZoomIn className="Icones me-2" />
                          </Link>
                        :<AiOutlineZoomIn className="Icones me-2" onClick={()=>handleOpen(row.id)}/>
                      }
                      <Dialog
                        open={open===row.id}
                        onClose={()=>handleClose()}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                        {row?.nom != null
                        ? row?.nom
                        : "Provisoire : " + row?.sujet}
                        </DialogTitle>
                        <DialogContent>
                          <TableContainer>
                            <Table>
                              <TableBody>
                                <TableRow>
                                  <TableCell>Statut</TableCell>
                                  <TableCell> {statutToString(row?.statut)}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>Cadre</TableCell>
                                  <TableCell> {row?.cadre == null ? "N/A" : row?.cadre}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>Domaine(s)</TableCell>
                                  <TableCell>{domaineLibelleList(row?.domaines).join(", ")}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>Association</TableCell>
                                  <TableCell>{row?.association?.nomComplet}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>Formateurs</TableCell>
                                  <TableCell>{formateurList(row?.formateurs).join(", ")}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>Informations complémentaires</TableCell>
                                  <TableCell>{row?.sujet}</TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </DialogContent>
                        <DialogActions>
                          {
                          row?.formateurs?.some(formateur => formateur.id===token.id)
                          ?<Button onClick={() => postAssignFormateur(row)} hidden={statutToString(row?.statut)==='A_ATTRIBUER'} color="warning">Se retirer de la formation</Button>
                          :<Button onClick={() => postAssignFormateur(row)} hidden={statutToString(row?.statut)==='A_ATTRIBUER'}>S'affecter à la formation</Button>
                          }
                          <Button onClick={()=>handleClose()}>Fermer</Button>
                        </DialogActions>
                      </Dialog>
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


