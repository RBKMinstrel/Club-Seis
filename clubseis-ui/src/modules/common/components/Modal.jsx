import React from 'react';
import './Modal.css';

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

export default Modal;
