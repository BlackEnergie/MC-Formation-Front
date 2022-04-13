import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <section>
            <h1>Cette route n'existe pas</h1>
            <br />
            <div className="flexGrow">
                <button onClick={goBack}>Go back</button>
            </div>
        </section>
    )
}

export default Unauthorized;