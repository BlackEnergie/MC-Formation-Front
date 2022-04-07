import { render, screen, fireEvent } from '@testing-library/react';
import Connexion from './Connexion/Connexion';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';


test('renders learn react link', () => {
    render(<Connexion />);

    const logoMc = screen.getByAltText('logo-mc');
    expect(logoMc).toHaveAttribute('src', 'logoblue_bgwht.png');

    const textConnecter = screen.getByText("Connectez-vous à l'espace Formation de MIAGE Connection");
    expect(textConnecter).toBeInTheDocument();

    const InputEmail = screen.getByPlaceholderText ("Email");
    userEvent.type(InputEmail, "MaximeCots");
    //expect(InputEmail).toBeInTheDocument();

    const InputMdp = screen.getByPlaceholderText ("Mot de passe");
    userEvent.type(InputMdp, "test");
    //expect(InputMdp).toBeInTheDocument();
    const BoutonConnexion = screen.getByAltText('buttonConnexion');
    act(() => {    BoutonConnexion.dispatchEvent(new MouseEvent('click', {bubbles: true}));  });

    /*
    fireEvent.click(BoutonConnexion);
    expect(BoutonConnexion).toHaveAttribute('value', 'Se Connecter');*/
    //const textSuccess = screen.getByText("Vous êtes connectés avec le 'ROLE_BN'");
    //const textSuccess = screen.getByText("Vous êtes", {exact:false})
    //expect(textSuccess).toBeInTheDocument();

    const textContactVP = screen.getByText("Entrer en contact avec VP Formation");
    expect(textContactVP).toBeInTheDocument();

});


