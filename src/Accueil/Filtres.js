import React from 'react';
import Select from 'react-select';

const statuts = [
    { value: 'demandee', label: 'Demandée' },
    { value: 'passee', label: 'A attribuer' },
    { value: 'a_venir', label: 'A venir' },
    { value: 'passee', label: 'Passée' },
];
const domaines=[
  { value: 'tresorerie', label: 'Trésorerie' },
  { value: 'administration', label: 'Administration' },
  { value: 'ressourceshumaines', label: 'Ressources Humaines' },
    { value: 'communication', label: 'Communication' },
    { value: 'partenariat', label: 'Partenariat' },
];
const options=[];
const cadres=[
    { value: 'winter', label: 'Winter' },
    { value: 'spring', label: 'Spring' },
    { value: 'cdh', label: "Congrès d'Hiver" },
    { value: 'jnm', label: 'Journée Nationale Miagiste' },
    { value: 'intensivecamp', label: 'Miage Intesive Camp' },
];

class Filtres extends React.Component {
  state = {
    selectedOptionStatut: null,
    selectedOptionDomaine: null,
    selectedOptionCadre: null,
    selectedOptionFormateur: null,
  };
    handleChangeStatut = (selectedOptionStatut) => {
        this.setState({ selectedOptionStatut }, () =>
          console.log(`Option selected:`, this.state.selectedOptionStatut)
        );
    };
    handleChangeDomaine = (selectedOptionDomaine) => {
        this.setState({ selectedOptionDomaine }, () =>
            console.log(`Option selected:`, this.state.selectedOptionDomaine)
        );
    };
    handleChangeCadre = (selectedOptionCadre) => {
        this.setState({ selectedOptionCadre }, () =>
            console.log(`Option selected:`, this.state.selectedOptionCadre)
        );
    };
    handleChangeFormateur = (selectedOptionFormateur) => {
        this.setState({ selectedOptionFormateur }, () =>
            console.log(`Option selected:`, this.state.selectedOptionFormateur)
        );
    };
  
  render() {
    const { selectedOptionStatut,selectedOptionDomaine,selectedOptionCadre,selectedOptionFormateur } = this.state;
    return (
        <>
            <label><u>Statut</u></label>
            <Select
                value={selectedOptionStatut}
                onChange={this.handleChangeStatut}
                options={statuts}
                placeholder="Ex : Passée "
                isMulti
            />
            <label><u>Domaine</u></label>
            <Select
                value={selectedOptionDomaine}
                onChange={this.handleChangeDomaine}
                options={domaines}
                placeholder="Ex : Audit-Qualité "
                isMulti
                isSearchable
            />
            <label><u>Formateur</u></label>
            <Select
                value={selectedOptionFormateur}
                onChange={this.handleChangeFormateur}
                options={cadres}
                placeholder=""
                isMulti
                isSearchable

            />
            <label><u>Cadre</u></label>
            <Select
                value={selectedOptionCadre}
                onChange={this.handleChangeCadre}
                options={cadres}
                placeholder="Ex : Winter "
                isMulti
            />
            <div>
                <label><u>Début Période</u></label>
                <div>
                <input type="date" className="form-control"></input>
                </div>
            </div>
            <div>
                <label><u>Fin Période</u></label>
                <div>
                <input type="date" className="form-control"></input>
                </div>
            </div>
            <div className="mt-2">
              <button type="button" className="btn btn-primary m-2">Reset</button>
              <button type="button" className="btn btn-primary">Valider</button>
            </div>
      </>
    );
  }
}

export default Filtres;