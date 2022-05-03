import React from 'react';
import { Link } from "react-router-dom"

const Missing = () => {
    return (
        <article style={{ padding: "100px" }}>
            <h1>Oops!</h1>
            <p>Cette page n'existe pas</p>
            <div className="flexGrow">
                <Link to="/">Retourner à l'accueil</Link>
            </div>
        </article>
    )
}

export default Missing
