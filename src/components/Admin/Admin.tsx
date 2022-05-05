import React, {useState} from 'react';
import axios, { axiosPrivate } from '../../api/axios'
import toast from 'react-hot-toast';
import {loader} from "../../utils/LoaderUtils";
import {FaRegPaperPlane} from "react-icons/fa";
import Select from "react-select";
import {Link} from "react-router-dom";
import {AiOutlineRollback} from "react-icons/ai";
import { PostMailSingUp } from '../../serverInteraction/PostAdmin';
import useAxiosPrivate from '../../auth/hooks/useAxiosPrivate';

const Admin = () => {

    const [email, setMail] = useState('');
    const [hasUnfilled, setHasUnfilled] = useState({email: ""});
    const [selectRole, setSelectRole] = useState({value: "ROLE_FORMATEUR", label: "Formateur"});
    const [loading, setLoading] = useState(false)

    const axiosPrivate = useAxiosPrivate()

    const optionsRole = [
        {value: "ROLE_FORMATEUR", label: "Formateur"},
        {value: "ROLE_ASSO", label: "Association"},
        {value: "ROLE_BN", label: "Membre du Bureau National"}
    ]

    const handleSubmit = async () => {
        try {
            setLoading(true)
            const role = selectRole.value;
            const response = await PostMailSingUp(axiosPrivate, email, role)
            toast.success(response.data.message);
        } catch (err) {
            toast.error(err.response.data.message);
        }
        setLoading(false);
    }

    const validate = (e) => {
        e.preventDefault();
        let hasUnfilled = {email: ""};
        let isValid = true;
        if (!email) {
            isValid = false;
            hasUnfilled["email"] = "Renseigner l'adresse mail.";
        }
        if (isValid) {
            handleSubmit();
        } else {
            setHasUnfilled(hasUnfilled);
        }
    }

    return (
        <>
            <div className="col-2 position-absolute">
                <Link to="/" id="linkAccueil">
                    <button type="button" id="buttonArriere"
                            className="btn btn-primary d-flex align-items-center">
                        <AiOutlineRollback className="Icones me-2"/>
                        Revenir à l'accueil
                    </button>
                </Link>
            </div>
            <div className="col">
                <div className="container shadow p-4 mb-3 bg-white rounded">
                    <div className="row">
                        <div className="col">
                            <div className="row d-flex justify-content-between">
                                <h3>Inviter des membres</h3>
                            </div>
                            <form className="row">
                                <div className="col">
                                    <label className="form-label fw-bold mb-2 mt-2">Adresse mail</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={event => setMail(event.target.value)}
                                        className="form-control"
                                        placeholder="Ex : prenom@gmail.com"
                                        id="email"/>
                                    <div className="text-danger">{hasUnfilled.email}</div>
                                </div>
                                <div className="col">
                                    <label className="form-label fw-bold mb-2 mt-2">Rôle</label>
                                    <Select
                                        value={selectRole}
                                        onChange={(option) => {
                                            setSelectRole(option);
                                        }}
                                        options={optionsRole}
                                    />
                                </div>
                                <div className="col-2">
                                    <label></label>
                                    <div>
                                        <button type="submit" value="Inviter" className="btn btn-mc mt-3"
                                                onClick={validate}>
                                            <FaRegPaperPlane className="Icones text-white"/>
                                        </button>
                                    </div>
                                </div>
                                <div className="col-1 text-start">
                                    <label></label>
                                    <div className="mt-3">
                                        {loading ? loader() : <></>}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}


export default Admin;
