import {useDispatch, useSelector} from "react-redux";
import * as selectors from "../selectors";
import * as actions from "../actions";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {BackLink, Errors} from "../../common";

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
        <div>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <div className="center-content">
                Estas seguro de eliminar a este usuario?
                <div>
                    {user.userName} <br/>
                    {user.firstName} {user.lastName}
                </div>
                <div>
                    <BackLink/>
                    <button onClick={() => handleConfirmDelete()}>
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteUser