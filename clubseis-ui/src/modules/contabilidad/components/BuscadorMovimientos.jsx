import Filtros from "./Filtros";
import Movimientos from "./Movimientos";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as actions from "../actions.js";
import * as selectors from '../selectors';
import {Pager} from "../../common/index";
import {Link} from "react-router-dom";

const BuscadorMovimientos = () => {

    const movimientosSearch = useSelector(selectors.getMovimientoSearch);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.findMovimientos({page: 0,}));
    }, [dispatch]);

    return (
        <div>
            <Link to="/gestion/contabilidad/crear-movimiento">Crear movimiento</Link>
            <Filtros criteria={movimientosSearch ? movimientosSearch.criteria : {}}/>
            <Movimientos movimientos={movimientosSearch ? movimientosSearch.result.items : []}/>
            <Pager back={{
                enabled: (movimientosSearch ? movimientosSearch.criteria.page : 0) >= 1,
                onClick: () => dispatch(actions.previousFindMovimientosResultPage(movimientosSearch.criteria))
            }} next={{
                enabled: (movimientosSearch ? movimientosSearch.result.existMoreItems : false),
                onClick: () => dispatch(actions.nextFindMovimientosResultPage(movimientosSearch.criteria))
            }}/>
        </div>
    );
}

export default BuscadorMovimientos;