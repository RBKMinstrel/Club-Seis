import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom';
import {FormattedMessage, useIntl} from "react-intl";

import {ActionButton, BackLink, Errors, Section} from '../../common';
import RolesSelect from "./RolesSelect.jsx";

import * as actions from '../actions';
import * as selectors from "../selectors";

const UpdateUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const intl = useIntl();
    const user = useSelector(selectors.getUser);

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

    useEffect(() => {
        setUserName(user.userName);
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setRolesIds(user.rolesIds);
    }, [user])

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

    if (!user)
        return null;

    return (
        <div style={{display: "flex", flexDirection: "column", gap: 10}}>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <BackLink style={{alignSelf: "start"}}/>
            <Section title={intl.formatMessage({id: 'project.admin.UpdateUser.title'})}>
                <form ref={node => form = node}
                      noValidate
                      onSubmit={e => handleSubmit(e)}
                      style={{display: "flex", flexDirection: "column", gap: 10}}
                >
                    <div style={{display: "flex", gap: 30}}>
                        <div style={{display: "flex", flexDirection: "column", gap: 8}}>
                            <label htmlFor="userName">
                                <FormattedMessage id="project.global.fields.userName"/>
                            </label>
                            <input type="text" id="userName"
                                   value={userName}
                                   onChange={e => setUserName(e.target.value)}
                                   autoFocus
                                   required/>
                        </div>
                        <div style={{display: "flex", flexDirection: "column", gap: 8}}>
                            <label htmlFor="firstName">
                                <FormattedMessage id="project.global.fields.firstName"/>
                            </label>
                            <input type="text" id="firstName"
                                   value={firstName}
                                   onChange={e => setFirstName(e.target.value)}
                                   required/>
                        </div>
                        <div style={{display: "flex", flexDirection: "column", gap: 8}}>
                            <label htmlFor="lastName">
                                <FormattedMessage id="project.global.fields.lastName"/>
                            </label>
                            <input type="text" id="lastName"
                                   value={lastName}
                                   onChange={e => setLastName(e.target.value)}
                                   required/>
                        </div>
                    </div>
                    <div style={{display: "flex", alignItems: "flex-end", gap: 30}}>
                        <label htmlFor="changePassword">
                            <input type="checkbox" id="changePassword"
                                   checked={changePassword}
                                   onChange={() => setChangePassword(!changePassword)}/>
                            <FormattedMessage id="project.admin.UpdateUser.changePassword"/>
                        </label>
                        <div style={{display: "flex", flexDirection: "column", gap: 8}}>
                            <label htmlFor="password">
                                <FormattedMessage id="project.global.fields.password"/>
                            </label>
                            <input type="password" id="password"
                                   value={password}
                                   disabled={!changePassword}
                                   onChange={e => setPassword(e.target.value)}
                                   required/>
                        </div>
                        <div style={{display: "flex", flexDirection: "column", gap: 8}}>
                            <label htmlFor="confirmPassword">
                                <FormattedMessage id="project.global.fields.repeatPassword"/>
                            </label>
                            <input ref={node => confirmPasswordInput = node}
                                   type="password" id="confirmPassword"
                                   value={confirmPassword}
                                   disabled={!changePassword}
                                   onChange={e => handleConfirmPasswordChange(e)}
                                   required/>
                            <div>
                                {passwordsDoNotMatch &&
                                    <FormattedMessage id="project.global.fields.passwordNotMatched"/>}
                            </div>
                        </div>
                    </div>
                    <RolesSelect
                        roles={rolesIds}
                        setRoles={setRolesIds}
                        required
                        isClearable
                        label
                        style={{display: "flex", flexDirection: "column", gap: 8}}
                    />
                    <ActionButton
                        type="primary"
                        htmlType="submit"
                        style={{alignSelf: "end"}}
                    >
                        <FormattedMessage id="project.global.fields.update"/>
                    </ActionButton>
                </form>
            </Section>
        </div>
    );

}

export default UpdateUser;