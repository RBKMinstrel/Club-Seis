import {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom';

import {Errors} from '../../common';
import * as actions from '../actions';
import * as selectors from "../selectors";

import RolesSelector from "./RolesSelector.jsx";

const UpdateUser = () => {

    const user = useSelector(selectors.getUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userName, setUserName] = useState(user.userName);
    const [changePassword, setChangePassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [rolesIds, setRolesIds] = useState(user.rolesIds);
    const [backendErrors, setBackendErrors] = useState(null);
    const [passwordsDoNotMatch, setPasswordsDoNotMatch] = useState(false);
    let form;
    let confirmPasswordInput;

    const handleSubmit = event => {

        event.preventDefault();

        if (form.checkValidity() && checkConfirmNewPassword()) {

            dispatch(actions.updateUser(
                user.id,
                {
                    userName: userName.trim(),
                    password: changePassword ? password : null,
                    firstName: firstName.trim(),
                    lastName: lastName.trim(),
                    rolesIds: toNumbers(rolesIds)
                },
                () => navigate('/gestion/admin'),
                errors => setBackendErrors(errors)));

        } else {

            setBackendErrors(null);

        }

    }

    const toNumbers = value => value.length > 0 ? value.map(id => Number(id)) : value;

    const checkConfirmNewPassword = () => {

        if (changePassword) {
            if (password !== confirmPassword) {

                confirmPasswordInput.setCustomValidity('error');
                setPasswordsDoNotMatch(true);

                return false;

            } else {
                return true;
            }
        } else {
            return true;
        }
    }

    const handleConfirmPasswordChange = event => {

        confirmPasswordInput.setCustomValidity('');
        setConfirmPassword(event.target.value);
        setPasswordsDoNotMatch(false);

    }

    const handleChangeRoles = event => {
        const options = event.target.options;
        const values = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected)
                values.push(options[i].value);
        }
        setRolesIds(values);
    }

    return (
        <div>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <div>
                <h5>
                    Crear usuario
                </h5>
                <div>
                    <form ref={node => form = node}
                          noValidate
                          onSubmit={e => handleSubmit(e)}>
                        <div>
                            <label htmlFor="userName">
                                Nombre de usuario
                            </label>
                            <div>
                                <input type="text" id="userName"
                                       value={userName}
                                       onChange={e => setUserName(e.target.value)}
                                       autoFocus
                                       required/>
                                <div>
                                    Nombre de usuario requerido
                                </div>
                            </div>
                        </div>
                        <div>
                            <input type="checkbox" id="changePassword"
                                   checked={changePassword}
                                   onChange={() => setChangePassword(!changePassword)}/>
                            <label htmlFor="changePassword">
                                Cambiar contraseña?
                            </label>
                        </div>
                        <div>
                            <label htmlFor="password">
                                Contraseña
                            </label>
                            <div>
                                <input type="password" id="password"
                                       value={password}
                                       onChange={e => setPassword(e.target.value)}
                                       disabled={!changePassword}
                                       required={changePassword}/>
                                <div>
                                    Campo obligatorio
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">
                                Repita la contraseña
                            </label>
                            <div>
                                <input ref={node => confirmPasswordInput = node}
                                       type="password" id="confirmPassword"
                                       value={confirmPassword}
                                       onChange={e => handleConfirmPasswordChange(e)}
                                       disabled={!changePassword}
                                       required={changePassword}/>
                                <div>
                                    {passwordsDoNotMatch ?
                                        <p> Contraseña no coincide </p> :
                                        <p> Campo requerido </p>}

                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="firstName">
                                Nombre
                            </label>
                            <div>
                                <input type="text" id="firstName"
                                       value={firstName}
                                       onChange={e => setFirstName(e.target.value)}
                                       required/>
                                <div>
                                    Nombre requerido
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="lastName">
                                Apellidos
                            </label>
                            <div>
                                <input type="text" id="lastName"
                                       value={lastName}
                                       onChange={e => setLastName(e.target.value)}
                                       required/>
                                <div>
                                    Apellidos requerido
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="roles">
                                Roles
                            </label>
                            <RolesSelector id="roles" multiple={true} value={rolesIds}
                                           onChange={e => handleChangeRoles(e)}/>
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

export default UpdateUser;