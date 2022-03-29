import React, { Component } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { default as ReactSelect,components } from "react-select";

class DemandeFormation extends Component {

    static propTypes = {
    };
    constructor(props){
        super(props);   
        this.state={
            showModalConfirmation:false,
            selectedOption:"",
            sujet:"",
            detailDemande:""
        }
    }

    async creationDemande(){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'React POST Request Example' })
        };
        fetch('', requestOptions)
            .then(response => {
                if(response.ok){
                    window.alert("La demande de formation est créée")
                }else{
                    window.alert("Une erreur est survenue pendant la création de la demande de formation");
                }
            });
    }
    renderModalConfirmation(){
        return(
            <Modal size="md" show={this.state.showModalConfirmation} onHide={()=>this.setState({showModalConfirmation:false})}>
                <Modal.Header>
                    <Modal.Title>Confirmer la demande de formation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        Voulez-vous confirmer la demande de formation ?
                </Modal.Body>
                <Modal.Footer>
                    <Button className="justify-content-center align-items-center" variant="outline-success" size="lg"   onClick={()=> {this.creationDemande();this.setState({showModalConfirmation:false})}}>Valider</Button>{' '}
                    <Button className="justify-content-center align-items-center" variant="outline-danger" size="lg" onClick={()=>this.setState({showModalConfirmation:false})}>Annuler</Button>
                </Modal.Footer>
             </Modal>
            )
        }
    render() {
        return(
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
                {
                this.renderModalConfirmation()
                }
                <Form>
                    <Form.Label htmlFor="inputSujet">Sélectionnez le type de formation</Form.Label>
                    <br></br>
                       {['radio'].map((type) => (
                        <div key={`inline-${type}`} className="mb-3">
                          <Form.Check
                            inline
                            label="Atelier"
                            value="atelier"
                            name="group1"
                            type={type}
                            id={`inline-${type}-1`}
                            onChange={(e)=>this.setState({selectedOption:e.target.value})}
                          />
                          <Form.Check
                            inline
                            label="Formation"
                            value="formation"
                            name="group1"
                            type={type}
                            id={`inline-${type}-2`}
                            onChange={(e)=>this.setState({selectedOption:e.target.value})}
                          />
                        </div>
                      ))}
                       <Form.Group className="mt-3">
                           <Form.Label>Quel(s) serai(en)t les domaines de la formation ?</Form.Label>
                           <Example />
                         </Form.Group><Form.Group className="mt-3">
                           <Form.Label htmlFor="inputSujet">Indiquez le sujet de la formation</Form.Label>
                           <Form.Control type="text" id="inputSujet" placeholder="Ex : Trésorie" value={this.state.sujet} onChange={(e)=>this.setState({sujet:e.target.value})} />
                         </Form.Group><Form.Group className="mt-3">
                           <Form.Label>Ajoutez des détails sur votre demande de formation</Form.Label>
                           <Form.Control as="textarea" rows={5} value={this.state.detailDemande} onChange={(e)=>this.setState({detailDemande:e.target.value})}/>
                        </Form.Group><Button className="mt-3 d-flex" variant="outline-primary" onClick={() => this.setState({ showModalConfirmation: true })}>Valider</Button>
                 </Form>
                </div>
            </div>
            </div>
            )
        }
    }

export default DemandeFormation;


class Example extends Component {
    constructor(props) {
      super(props);
      this.state = {
        optionSelected: null,
        listOptions:[]
      };
    }
    async componentDidMount() {
        this.recuperationDesDomaines();
    }
    async recuperationDesDomaines(){
        fetch('')
            .then(response => response.json())
            .then(data => this.setState({ listOptions: data}));
    }
    handleChange = (selected) => {
      this.setState({
        optionSelected: selected
      });
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
            components={{
              Option
            }}
            placeholder="Ex : Informatique"
            onChange={this.handleChange}
            allowSelectAll={true}
            value={this.state.optionSelected}
          />
        </span>
      );
    }
}

  const Option = (props) => {
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


