import {useNavigate, useParams} from "react-router-dom";
import * as actions from "../actions.js";
import {Errors} from "../../common/index.js";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {FormattedMessage} from "react-intl";

const DeleteMovimiento = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [backendErrors, setBackendErrors] = useState(null);

    const handleConfirm = () => {

        const movimientoId = Number(id);

        if (!Number.isNaN(movimientoId)) {
            dispatch(actions.deleteMovimiento(movimientoId,
                () => navigate("/gestion/contabilidad/asientos"),
                errors => setBackendErrors(errors)));
        }

    }

    return (
        <div>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <div className="column">
                <h2><FormattedMessage id="project.contabilidad.DeleteMovimiento.text"/></h2>
                <div className="row" style={{justifyContent: "space-between"}}>
                    <button onClick={() => navigate(-1)}>
                        <FormattedMessage id="project.global.button.cancel"/>
                    </button>
                    <button onClick={handleConfirm}>
                        <FormattedMessage id="project.global.button.confirm"/>
                    </button>
                </div>
            </div>
        </div>
    );

}

export default DeleteMovimiento;