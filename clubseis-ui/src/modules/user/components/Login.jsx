import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {Errors} from '../../common';
import * as actions from '../actions';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    const handleSubmit = event => {

        event.preventDefault();

        if (form.checkValidity()) {

            dispatch(actions.login(
                userName.trim(),
                password,
                () => navigate('/gestion'),
                errors => setBackendErrors(errors),
                () => {
                    navigate('/*');
                    dispatch(actions.logout());
                }
            ));

        } else {
            setBackendErrors(null);
        }

    }

    return (
        <div>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <div>
                <h5>
                    Titulo login
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
                                    Atributo requerido
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password">
                                Contraseña
                            </label>
                            <div>
                                <input type="password" id="password"
                                       value={password}
                                       onChange={e => setPassword(e.target.value)}
                                       required/>
                                <div>
                                    Atributo requerido
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <button type="submit">
                                    Entrar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;