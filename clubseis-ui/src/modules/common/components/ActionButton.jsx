import React from 'react';
import PropTypes from 'prop-types';
import './ActionButton.css';

const ActionButton = ({
                          onClick = () => {
                          }, children, type, htmlType = 'button', style = {}
                      }) => {
    return (
        <button
            type={htmlType}
            className={`action-button ${type}`}
            onClick={onClick}
            style={style}
        >
            {children}
        </button>
    );
};

ActionButton.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf(['primary', 'secondary', 'danger', 'warning', 'submit']).isRequired,
    htmlType: PropTypes.oneOf(['button', 'submit', 'reset']),
    style: PropTypes.object,
};

export default ActionButton;
