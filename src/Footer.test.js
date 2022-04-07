import { render, screen } from '@testing-library/react';
import Footer from './Connexion/Footer'


test('renders learn react link', () => {
    render(<Footer />);
    const text = screen.getByText("Contactez-nous :");
    const textEmail = screen.getByText("formations@miage.net");
    const logoMc = screen.getByRole('img');

    expect(logoMc).toHaveAttribute('src', 'profilblue.png');
    expect(logoMc).toHaveAttribute('alt', 'logo-mc');
    expect(text).toBeInTheDocument();
    expect(textEmail).toBeInTheDocument();


});
