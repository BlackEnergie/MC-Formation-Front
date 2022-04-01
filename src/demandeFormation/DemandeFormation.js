import React, {Component} from 'react';
import {components, default as ReactSelect} from "react-select";
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Domaine from "../api/model/Domaine";
import Demande from "../api/model/Demande";
import Api from "../api/Api";

class DemandeFormation extends Component {
    constructor() {
        super();
        this.state = {
            input: {},
            errors: {},
            showModalConfirmation: false
        };
        this.ChildElement = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let input = this.state.input;
        input[event.target.name] = event.target.value;
        this.setState({
            input
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.showModalConfirmation) {
            let demande = this.mapFormToDemande();
            Api.postDemande(demande).then(
                res => console.log(res)
            );

        }
    }

    mapFormToDemande(): Demande {
        let childElement = this.ChildElement.current;
        let input = this.state.input;
        let demande = new Demande();
        demande.date = Date.now();
        demande.sujet = input["sujet"];
        demande.detail = input["detail"];
        let domaines = [];
        childElement.state.optionSelected.forEach(instance => {
            let domaine = new Domaine();
            domaine.code = instance.value;
            domaine.libelle = instance.label;
            domaines.push(domaine);
        })
        demande.domaines = domaines;
        return demande;
    }

    resetForm() {
        let childElement = this.ChildElement.current;
        let input = {};
        childElement.setState({optionSelected: null});
        input["sujet"] = "";
        input["detail"] = "";
        this.setState({input: input});
    }

    validate() {
        let childElement = this.ChildElement.current;
        let input = this.state.input;
        let errors = {};
        let isValid = true;

        if (!input["sujet"]) {
            isValid = false;
            errors["sujet"] = "Renseigner un sujet.";
        }
        if (!input["detail"]) {
            isValid = false;
            errors["detail"] = "Renseigner les détails de la demande.";
        }
        if (childElement.state.optionSelected === null || childElement.state.optionSelected.length === 0) {
            isValid = false;
            errors["domaines"] = "Renseigner au moins un domaine.";
        }
        this.setState({
            errors: errors
        });
        if (isValid) {
            this.setState({showModalConfirmation: true})
        }
        return isValid;
    }

    renderModalConfirmation() {
        return (
            <Modal size="md" show={this.state.showModalConfirmation}
                   onHide={() => this.setState({showModalConfirmation: false})}>
                <Modal.Header>
                    <Modal.Title>Confirmer la demande de formation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Voulez-vous confirmer la demande de formation ?
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" className="justify-content-center align-items-center"
                            variant="outline-success" size="lg" onClick={(e) => {
                        this.handleSubmit(e);
                        this.setState({showModalConfirmation: false})
                    }}>Valider</Button>{' '}
                    <Button className="justify-content-center align-items-center" variant="outline-danger" size="lg"
                            onClick={() => this.setState({showModalConfirmation: false})}>Annuler</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    render() {
        return (
            <div class="DemandeFormation">
                {this.renderModalConfirmation()}
                <div class="row justify-content-md-center  mt-3">
                    <div class="col col-lg-5 border border-dark">
                        <h1 class="justify-content-center align-items-center">
                            <u>DEMANDE DE FORMATION</u>
                        </h1>
                    </div>
                </div>
                <div class="row justify-content-md-center  mt-3">
                    <div class="col col-lg-5">
                        <form>
                            <div class="form-group">
                                <label for="name" class="mt-2 mb-2">Indiquez le ou les domaines de formation ?</label>
                                <Select ref={this.ChildElement}/>
                                <div class="text-danger">{this.state.errors.domaines}</div>
                            </div>
                            <div class="form-group">
                                <label for="sujet" class="mt-2">Indiquez le sujet de la formation</label>
                                <input
                                    type="text"
                                    name="sujet"
                                    value={this.state.input.sujet}
                                    onChange={this.handleChange}
                                    class="form-control mt-2"
                                    placeholder="Ex : Trésorie"
                                    id="email"/>
                                <div class="text-danger">{this.state.errors.sujet}</div>
                            </div>
                            <div class="form-group">
                                <label for="detail" class="mt-2">Ajoutez des détails sur votre demande de
                                    formation</label>
                                <textarea
                                    name="detail"
                                    value={this.state.input.detail}
                                    onChange={this.handleChange}
                                    placeholder="Date, déroulement, pré-requis, ..."
                                    class="form-control mt-2"
                                    rows="7"/>
                                <div class="text-danger">{this.state.errors.detail}</div>
                            </div>
                            <div class="row mt-2 justify-content-center align-items-center">
                                <div class="col col-lg-2">
                                    <input type="button" value="Valider" class="btn btn-primary" onClick={() => {
                                        this.validate()
                                    }}/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default DemandeFormation;

class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {
            optionSelected: null,
            listOptions: [
                {value: '1', label: 'Chocolate'},
                {value: '2', label: 'Strawberry'},
                {value: '3', label: 'Vanilla'}
            ]
        };
    }

    async componentDidMount() {
        this.recuperationDesDomaines();
    }

    handleChange = (selected) => {
        this.setState({
            optionSelected: selected
        });
    };

    option = (props) => {
        return (
            <div>
                <components.Option {...props}>
                    <input
                        type="checkbox"
                        checked={props.isSelected}
                        onChange={() => null}
                    />{" "}
                    <label>{props.label}</label>
                </components.Option>
            </div>
        );
    };

    render() {
        return (
            <span
                data-toggle="popover"
                data-trigger="focus"
                data-content="Domaines de formation"
            >
        <ReactSelect
            options={this.state.listOptions}
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={this.option}
            placeholder="Ex : Informatique"
            onChange={this.handleChange}
            allowSelectAll={true}
            value={this.state.optionSelected}
        />
      </span>
        );
    }
}

