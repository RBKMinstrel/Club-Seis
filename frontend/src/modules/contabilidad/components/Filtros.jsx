import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import Select from "react-select";

import * as actions from '../actions';
import * as selectors from "../selectors.js";
import {parseListToSelect} from "../../utils/selectorUtils.js";
import {FormattedMessage, useIntl} from "react-intl";

const Filtros = ({
                     tipo, setTipo,
                     fecha, setFecha,
                     razonSocial, setRazonSocial,
                     concepto, setConcepto,
                     categoria, setCategoria,
                     cuenta, setCuenta
                 }) => {
    const dispatch = useDispatch();
    const intl = useIntl();
    const razonesSociales = useSelector(selectors.getRazonesSociales);
    const conceptos = useSelector(selectors.getConceptos);
    const categorias = useSelector(selectors.getCategorias);
    const cuentas = useSelector(selectors.getCuentas);

    const tipoOptions = [
        {label: intl.formatMessage({id: 'project.global.fields.all'}), value: null},
        {label: intl.formatMessage({id: 'project.global.fields.spends'}), value: true},
        {label: intl.formatMessage({id: 'project.global.fields.incomes'}), value: false}
    ];
    const razonSocialOptions =
        parseListToSelect(razonesSociales || [], (x) => ({
            label: (x.denominacion + "(" + x.cifnif + ")"),
            value: x.id
        }), true, intl);
    const conceptoOptions =
        parseListToSelect(conceptos || [], (x) => ({label: x.name, value: x.id}), true, intl);
    const categoriaOptions =
        parseListToSelect(categorias || [], (x) => ({label: x.name, value: x.id}), true, intl);
    const cuentaOptions =
        parseListToSelect(cuentas || [], (x) => ({label: x.name, value: x.id}), true, intl);

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
                <label><FormattedMessage id="project.global.fields.date"/></label>
                <input
                    type="date"
                    value={fecha}
                    onChange={e => setFecha(e.target.value)}
                />
            </div>
            <div>
                <label><FormattedMessage id="project.global.fields.type"/></label>
                <Select
                    value={tipoOptions.find(t => t.value === tipo)}
                    onChange={e => setTipo(e.value)}
                    options={tipoOptions}
                />
            </div>
            <div>
                <label><FormattedMessage id="project.global.fields.registeredName"/></label>
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
                <label><FormattedMessage id="project.global.fields.concept"/></label>
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
                <label><FormattedMessage id="project.global.fields.category"/></label>
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
                <label><FormattedMessage id="project.global.fields.account"/></label>
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