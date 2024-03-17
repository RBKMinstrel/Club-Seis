import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import Select from "react-select";

import * as actions from '../actions';
import * as selectors from "../selectors.js";

const numberChange = (number) => {
    const daysDifference = parseInt(number);
    const selectedDate = new Date(daysDifference * (1000 * 60 * 60 * 24));

    return selectedDate.toISOString().split('T')[0];
};

const dateChange = (date) => {
    const selectedDate = new Date(date);
    return Math.floor(selectedDate.getTime() / (1000 * 60 * 60 * 24));
};

const Filtros = ({criteria}) => {

    const dispatch = useDispatch();
    const razonesSociales = useSelector(selectors.getRazonesSociales);
    const conceptos = useSelector(selectors.getConceptos);
    const categorias = useSelector(selectors.getCategorias);
    const cuentas = useSelector(selectors.getCuentas);
    const [fecha, setFecha] = useState(criteria.fecha ? numberChange(criteria.fecha) : '');
    const [razonSocialId, setRazonSocialId] = useState(criteria.razonSocialId ? criteria.razonSocialId : -1);
    const [conceptoId, setConceptoId] = useState(criteria.conceptoId ? criteria.conceptoId : -1);
    const [categoriaId, setCategoriaId] = useState(criteria.categoriaId ? criteria.categoriaId : -1);
    const [cuentaId, setCuentaId] = useState(criteria.cuentaId ? criteria.cuentaId : -1);
    const [size, setSize] = useState(criteria.size ? criteria.size : 12);
    const sizes = [12, 25, 50, 75, 100];

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

    const handleSubmit = event => {
        event.preventDefault();

        dispatch(actions.findMovimientos({
            page: 0,
            fecha: fecha !== '' ? dateChange(fecha) : null,
            razonSocialId: razonSocialId !== -1 ? razonSocialId : null,
            conceptoId: conceptoId !== -1 ? conceptoId : null,
            categoriaId: categoriaId !== -1 ? categoriaId : null,
            cuentaId: cuentaId !== -1 ? cuentaId : null,
            size: size,
        }));
    };

    const selectMapper = (value, label) => {
        return ({value: value, label: label})
    };

    const selectRazonSocial = () => {
        const razonSocial = selectors.getRazonSocial(razonesSociales, razonSocialId);
        const aux = razonSocial ? razonSocial.denominacion + "(" + razonSocial.cifnif + ")" : "";
        return selectMapper(razonSocialId, aux)
    }

    return (
        <form className="form-filter-contabilidad" onSubmit={e => handleSubmit(e)}>
            <div>
                <label>Razon Social</label>
                <Select
                    className="selector"
                    isClearable={true}
                    isSearchable={true}
                    value={selectRazonSocial()}
                    onChange={e => setRazonSocialId(e ? e.value : -1)}
                    options={razonesSociales ? razonesSociales.map(r => (selectMapper(r.id, r.denominacion + "(" + r.cifnif + ")"))) : []}
                />
            </div>
            <div>
                <label>Fecha</label>
                <input
                    type="date"
                    value={fecha}
                    onChange={e => setFecha(e.target.value)}
                />
            </div>
            <div>
                <label>Concepto</label>
                <Select
                    className="selector"
                    isClearable={true}
                    isSearchable={true}
                    value={selectMapper(conceptoId, selectors.getConcepto(conceptos, conceptoId))}
                    onChange={e => setConceptoId(e ? e.value : -1)}
                    options={conceptos ? conceptos.map(c => (selectMapper(c.id, c.name))) : []}
                />
            </div>
            <div>
                <label>Categoria</label>
                <Select
                    className="selector"
                    isClearable={true}
                    isSearchable={true}
                    value={selectMapper(categoriaId, selectors.getCategoria(categorias, categoriaId))}
                    onChange={e => setCategoriaId(e ? e.value : -1)}
                    options={categorias ? categorias.map(c => (selectMapper(c.id, c.name))) : []}
                />
            </div>
            <div>
                <label>Cuenta</label>
                <Select
                    className="selector"
                    isClearable={true}
                    isSearchable={true}
                    value={selectMapper(cuentaId, selectors.getCuenta(cuentas, cuentaId))}
                    onChange={e => setCuentaId(e ? e.value : -1)}
                    options={cuentas ? cuentas.map(c => (selectMapper(c.id, c.name))) : []}
                />
            </div>
            <div>
                <label>Nº</label>
                <Select
                    className="selector"
                    isSearchable={true}
                    value={selectMapper(size, size)}
                    onChange={e => setSize(e.value)}
                    options={sizes.map(s => (selectMapper(s, s)))}
                />
            </div>
            <div>
                <button type="submit">
                    Buscar
                </button>
            </div>
        </form>
    );
}

export default Filtros;