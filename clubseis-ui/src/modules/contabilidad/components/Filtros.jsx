import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import Select from "react-select";

import * as actions from '../actions';
import * as selectors from "../selectors.js";
import {parseListToSelect} from "../../utils/selectorUtils.js";

const Filtros = ({
                     tipo, setTipo,
                     fecha, setFecha,
                     razonSocial, setRazonSocial,
                     concepto, setConcepto,
                     categoria, setCategoria,
                     cuenta, setCuenta
                 }) => {
    const dispatch = useDispatch();
    const razonesSociales = useSelector(selectors.getRazonesSociales);
    const conceptos = useSelector(selectors.getConceptos);
    const categorias = useSelector(selectors.getCategorias);
    const cuentas = useSelector(selectors.getCuentas);

    const tipoOptions = [
        {label: "Todos", value: null},
        {label: "Gastos", value: true},
        {label: "Ingresos", value: false}
    ];
    const razonSocialOptions =
        parseListToSelect(razonesSociales || [], (x) => ({
            label: (x.denominacion + "(" + x.cifnif + ")"),
            value: x.id
        }), true);
    const conceptoOptions =
        parseListToSelect(conceptos || [], (x) => ({label: x.name, value: x.id}), true);
    const categoriaOptions =
        parseListToSelect(categorias || [], (x) => ({label: x.name, value: x.id}), true);
    const cuentaOptions =
        parseListToSelect(cuentas || [], (x) => ({label: x.name, value: x.id}), true);

    useEffect(() => {
        dispatch(actions.findAllRazonSocial());
    }, []);

    useEffect(() => {
        dispatch(actions.findAllConceptos());
    }, []);

    useEffect(() => {
        dispatch(actions.findAllCategorias());
    }, []);

    useEffect(() => {
        dispatch(actions.findAllCuentas());
    }, []);

    return (
        <form className="form-filter-contabilidad" onSubmit={e => handleSubmit(e)}>
            <div className="column">
                <label>Fecha</label>
                <input
                    type="date"
                    value={fecha}
                    onChange={e => setFecha(e.target.value)}
                />
            </div>
            <div>
                <label>Tipo</label>
                <Select
                    value={tipoOptions.find(t => t.value === tipo)}
                    onChange={e => setTipo(e.value)}
                    options={tipoOptions}
                />
            </div>
            <div>
                <label>Razon Social</label>
                <Select
                    className="selector"
                    isClearable={true}
                    isSearchable={true}
                    value={razonSocialOptions.find((x) => (x.value === razonSocial))}
                    onChange={e => setRazonSocial(e ? e.value : null)}
                    options={razonSocialOptions}
                />
            </div>
            <div>
                <label>Concepto</label>
                <Select
                    className="selector"
                    isClearable={true}
                    isSearchable={true}
                    value={conceptoOptions.find((x) => (x.value === concepto))}
                    onChange={e => setConcepto(e ? e.value : null)}
                    options={conceptoOptions}
                />
            </div>
            <div>
                <label>Categoria</label>
                <Select
                    className="selector"
                    isClearable={true}
                    isSearchable={true}
                    value={categoriaOptions.find((x) => (x.value === categoria))}
                    onChange={e => setCategoria(e ? e.value : null)}
                    options={categoriaOptions}
                />
            </div>
            <div>
                <label>Cuenta</label>
                <Select
                    className="selector"
                    isClearable={true}
                    isSearchable={true}
                    value={cuentaOptions.find((x) => (x.value === cuenta))}
                    onChange={e => setCuenta(e ? e.value : null)}
                    options={cuentaOptions}
                />
            </div>
        </form>
    );
}

export default Filtros;