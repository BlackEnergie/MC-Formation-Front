import React, {Component} from 'react';
import Select from 'react-select';
import Domaine from "../api/model/Domaine";
import Demande from "../api/model/Demande";

let domainesSelected = null;

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

class DemandeFormation extends Component {
    constructor() {
        super();
        this.state = {
            sujet: '', 
            detail: '', 
            errors: {},
        };
        this.ChildElement = React.createRef();
        this.handleChangeDomaines = this.handleChangeDomaines.bind(this);
        this.handleChangeDetail = this.handleChangeDetail.bind(this);
        this.handleChangeSujet = this.handleChangeSujet.bind(this);
        this.validate = this.validate.bind(this);
    }

    handleChangeDomaines(params) {
        domainesSelected = params
        console.log(`Domaines selected:`, domainesSelected)
    }

    handleChangeDetail(event) {
        this.setState({detail: event.target.value});
    }

    handleChangeSujet(event) {
        this.setState({sujet: event.target.value});
    }

    handleSubmit() {
        
        let demande = this.mapFormToDemande();
        console.log("handle submit")
        console.log(demande)
        this.postDemande()
    }

    mapFormToDemande() {
        let demande = new Demande()
        let domaines = []
        demande.date = Date.now();
        demande.sujet = this.state.sujet;
        demande.detail = this.state.detail;
        domainesSelected.forEach(element => {
            let domaine = new Domaine();
            domaine.code = element.value;
            domaine.libelle = element.label;
            domaines.push(domaine);
        })
        demande.domaines = domaines;
        return demande;
    }

    resetForm() {
        let childElement = this.ChildElement.current;
        childElement.setState({optionSelected: null});
        this.setState(
            {domaines: [], sujet: '', detail: '', errors: {}}
            );
    }

    validate() {
        
        let errors = {};
        let isValid = true;
        
        console.log('try reading state')
        console.log(this.state)
        if (!this.state.sujet) {
            isValid = false;
            console.log("sujet unvalidated")
            errors["sujet"] = "Renseigner un sujet.";
        }
        if (!this.state.detail) {
            isValid = false;
            console.log("detail unvalidated")
            errors["detail"] = "Renseigner les détails de la demande.";
        }
        if (!domainesSelected) {
            isValid = false;
            console.log("domaines unvalidated")
            errors["domaines"] = "Renseigner au moins un domaine.";
        }
        this.setState({
            errors: errors
        });

        if (isValid) {
            console.log("validated")
            this.handleSubmit();
        }
    }

    async postDemande() {
        // POST request using fetch with async/await
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'React POST Request Example' })
        };
        const response = await fetch('https://reqres.in/api/posts', requestOptions);
        const data = await response.json();
        console.log(`data: `, data)
    }

    render() {
        return (
            <div className="DemandeFormation">
                <div className="row justify-content-md-center  mt-3">
                    <div className="col col-lg-5 border border-dark">
                        <h1 className="justify-content-center align-items-center">
                            <u>DEMANDE DE FORMATION</u>
                        </h1>
                    </div>
                </div>
                <div className="row justify-content-md-center  mt-3">
                    <div className="col col-lg-5">
                        <form>
                            <div className="form-group">
                                <label htmlFor="name" className="mt-2 mb-2">Indiquez le ou les domaines de formation ?</label>
                                <SelectComp ref={this.ChildElement} handleChangeDomaines={this.handleChangeDomaines.bind(this)}/>
                                <div className="text-danger">{this.state.errors.domaines}</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="sujet" className="mt-2">Indiquez le sujet de la formation</label>
                                <input
                                    type="text"
                                    name="sujet"
                                    value={this.state.sujet}
                                    onChange={this.handleChangeSujet}
                                    className="form-control mt-2"
                                    placeholder="Ex : Trésorie"
                                    id="email"/>
                                <div className="text-danger">{this.state.errors.sujet}</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="detail" className="mt-2">Ajoutez des détails sur votre demande de
                                    formation</label>
                                <textarea
                                    name="detail"
                                    value={this.state.detail}
                                    onChange={this.handleChangeDetail}
                                    placeholder="Date, déroulement, pré-requis, ..."
                                    className="form-control mt-2"
                                    rows="7"/>
                                <div className="text-danger">{this.state.errors.detail}</div>
                            </div>
                            <div className="row mt-2 justify-content-center align-items-center">
                                <div className="col col-lg-2">
                                    <input type="button" value="Valider" className="btn btn-primary" onClick={this.validate}/>
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

class SelectComp extends Component {

    state = {
        selectedOption: null,
    };

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(this.state);
    };

    render() {
        const { selectedOption } = this.state;
        return (
                <Select
                isMulti 
                value={selectedOption || ''}
                onChange={e => this.setState({ selectedOption: e.target.value || null })}
                options={options}
                />
            );
    }

}

