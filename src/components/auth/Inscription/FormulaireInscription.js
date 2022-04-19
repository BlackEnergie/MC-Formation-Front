import React, {useState} from 'react';
import FormulaireInscriptionBN from './FormulaireInscriptionBN';
import FormulaireInscriptionAsso from './FormulaireInscriptionAsso';


const [showFormulaireBN, setShowFormulaireBN] = useState("BN");
const [showFormulaireAsso, setShowFormulaireAsso] = useState("ASSO");
const [showFormulaireFormateur, setShowFormulaireFormateur] = useState("FORMATEUR");

{
    showFormulaireBN ? <FormulaireInscriptionBN/> : null
}
{
    showFormulaireAsso ? <FormulaireInscriptionAsso/> : null
}
{
    showFormulaireFormateur ? <formulaireInscriptionFormateur/> : null
}
