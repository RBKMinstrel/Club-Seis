import {useNavigate} from 'react-router-dom';
import ActionButton from "./ActionButton";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";

const BackLink = ({double = false, style = {}}) => {

    const navigate = useNavigate();

    const action = () => navigate(double ? -2 : -1);

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
            <FormattedMessage id="project.common.BackLink.title"/>
        </ActionButton>
    );

};

ActionButton.propTypes = {
    style: PropTypes.object,
};

export default BackLink;