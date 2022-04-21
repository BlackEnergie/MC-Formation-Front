import React, {useState} from 'react';
import Donnee from '../VueDetailleeFormation/json/InformationFicheDeFormation.json';
import {AiFillDelete,AiOutlinePlus} from "react-icons/ai";
import Select from 'react-select';

const optionsType = [
    {value: 'Formation', label: 'Formation'},
    {value: 'Atelier', label: 'Atelier'}
];


const AfficherBesoinsMaterielsFormation = Donnee.data[0].BesoinsMaterielsFormation.map(
    (info) => {
        return (
            <tr key={info.id}>
                <td></td>
                <td>{info.nom}</td>
            </tr>
        )
    }
)

const AfficherobjetsPedagogiques = Donnee.data[0].objetsPedagogiques.map(
    (info) => {
        return (
            <tr key={info.id} title={info.BesoinMater}>
                <td>{info.id}</td>
                <td>{info.objet}</td>
            </tr>
        )
    }
)

const AfficherDataDomaine = Donnee.data[0].domaines.map(
    (info) => {
        return (
            <tr key={info.code} title={info.description}>
                <td>{info.code}</td>
                <td>{info.libelle}</td>
            </tr>
        )
    }
)

function ModificationFicheDeFormation() {
    const [selectedType, setSelectedType] = useState();
    const [messageObjPedagogique, setMessageObjPedagogique] = useState("");
    const [itemsObjPedagogique, setItemsObjPedagogique] = useState(Donnee.data[0].objetsPedagogiques);
    const [messageDomaine, setMessageDomaine] = useState("");
    const [itemsDomaine, setItemsDomaine] = useState(Donnee.data[0].domaines);


    function getMax(list){
        let cpt=1;
        console.log(list);
        list.forEach(val=>{
            if(val.id>cpt){
                cpt=val.id
            }
        })
        cpt++;
        return cpt;
    }

    /*  PARTIE TYPE */
    const AfficherType = () => {
        return (
            <Select
                isClearable
                value={selectedType}
                defaultValue={Donnee.data[0].type ? {label: Donnee.data[0].type, value: Donnee.data[0].type} : null}
                placeholder="Ex: Formation"
                onChange={setSelectedType}
                options={optionsType}
            />
        )
    }
    /*  FIN PARTIE TYPE */


    /*  PARTIE OBJECTIFS PEDAGOGIQUES*/
    const handleItemDeletedObjPedagogique = (i) => {
        setItemsObjPedagogique(itemsObjPedagogique.filter((item, index) => index !== i));
    }

    const afficherListePedagogique = itemsObjPedagogique.map(
        (item,i ) => {
            return (
                <tr key={i}>
                    <td>
                        {item.id}
                    </td>
                    <td>
                        <p>{item.objet}</p>
                    </td>
                    <td className="d-flex justify-content-center">
                        <a onClick={() => handleItemDeletedObjPedagogique(i)}>
                            <AiFillDelete className="Icones"/>
                        </a>
                    </td>
                </tr>
            );
        }
    )
    const handleAjoutObjPedagogique = () =>{
        if (messageObjPedagogique !=="")
            setItemsObjPedagogique(
                itemsObjPedagogique => [...itemsObjPedagogique,
                                                {id:getMax(itemsObjPedagogique)
                                                ,objet:messageObjPedagogique}
                                            ]
            );
            setMessageObjPedagogique("");
    }
    /* FIN PARTIE OBJECTIFS PEDAGOGIQUES */





    return (
        <div className="container-fluid">
            <div className="container shadow p-4 mb-3 bg-white rounded">
                <div className="row">

                    <div className="col-6 ">
                        <div className=" d-flex flex-row mt-2">
                                <h3 className="align-middle me-4">Type</h3>
                                <AfficherType/>
                        </div>
                    </div>

                    <div className="col-6">
                        <h3 className="mt-2">
                            Objectifs pédagogiques
                        </h3>

                        <div className="container">
                            <div className="table-wrapper">
                                <table className="table table-striped mt-2">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Objectif</th>
                                        <th className="d-flex justify-content-center">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {afficherListePedagogique}
                                        <tr>

                                                <td>#</td>
                                                <td>
                                                    <input
                                                        onKeyPress={e => e.key === 'Enter' && handleAjoutObjPedagogique() }
                                                        type="text"
                                                        value={messageObjPedagogique}
                                                        onChange={(e) => setMessageObjPedagogique(e.target.value) }
                                                    />

                                                </td>
                                                <td className="d-flex justify-content-center">
                                                    <button
                                                        type="submit" className="btn btn-sm  btn-outline-mc"
                                                        onClick = {() => handleAjoutObjPedagogique()}>
                                                        <AiOutlinePlus className="Icones"/>
                                                    </button>
                                                </td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="container shadow p-4 mb-3 bg-white rounded">
                <div className="row">
                    <div className="col-6">
                        <h3 className="mt-2">
                            Domaines
                        </h3>
                        <div className="container">
                            <div className="table-wrapper">
                                <table className="table table-striped mt-2">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nom</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {AfficherDataDomaine}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="row d-flex justify-content-between">
                            <h3>
                                Besoins matériel
                            </h3>
                        </div>
                        <div className="container">
                            <div className="table-wrapper tableFixHead">
                                <table className="table table-striped mt-2">
                                    <thead>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {AfficherBesoinsMaterielsFormation}
                                    </tbody>

                                </table>
                            </div>
                        </div>

                    </div>
                </div>

            </div>


        </div>
    );
}

export default ModificationFicheDeFormation;
