import React, {Component} from 'react';
import Select from 'react-select';
import './InformationsGeneralesFormation.css';
import TableFormateur from './TableVueDetaillee/TableFormateur';
import TableAssociation from './TableVueDetaillee/TableAssociation';
import TableDomaine from './TableVueDetaillee/TableDomaine';
import TableInformationsGenerales from './TableVueDetaillee/TableInformationsGénérales'

const optionsStatut = [
    { value: 'passee', label: 'Passée' },
    { value: 'a_venir', label: 'A venir' },
    { value: 'passee', label: 'Passée' },
    { value: 'demande', label: 'Demandée' },
  ];
const optionsType = [
    { value: 'atelier', label: 'Atelier' },
    { value: 'formation', label: 'Formation' },
  ];
const optionsCadre = [
    { value: 'spring', label: 'SPRING' },
    { value: 'mic', label: 'MIC' },
    { value: 'winter', label: 'WINTER' },
    { value: 'cdh', label: 'CDH' },
    { value: 'ponctuelle', label: 'Ponctuelle' },
  ];

const InformationsGeneralesFormation = () =>{

    return (
        <div className="col">

            {/* Conteneur Info Domaines */}
            <div className="container shadow p-4 mb-3 bg-white rounded">
                <div className="row">
                    {/* Conteneur Informations générales */}
                    <div className="col-6">
                        <div className="row d-flex justify-content-between">
                            <h3><u>
                                Informations Générales
                            </u></h3>
                        </div>
                        <div className="container">
                            <TableInformationsGenerales/>
                        </div>
                    </div>

                    {/* Conteneur Domaines */}
                    <div className="col-6">
                        <div className="row d-flex justify-content-between">
                            <h3><u>
                                Domaine(s)
                            </u></h3>
                        </div>

                        {/* Table Domaine */}
                        <div className="container">
                            <div className="table-wrapper">
                                <TableDomaine/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Conteneur Formateur Association */}
            <div className="container shadow p-4 mb-3 bg-white rounded">
                <div className="row">

                    {/* Conteneur Formateur */}
                    <div className="col-6">
                        <div className="row d-flex justify-content-between">
                            <h3><u>
                                Formateur(s)
                            </u></h3>
                        </div>

                        {/* Table Formateur */}
                        <div className="container">
                            <div className="table-wrapper">
                                <TableFormateur/>
                            </div>
                        </div>
                    </div>

                    {/* Conteneur Association */}
                    <div className="col-6">
                        <div className="row d-flex justify-content-between">
                            <h3><u>
                                Association(s)
                            </u></h3>
                        </div>

                        {/* Table Association */}
                        <div className="container">
                            <div className="table-wrapper">
                                <TableAssociation/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default InformationsGeneralesFormation;