import React, {Component} from 'react';

class Nom extends Component {
    render(){
        return(
            <div>
                {this.props.nom}
            </div>
        )
    }
};

class NamesContainer extends Component{
    render(){
        return(
            <div>
                {this.props.noms.map(nom => <Nom nom = {nom}/>)}
            </div>
        )
    }
};

class InformationsGeneralesFormation extends Component {





    state={
        noms :[
            "Alex",
            "Barbara",
            "Carla",
            "Diego",
            "Elena",
            "Fiona",
            "Giovanni",
            "Hiena",
            "Leonardo"
        ],
        searchTerm:''
    }

    editSearchTerm = (e) =>{
        this.setState({searchTerm : e.target.value})
    };

    dynamicSearch = () => {
        return this.state.noms.filter(nom => nom.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
    };



    render() {
        return (
            <div className="col">
                <div className="container shadow p-4 mb-3 bg-white rounded">
                    <h3><u>
                        Informations générales
                    </u></h3>

                    <div className="row">
                        <h4>
                            Statut
                        </h4>
                        <p className="ms-4">
                            <span>Formation à attribuer</span>
                        </p>
                    </div>

                    <div className="row">
                        <h4>
                            Cadre
                        </h4>
                        <p className="ms-4">
                            <span>Winter</span>
                        </p>
                    </div>

                    <div className="row">
                        <h4>
                            Type
                        </h4>
                        <p className="ms-4">
                            <span>Atelier</span>
                        </p>
                    </div>

                    <div className="row">
                        <h4>
                            Date
                        </h4>
                        <p className="ms-4">
                            <span>27/08/1996</span>
                        </p>
                    </div>

                </div>

                <div className="container shadow p-4 mb-3 bg-white rounded">
                    <div className="row d-flex justify-content-between">
                        <div className="col-10">
                            <h3><u>
                                Domaine(s)
                            </u></h3>
                        </div>
                        <div className="col-2">
                            <a href="#addEmployeeModal" className="btn btn-success " data-toggle="modal">
                                <img src={require('../Img/plus.png')} className="Icones me-3"/>
                                <span>Rajouter</span>
                            </a>
                        </div>

                    </div>
                    <div className="container">
                        <p>
                            TEST
                        </p>

                        <input type="text" value={this.state.searchTerm} onChange={this.editSearchTerm} placeholder={"Tapez le nom"}/>
                        <p>voici les noms</p>
                        <NamesContainer noms = {this.dynamicSearch()}/>
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

                <div className="container shadow p-4 mb-3 bg-white rounded">
                    <div className="row d-flex justify-content-between">
                        <div className="col-10">
                            <h3><u>
                                Formateur(s)
                            </u></h3>
                        </div>
                        <div className="col-2">
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

                <div className="container shadow p-4 mb-3 bg-white rounded">
                    <div className="row d-flex justify-content-between">
                        <div className="col-10">
                            <h3><u>
                                Association(s)
                            </u></h3>
                        </div>
                        <div className="col-2">
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
    )
    }

    }

    export default InformationsGeneralesFormation;