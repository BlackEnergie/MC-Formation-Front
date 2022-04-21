import React, {useEffect, useState} from 'react';
import FormulaireInscriptionBN from './FormulaireInscriptionBN';
import FormulaireInscriptionAsso from './FormulaireInscriptionAsso';
import FormulaireInscriptionFormateur from './FormulaireInscriptionFormateur';
import {useNavigate,useParams} from 'react-router-dom';
import toast from 'react-hot-toast';
import useAxiosPrivate from '../../../auth/hooks/useAxiosPrivate';

const FormulaireInscription= () => {
const [showFormulaire, setShowFormulaire] = useState(null);
const axiosPrivate = useAxiosPrivate();
const {token} =useParams();
const navigate = useNavigate();

useEffect(() => {
    checktoken();
}, [])


const checktoken = async () => {
    try {
        const response = await axiosPrivate.post('/auth/signup/checkToken?token='+token, {}); 
        setShowFormulaire(response?.data?.message);
    } catch (err) {
        toast.error(err.response.data?.message);
        navigate("/");
    }
   
}
return (
    <>
        {
            showFormulaire==="ROLE_BN" ? <FormulaireInscriptionBN/> : <></>
        }
        {
            showFormulaire==="ROLE_ASSO" ? <FormulaireInscriptionAsso/> : <></>
        }
        {
            showFormulaire==="ROLE_FORMATEUR" ?<FormulaireInscriptionFormateur/> :<></>
        }
    </>

);
}
export default FormulaireInscription;