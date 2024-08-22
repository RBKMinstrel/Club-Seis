import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {ActionButton, Errors} from '../../common';
import * as actions from '../actions';
import * as selectors from '../selectors';
import {FormattedMessage} from "react-intl";

const ChangePassword = () => {

    const user = useSelector(selectors.getUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [backendErrors, setBackendErrors] = useState(null);
    const [passwordsDoNotMatch, setPasswordsDoNotMatch] = useState(false);

    let form;
    let confirmNewPasswordInput;

    const handleSubmit = event => {

        event.preventDefault();

        if (form.checkValidity() && checkConfirmNewPassword()) {

            dispatch(actions.changePassword(user.id, oldPassword, newPassword,
                () => navigate('/gestion'),
                errors => setBackendErrors(errors)));

        } else {

            setBackendErrors(null);

        }

    }

    const checkConfirmNewPassword = () => {

        if (newPassword !== confirmNewPassword) {

            confirmNewPasswordInput.setCustomValidity('error');
            setPasswordsDoNotMatch(true);

            return false;

        } else {
            return true;
        }

    }

    const handleConfirmNewPasswordChange = event => {

        confirmNewPasswordInput.setCustomValidity('');
        setConfirmNewPassword(event.target.value);
        setPasswordsDoNotMatch(false);

    }

    return (
        <div>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <div>
                <form ref={node => form = node}
                      noValidate onSubmit={e => handleSubmit(e)}
                      style={{display: "flex", flexDirection: "column", alignItems: "center", gap: 10}}
                >
                    <div style={{display: "flex", flexDirection: "column", gap: 8}}>
                        <label htmlFor="oldPassword">
                            <FormattedMessage id="project.user.ChangePassword.previousPassword"/>:
                        </label>
                        <input type="password" id="oldPassword"
                               value={oldPassword}
                               onChange={e => setOldPassword(e.target.value)}
                               autoFocus
                               required/>
                    </div>
                    <div style={{display: "flex", flexDirection: "column", gap: 8}}>
                        <label htmlFor="newPassword">
                            <FormattedMessage id="project.user.ChangePassword.newPassword"/>:
                        </label>
                        <input type="password" id="newPassword"
                               value={newPassword}
                               onChange={e => setNewPassword(e.target.value)}
                               required/>
                    </div>
                    <div style={{display: "flex", flexDirection: "column", gap: 8}}>
                        <label htmlFor="confirmNewPassword">
                            <FormattedMessage id="project.user.ChangePassword.repeatPassword"/>:
                        </label>
                        <input ref={node => confirmNewPasswordInput = node}
                               type="password" id="confirmNewPassword"
                               value={confirmNewPassword}
                               onChange={e => handleConfirmNewPasswordChange(e)}
                               required/>
                    </div>
                    <ActionButton
                        type="primary"
                        htmlType="submit"
                    >
                        <FormattedMessage id="project.global.fields.save"/>
                    </ActionButton>
                </form>
            </div>
        </div>
    );

}

export default ChangePassword;