import {useNavigate} from 'react-router-dom';
import ActionButton from "./ActionButton";
import PropTypes from "prop-types";

const BackLink = ({style = {}}) => {

    const navigate = useNavigate();

    const action = () => navigate(-1);

    return (
        <ActionButton
            htmlType="button"
            type="secondary"
            onClick={action}
            style={style}
        >
            <span
                style={{color: "white", fontSize: '15px', paddingRight: 5}}
                className="fa-solid fa-angle-left"
            />
            Regresar
        </ActionButton>
    );

};

ActionButton.propTypes = {
    style: PropTypes.object,
};

export default BackLink;