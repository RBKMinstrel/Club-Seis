import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import Select from "react-select";

import * as actions from '../actions';
import * as selectors from "../selectors.js";
import {parseListToSelect} from "../../utils/selectorUtils.js";

const numberChange = (number) => {
    const daysDifference = parseInt(number);
    const selectedDate = new Date(daysDifference * (1000 * 60 * 60 * 24));

    return selectedDate.toISOString().split('T')[0];
};

const dateChange = (date) => {
    const selectedDate = new Date(date);
    return Math.floor(selectedDate.getTime() / (1000 * 60 * 60 * 24));
};

const Filtros = ({criteria, resetPage}) => {

    const dispatch = useDispatch();
    const razonesSociales = useSelector(selectors.getRazonesSociales);
    const conceptos = useSelector(selectors.getConceptos);
    const categorias = useSelector(selectors.getCategorias);
    const cuentas = useSelector(selectors.getCuentas);

    const tipoOptions =
        [
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

    const [tipo, setTipo] = useState(tipoOptions[0]);
    const [fecha, setFecha] = useState(criteria.fecha ? numberChange(criteria.fecha) : '');
    const [razonSocial, setRazonSocial] =
        useState(razonSocialOptions ? razonSocialOptions.find((x) => (x.value === criteria.razonSocialId)) : {});
    const [concepto, setConcepto] =
        useState(conceptoOptions ? conceptoOptions.find((x) => (x.value === criteria.conceptoId)) : {});
    const [categoria, setCategoria] =
        useState(categoriaOptions ? categoriaOptions.find((x) => (x.value === criteria.categoriaId)) : {});
    const [cuenta, setCuenta] =
        useState(cuentaOptions ? cuentaOptions.find((x) => (x.value === criteria.cuentaId)) : {});

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

    useEffect(() => {
        resetPage();
        dispatch(actions.findMovimientos({
            ...criteria,
            tipo: tipo.value,
            fecha: fecha !== '' ? dateChange(fecha) : null,
            razonSocialId: razonSocial ? razonSocial.value : null,
            conceptoId: concepto ? concepto.value : null,
            categoriaId: categoria ? categoria.value : null,
            cuentaId: cuenta ? cuenta.value : null,
            page: 0,
        }));
    }, [tipo, fecha, razonSocial, concepto, categoria, cuenta]);

    const selectMapper = (value, label) => {
        return ({value: value, label: label})
    };

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
                    value={tipo}
                    onChange={setTipo}
                    options={tipoOptions}
                />
            </div>
            <div>
                <label>Razon Social</label>
                <Select
                    className="selector"
                    isClearable={true}
                    isSearchable={true}
                    value={razonSocial}
                    onChange={setRazonSocial}
                    options={razonSocialOptions}
                />
            </div>
            <div>
                <label>Concepto</label>
                <Select
                    className="selector"
                    isClearable={true}
                    isSearchable={true}
                    value={concepto}
                    onChange={setConcepto}
                    options={conceptoOptions}
                />
            </div>
            <div>
                <label>Categoria</label>
                <Select
                    className="selector"
                    isClearable={true}
                    isSearchable={true}
                    value={categoria}
                    onChange={setCategoria}
                    options={categoriaOptions}
                />
            </div>
            <div>
                <label>Cuenta</label>
                <Select
                    className="selector"
                    isClearable={true}
                    isSearchable={true}
                    value={cuenta}
                    onChange={setCuenta}
                    options={cuentaOptions}
                />
            </div>
        </form>
    );
}

export default Filtros;