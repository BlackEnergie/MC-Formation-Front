import React, {useEffect} from 'react';
import Association from "../api/model/Association";
import Utilisateur from "../api/model/Utilisateur";
import { useState } from 'react';
import Api from '../api/Api';
import Select from 'react-select';
import { withCookies, Cookies } from 'react-cookie';
import FormulaireInscriptionBN from './FormulaireInscriptionBN';
import FormulaireInscriptionAsso from './FormulaireInscriptionAsso';


const [showFormulaireBN, setShowFormulaireBN] = useState("BN");
const [showFormulaireAsso, setShowFormulaireAsso] = useState("ASSO");
const [showFormulaireFormateur, setShowFormulaireFormateur] = useState("FORMATEUR");

{showFormulaireBN ? <FormulaireInscriptionBN /> : null}
{showFormulaireAsso ? <FormulaireInscriptionAsso /> : null}
{showFormulaireFormateur ? <formulaireInscriptionFormateur /> : null}
