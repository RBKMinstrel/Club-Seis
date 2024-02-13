import {useNavigate} from 'react-router-dom';

const BackLink = () => {

    const navigate = useNavigate();

    return (

        <button type="button"
                onClick={() => navigate(-1)}>

            Regresar

        </button>

    );

};

export default BackLink;