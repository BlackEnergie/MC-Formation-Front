import React from 'react';
import Select from 'react-select';

const optionsStatut = [
  { value: 'passee', label: 'Passée' },
  { value: 'a_venir', label: 'A venir' },
  { value: 'termine', label: 'Terminé' },
];

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
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
  
  render() {
    const { selectedOption,selectedOptionStatut } = this.state;
    return (
        <>
            <label><u>Statut</u></label>
            <Select
                value={selectedOptionStatut}
                onChange={this.handleChangeStatut}
                options={optionsStatut}
                placeholder="Ex : Passée "
                isMulti
            />
            <label><u>Domaine</u></label>
            <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={options}
                placeholder="Ex : Audit-Qualité "
                isMulti
                isSearchable
            />
            <label><u>Formateur</u></label>
            <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={options}
                placeholder=""
                isMulti
                isSearchable

            />
            <label><u>Cadre</u></label>
            <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={options}
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