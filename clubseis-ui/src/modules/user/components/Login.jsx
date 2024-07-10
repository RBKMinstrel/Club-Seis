import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {Errors, Section} from '../../common';
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
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100vh"}}>
            <div style={{width: 250}}>
                <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
                <Section title="Titulo login">
                    <form ref={node => form = node}
                          noValidate
                          onSubmit={e => handleSubmit(e)}
                          className="column"
                    >
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
                        <div style={{display: "flex", justifyContent: "center"}}>
                                <button type="submit">
                                    Entrar
                                </button>
                            </div>
                    </form>
                </Section>
            </div>
        </div>
    );
}

export default Login;