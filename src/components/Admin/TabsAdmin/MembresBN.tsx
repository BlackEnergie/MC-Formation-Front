import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { membreBureauNationalUserInfo } from "../Admin";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  CancelOutlined,
  CheckCircleOutline,
} from "@mui/icons-material";

interface Props {
  membresBN: membreBureauNationalUserInfo[];
  isActifChange: (id: number) => boolean;
}

const MembresBN = (props: Props) => {
  const utilisateurs: membreBureauNationalUserInfo[] = props.membresBN;
  const [liveness, setLiveness] = useState(0);
    return (
        <>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Poste</TableCell>
                <TableCell align="center">Nom Utilisateur</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {utilisateurs?.map((utilisateur: membreBureauNationalUserInfo) => {
                return (
                  <TableRow key={utilisateur.id}>
                    <TableCell align="center">{utilisateur.poste}</TableCell>
                    <TableCell align="center">
                      {utilisateur.nomUtilisateur}
                    </TableCell>
                    <TableCell align="center">{utilisateur.email}</TableCell>
                    <TableCell align="center">
                      <LoadingButton
                        title={
                          utilisateur.actif
                            ? "Désactiver le compte"
                            : "Activer le compte"
                        }
                        variant="outlined"
                        color={utilisateur.actif ? "success" : "error"}
                        loading={utilisateur.loading}
                        onClick={() => {
                            utilisateur.loading = !utilisateur.loading
                          utilisateur.actif = props.isActifChange(utilisateur.id) ? utilisateur.actif : !utilisateur.actif;
                          setLiveness(liveness + 1);
                          utilisateur.loading = !utilisateur.loading
                        }}
                        endIcon={
                          utilisateur.actif ? (
                            <CheckCircleOutline color="success" />
                          ) : (
                            <CancelOutlined color="error" />
                          )
                        }
                      >
                        {utilisateur.actif ? "Activé" : "Désactivé"}
                      </LoadingButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </>
      );
};

    
export default MembresBN;
