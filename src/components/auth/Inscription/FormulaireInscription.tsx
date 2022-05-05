import React, {useEffect, useState} from 'react';
import FormulaireInscriptionBN from './FormulaireInscriptionBN';
import FormulaireInscriptionAsso from './FormulaireInscriptionAsso';
import FormulaireInscriptionFormateur from './FormulaireInscriptionFormateur';
import {useNavigate, useParams} from 'react-router-dom';
import toast from 'react-hot-toast';
import {loader} from "../../../utils/LoaderUtils";
import { PostSignUp } from '../../../serverInteraction/PostSignUp';
import useAxiosPrivate from '../../../auth/hooks/useAxiosPrivate';

const FormulaireInscription = () => {
    const [showFormulaire, setShowFormulaire] = useState(null);
    const [loading, setLoading] = useState(false)
    const {token} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        checktoken();
    }, [])


    const checktoken = async () => {
        setLoading(true)
        try {
            const response = await PostSignUp(useAxiosPrivate(), token);
            setShowFormulaire(response?.data?.message);
        } catch (err) {
            toast.error(err.response.data?.message);
            navigate("/");
        }
        setLoading(false)
    }
    return (
        <>
            {
                loading ?
                    <div className="text-center mt-3">
                        <div className="color-mc fw-bold">Chargement...</div>
                        {loader()}
                    </div>
                    : <></>
            }
            {
                showFormulaire === "ROLE_BN" ? <FormulaireInscriptionBN/> : <></>
            }
            {
                showFormulaire === "ROLE_ASSO" ? <FormulaireInscriptionAsso/> : <></>
            }
            {
                showFormulaire === "ROLE_FORMATEUR" ? <FormulaireInscriptionFormateur/> : <></>
            }
        </>

    );
}
export default FormulaireInscription;
