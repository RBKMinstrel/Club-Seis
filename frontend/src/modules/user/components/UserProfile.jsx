import {useSelector} from "react-redux";

import {ActionButton, Modal, Section} from "../../common";

import * as selectors from '../selectors';
import {useState} from "react";
import ChangePassword from "./ChangePassword.jsx";
import {useNavigate} from "react-router-dom";
import {FormattedMessage, useIntl} from "react-intl";

const UserProfile = () => {
    const navigate = useNavigate();
    const intl = useIntl();
    const user = useSelector(selectors.getUser);

    const [modalChangePassword, setModalChangePassword] = useState(false);

    return (
        <div
            style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 10}}>
            <div style={{display: "flex", justifyContent: "flex-end", width: "100%", gap: 10}}>
                <ActionButton
                    type="primary"
                    htmlType="button"
                    style={{alignSelf: "flex-end"}}
                    onClick={() => navigate("/gestion/mi-perfil/update-profile")}
                >
                    <FormattedMessage id="project.user.UserProfile.updateData"/>
                </ActionButton>
                <ActionButton
                    type="primary"
                    htmlType="button"
                    style={{alignSelf: "flex-end"}}
                    onClick={() => setModalChangePassword(true)}
                >
                    <FormattedMessage id="project.user.UserProfile.updatePassword"/>
                </ActionButton>
            </div>
            <Section title="Datos de la cuenta">
                <div style={{display: "flex"}}>
                    <div style={{display: "flex", width: "30%"}}>
                        <div style={{display: "flex", flexDirection: "column", gap: 10}}>
                            <h4><strong><FormattedMessage id="project.global.fields.userName"/>:</strong></h4>
                            <h4>{user.userName}</h4>
                        </div>
                    </div>
                    <div style={{display: "flex", width: "70%"}}>
                        <div style={{display: "flex", width: "30%"}}>
                            <div style={{display: "flex", flexDirection: "column", gap: 10}}>
                                <h4><strong><FormattedMessage id="project.global.fields.firstName"/>:</strong></h4>
                                <h4>{user.firstName}</h4>
                            </div>
                        </div>
                        <div style={{display: "flex", width: "70%"}}>
                            <div style={{display: "flex", flexDirection: "column", gap: 10}}>
                                <h4><strong><FormattedMessage id="project.global.fields.lastName"/>:</strong></h4>
                                <h4>{user.lastName}</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <br/>
                <div style={{display: "flex", flexDirection: "column", gap: 10}}>
                    <h4><FormattedMessage id="project.global.fields.roles"/>:</h4>
                    <div style={{display: "flex", gap: 8}}>
                        {user.roles.map(rol => <h4>{rol}</h4>)}
                    </div>
                </div>
            </Section>
            <Modal
                isActive={modalChangePassword}
                onClose={() => setModalChangePassword(false)}
                title={intl.formatMessage({id: "project.user.UserProfile.changePassword"})}
            >
                <ChangePassword/>
            </Modal>
        </div>
    );

}

export default UserProfile;