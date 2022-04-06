import { render, screen } from '@testing-library/react';
import Header from './Connexion/Header'


test('renders learn react link', () => {
    render(<Header />);
    const textConnecter = screen.getByText("Connecter");
    expect(textConnecter).toBeInTheDocument();

    const textMCFormation = screen.getByText("MC Formation");
    expect(textMCFormation).toBeInTheDocument();

    const logoConnexion = screen.getByAltText('IconeConnexion');
    expect(logoConnexion).toHaveAttribute('src', 'login.png');


    const logoMc = screen.getByAltText('logoMCBlanc');
    expect(logoMc).toHaveAttribute('src', 'logoblue_bgwht.png');


});
