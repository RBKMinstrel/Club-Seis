import React from 'react';
import './Modal.css';
import PropTypes from "prop-types";

const Modal = ({isActive, title, children, onClose}) => {
    if (!isActive) {
        return null;
    }

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <div className="modal-head">
                    <h2>{title}</h2>
                    <span
                        onClick={onClose}
                        style={{fontSize: '30px'}}
                        className="fa-solid fa-xmark"
                    />
                </div>
                {children}
            </div>
        </div>
    );
};

Modal.propTypes = {
    isActive: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired
};

export default Modal;
