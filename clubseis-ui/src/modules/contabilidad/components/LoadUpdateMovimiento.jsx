import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";

import * as actions from "../actions.js";

const LoadUpdateMovimiento = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {

        if (!Number.isNaN(id)) {
            dispatch(actions.findMovimientoById(id,
                () => navigate("/gestion/contabilidad/asientos/update")));
        } else {
            navigate(-1);
        }

    }, []);

    return null;

}

export default LoadUpdateMovimiento;