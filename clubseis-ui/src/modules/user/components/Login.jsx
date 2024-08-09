import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {Errors, Section} from '../../common';
import * as actions from '../actions';
import {FormattedMessage, useIntl} from "react-intl";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const intl = useIntl();

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
                <Section title={intl.formatMessage({id: 'project.user.Login.title'})}>
                    <form ref={node => form = node}
                          noValidate
                          onSubmit={e => handleSubmit(e)}
                          className="column"
                    >
                        <div>
                            <label htmlFor="userName">
                                <FormattedMessage id="project.global.fields.userName"/>
                            </label>
                            <div>
                                <input type="text" id="userName"
                                       value={userName}
                                       onChange={e => setUserName(e.target.value)}
                                       autoFocus
                                       required/>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password">
                                <FormattedMessage id="project.global.fields.password"/>
                            </label>
                            <div>
                                <input type="password" id="password"
                                       value={password}
                                       onChange={e => setPassword(e.target.value)}
                                       required/>
                            </div>
                        </div>
                        <div style={{display: "flex", justifyContent: "center"}}>
                                <button type="submit">
                                    <FormattedMessage id="project.global.fields.accept"/>
                                </button>
                            </div>
                    </form>
                </Section>
            </div>
        </div>
    );
}

export default Login;