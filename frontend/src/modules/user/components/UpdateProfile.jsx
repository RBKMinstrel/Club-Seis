import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {ActionButton, BackLink, Errors, Section} from '../../common';
import * as actions from '../actions';
import * as selectors from '../selectors';
import {FormattedMessage, useIntl} from "react-intl";

const UpdateProfile = () => {

    const user = useSelector(selectors.getUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const intl = useIntl();

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
                () => navigate('/gestion/mi-perfil'),
                errors => setBackendErrors(errors)));

        } else {

            setBackendErrors(null);

        }

    }

    return (
        <div style={{display: "flex", flexDirection: "column", gap: 10}}>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <BackLink style={{alignSelf: "start"}}/>
            <Section title={intl.formatMessage({id: "project.user.UpdateProfile.title"})}>
                <form ref={node => form = node}
                      noValidate onSubmit={e => handleSubmit(e)}
                      style={{display: "flex", flexDirection: "column", alignItems: "center", gap: 10}}
                >
                    <div style={{display: "flex", justifyContent: "space-around", width: "100%", gap: 10}}>
                        <div style={{display: "flex", flexDirection: "column", gap: 10}}>
                            <label htmlFor="userName">
                                <FormattedMessage id="project.global.fields.userName"/>
                            </label>
                            <input type="text" id="userName"
                                   value={userName}
                                   onChange={e => setUserName(e.target.value)}
                                   autoFocus
                                   required/>
                        </div>
                        <div style={{display: "flex", flexDirection: "column", gap: 10}}>
                            <label htmlFor="firstName">
                                <FormattedMessage id="project.global.fields.firstName"/>
                            </label>
                            <input type="text" id="firstName"
                                   value={firstName}
                                   onChange={e => setFirstName(e.target.value)}
                                   required/>
                        </div>
                        <div style={{display: "flex", flexDirection: "column", gap: 10}}>
                            <label htmlFor="lastName">
                                <FormattedMessage id="project.global.fields.lastName"/>
                            </label>
                            <input type="text" id="lastName"
                                   value={lastName}
                                   onChange={e => setLastName(e.target.value)}
                                   required/>
                        </div>
                    </div>
                    <ActionButton type="primary" htmlType="submit" style={{alignSelf: "end"}}>
                        <FormattedMessage id="project.global.fields.save"/>
                    </ActionButton>
                </form>
            </Section>
        </div>
    );

}

export default UpdateProfile;