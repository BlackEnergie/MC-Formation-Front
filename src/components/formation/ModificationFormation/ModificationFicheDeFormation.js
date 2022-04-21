import React, {useState} from 'react';
import Donnee from '../VueDetailleeFormation/json/InformationFicheDeFormation.json';
import {AiFillDelete,AiOutlinePlus} from "react-icons/ai";
import Select from 'react-select';

const optionsType = [
    {value: 'Formation', label: 'Formation'},
    {value: 'Atelier', label: 'Atelier'}
];

const optionsDomaine = [
    {value: "1", label: 'Administratif'},
    {value: "2",label: 'Partenariat'},
    {value: "3",label: 'Communication'},
    {value: "4",label: 'Evenementiel'},
    {value: "5",label: 'Ressources Humaines'},
    {value: "6",label: 'Trésorerie'},
    {value: "7",label: 'Archivage'},
    {value: "8",label: 'Affaires académiques'},
    {value: "9",label: 'Association d\'alumni'}

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
    /*  FIN PARTIE OBJECTIFS PEDAGOGIQUES */


    /*  PARTIE DOMAINES */
    const handleItemDeletedDomaines = (i) => {
        setItemsDomaine(itemsDomaine.filter((item, index) => index !== i));
    }

    const afficherListeDomaines = itemsDomaine.map(
        (item,i) => {
            return (
                <tr key={item.id}>
                    <td>
                        {item.id}
                    </td>
                    <td>
                        <p>{item.libelle}</p>
                    </td>
                    <td className="d-flex justify-content-center">
                        <a onClick={() => handleItemDeletedDomaines(i)}>
                            <AiFillDelete className="Icones"/>
                        </a>
                    </td>
                </tr>
            );
        }
    )
    const handleAjoutDomaines = () =>{
        console.log(messageDomaine);
        console.log(itemsDomaine);
        if (messageDomaine !=="")
            setItemsDomaine(
                itemsDomaine => [...itemsDomaine,
                    {id:getMax(itemsDomaine)
                        ,libelle:messageDomaine}
                ]
            );
        setMessageDomaine("");
    }
    /*  FIN PARTIE DOMAINES */



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
                                        <th className="d-flex justify-content-center">Action</th>
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
                                        <th className="d-flex justify-content-center">Action</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                        {afficherListeDomaines}
                                            <tr key="123059">
                                                <td>#</td>
                                                <td>
                                                    <Select
                                                        isClearable
                                                        value={messageDomaine}
                                                        placeholder="Ex: Administratif"
                                                        onChange={setMessageDomaine }
                                                        options={optionsDomaine}
                                                    />
                                                </td>
                                                <td className="d-flex justify-content-center">
                                                    <button
                                                        type="submit" className="btn btn-sm  btn-outline-mc"
                                                        onClick = {() => handleAjoutDomaines()}>
                                                        <AiOutlinePlus className="Icones"/>
                                                    </button>
                                                </td>
                                            </tr>
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
