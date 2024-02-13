import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {Errors} from '../../common';
import * as actions from '../actions';
import * as selectors from '../selectors';

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
                <h5>
                    Cambiar contraseña
                </h5>
                <div>
                    <form ref={node => form = node}
                          noValidate onSubmit={e => handleSubmit(e)}>
                        <div>
                            <label htmlFor="oldPassword">
                                Anterior contraseña
                            </label>
                            <div>
                                <input type="password" id="oldPassword"
                                       value={oldPassword}
                                       onChange={e => setOldPassword(e.target.value)}
                                       autoFocus
                                       required/>
                                <div>
                                    Campo obligatorio
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="newPassword">
                                Nueva contraseña
                            </label>
                            <div>
                                <input type="password" id="newPassword"
                                       value={newPassword}
                                       onChange={e => setNewPassword(e.target.value)}
                                       required/>
                                <div>
                                    Campo obligatorio
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="confirmNewPassword">
                                Repita la contraseña
                            </label>
                            <div>
                                <input ref={node => confirmNewPasswordInput = node}
                                       type="password" id="confirmNewPassword"
                                       value={confirmNewPassword}
                                       onChange={e => handleConfirmNewPasswordChange(e)}
                                       required/>
                                <div>
                                    {passwordsDoNotMatch ?
                                        <p> Contraseña no coincide </p> :
                                        <p> Campo requerido </p>}

                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <button type="submit">
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

}

export default ChangePassword;