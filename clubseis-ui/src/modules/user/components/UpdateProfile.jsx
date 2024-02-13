import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {Errors} from '../../common';
import * as actions from '../actions';
import * as selectors from '../selectors';

const UpdateProfile = () => {

    const user = useSelector(selectors.getUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userName, setUserName] = useState(user.userName);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    const handleSubmit = event => {

        event.preventDefault();

        if (form.checkValidity()) {

            dispatch(actions.updateProfile(
                {
                    id: user.id,
                    userName: userName.trim(),
                    firstName: firstName.trim(),
                    lastName: lastName.trim()
                },
                () => navigate('/gestion'),
                errors => setBackendErrors(errors)));

        } else {

            setBackendErrors(null);

        }

    }

    return (
        <div>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <div>
                <h5>
                    Actualizar perfil
                </h5>
                <div>
                    <form ref={node => form = node}
                          noValidate onSubmit={e => handleSubmit(e)}>
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

export default UpdateProfile;