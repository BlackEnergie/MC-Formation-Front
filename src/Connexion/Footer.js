import React from 'react';
import './Footer.css';
import { withCookies} from 'react-cookie';

function Footer (){
    return(
        <footer className="Footer">
            <div className="footer_div" id="contact_mail">
                <p>Contactez-nous :<br/> <a className="lien_footer" href="mailto:miage.connexion@gmail.com">formations@miage.net</a></p>
            </div>

            <div className="footer_div" id="footer-img">
                <img src={require("../Img/profilblue.png")} alt="logo-mc" id="logo-footer"/>
            </div>

            <div className="footer_div"></div>
        </footer>
    )
}
export default withCookies(Footer);