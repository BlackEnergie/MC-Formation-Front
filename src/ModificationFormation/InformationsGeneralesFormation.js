import React, {Component} from 'react';
import Select from 'react-select';
import './InformationsGeneralesFormation.css';

const optionsStatut = [
    { value: 'passee', label: 'Passée' },
    { value: 'a_venir', label: 'A venir' },
    { value: 'termine', label: 'Terminée' },
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

class Filtres extends React.Component {
    state = {
      selectedOption: null,
      selectedOptionStatut: null
    };
    handleChange = (selectedOption) => {
      this.setState({ selectedOption }, () =>
        console.log(`Option selected:`, this.state.selectedOption)
      );
    };  
    handleChangeStatut = (selectedOptionStatut) => {
      this.setState({ selectedOptionStatut }, () =>
        console.log(`Option selected:`, this.state.selectedOptionStatut)
      );
    };
  }


class InformationsGeneralesFormation extends Component {


    state={
    }

    render() {
        const { selectedOption,selectedOptionStatut } = this.state;
        return (
            <div className="col">
                <div className="container shadow p-4 mb-3 bg-white rounded">
                <div className="row">
                    <div className="col-6">
                    <h3><u>
                        Informations générales
                    </u></h3>
                    <div className="row">
                        <h4>
                            Statut
                        </h4>
                        <p className="ms-4">
                            <Select
                                value={selectedOption}
                                onChange={this.handleChangeStatut}
                                options={optionsStatut}
                                placeholder="Statut"
                            />
                        </p>
                    </div>

                    <div className="row">
                        <h4>
                            Cadre
                        </h4>
                        <p className="ms-4">
                            <Select
                                value={selectedOption}
                                onChange={this.handleChangeStatut}
                                options={optionsCadre}
                                placeholder="Cadre"
                            />
                        </p>
                    </div>

                    <div className="row">
                        <h4>
                            Type
                        </h4>
                        <p className="ms-4">
                            <Select
                                value={selectedOption}
                                onChange={this.handleChangeStatut}
                                options={optionsType}
                                placeholder="Type"
                            />
                        </p>
                    </div>

                    <div className="row">
                        <h4>
                            Date
                        </h4>
                        <p className="ms-4">
                            <input type="date" className="form-control"></input>
                        </p>
                    </div>
                    </div>

                    <div className="col-6">
                    <div className="row d-flex justify-content-between">
                        <div className="col-9">
                            <h3><u>
                                Domaine(s)
                            </u></h3>
                        </div>
                        <div className="col-3">
                            <a href="#addEmployeeModal" className="btn btn-success " data-toggle="modal">
                                <img src={require('../Img/plus.png')} className="Icones me-3"/>
                                <span>Rajouter</span>
                            </a>
                        </div>

                    </div>

                    <div className="container">
                        <div className="table-wrapper">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nom du domaine</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Ressources humaines</td>
                                        <td>
                                            <a href="#editEmployeeModal" className="edit" data-toggle="modal">
                                                <img src={require('../Img/delete.png')} className="Icones"/>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Administration</td>
                                        <td>
                                            <a href="#editEmployeeModal" className="edit" data-toggle="modal">
                                                <img src={require('../Img/delete.png')} className="Icones"/>
                                            </a>
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
                    <div className="row d-flex justify-content-between">
                        <div className="col-9">
                            <h3><u>
                                Formateur(s)
                            </u></h3>
                        </div>
                        <div className="col-3">
                            <a href="#addEmployeeModal" className="btn btn-success " data-toggle="modal">
                                <img src={require('../Img/plus.png')} className="Icones me-3"/>
                                <span>Rajouter</span>
                            </a>
                        </div>

                    </div>

                    <div className="container">
                        <div className="table-wrapper">
                            <table className="table table-striped table-hover">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nom du formateur</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Théo Perrin</td>
                                    <td>
                                        <a href="#editEmployeeModal" className="edit" data-toggle="modal">
                                            <img src={require('../Img/delete.png')} className="Icones"/>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Maxence Tauzin</td>
                                    <td>
                                        <a href="#editEmployeeModal" className="edit" data-toggle="modal">
                                            <img src={require('../Img/delete.png')} className="Icones"/>
                                        </a>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="col-6">
                    <div className="row d-flex justify-content-between">
                        <div className="col-9">
                            <h3><u>
                                Association(s)
                            </u></h3>
                        </div>
                        <div className="col-3">
                            <a href="#addEmployeeModal" className="btn btn-success " data-toggle="modal">
                                <img src={require('../Img/plus.png')} className="Icones me-3"/>
                                <span>Rajouter</span>
                            </a>
                        </div>

                    </div>

                        <div className="table-wrapper">
                            <table className="table table-striped table-hover">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nom de l'association</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Association MIAGE Bordeaux</td>
                                    <td>
                                        <a href="#editEmployeeModal" className="edit" data-toggle="modal">
                                            <img src={require('../Img/delete.png')} className="Icones"/>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Junior Miage Concept Bordeaux</td>
                                    <td>
                                        <a href="#editEmployeeModal" className="edit" data-toggle="modal">
                                            <img src={require('../Img/delete.png')} className="Icones"/>
                                        </a>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    }

    }

    export default InformationsGeneralesFormation;