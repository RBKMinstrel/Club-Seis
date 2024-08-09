import {useDispatch, useSelector} from "react-redux";
import * as selectors from "../selectors";
import * as actions from "../actions";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {ActionButton, BackLink, Errors} from "../../common";
import {FormattedMessage} from "react-intl";

const DeleteUser = () => {

    const user = useSelector(selectors.getUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [backendErrors, setBackendErrors] = useState(null);

    const handleConfirmDelete = () => {
        dispatch(actions.deleteUser(
            user.id,
            () => navigate('/gestion/admin'),
            errors => setBackendErrors(errors)
        ))
    }

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: 10}}>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <div className="center-content">
                <FormattedMessage id="project.admin.DeleteUser.text"/>
                <div>{user.userName}</div>
                <div style={{display: "flex", justifyContent: "space-between", gap: 30}}>
                    <BackLink/>
                    <ActionButton
                        type="primary"
                        htmlType="button"
                        onClick={() => handleConfirmDelete()}
                    >
                        <FormattedMessage id="project.global.button.confirm"/>
                    </ActionButton>
                </div>
            </div>
        </div>
    );
}

export default DeleteUser