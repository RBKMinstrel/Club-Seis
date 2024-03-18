import {useNavigate, useParams} from "react-router-dom";
import * as actions from "../actions.js";
import {Errors} from "../../common/index.js";
import {useState} from "react";
import {useDispatch} from "react-redux";

const DeleteMovimiento = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [backendErrors, setBackendErrors] = useState(null);

    const handleConfirm = () => {

        const movimientoId = Number(id);

        if (!Number.isNaN(movimientoId)) {
            dispatch(actions.deleteMovimiento(movimientoId,
                () => navigate("/gestion/contabilidad"),
                errors => setBackendErrors(errors)));
        }

    }

    return (
        <div>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <div className="column">
                <h2>Quiere confirmar la accion de borrar este movimiento?</h2>
                <div className="row" style={{justifyContent: "space-between"}}>
                    <button onClick={() => navigate(-1)}>
                        Cancelar
                    </button>
                    <button onClick={handleConfirm}>
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );

}

export default DeleteMovimiento;