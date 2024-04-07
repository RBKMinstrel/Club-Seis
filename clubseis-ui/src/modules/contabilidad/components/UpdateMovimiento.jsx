import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import {Errors} from "../../common/index.js";
import Select from "react-select";

import * as selectors from "../selectors";
import * as actions from "../actions";


const numberChange = (number) => {
    const daysDifference = parseInt(number);
    const selectedDate = new Date(daysDifference * (1000 * 60 * 60 * 24));

    return selectedDate.toISOString().split('T')[0];
};

const dateChange = (date) => {
    const selectedDate = new Date(date);
    return Math.floor(selectedDate.getTime() / (1000 * 60 * 60 * 24));
};

function redondear(numero) {
    const factor = Math.pow(10, 2);
    return Math.round(numero * factor) / factor;
}


const selectMapper = (value, label) => {
    return ({value: value, label: label})
};

const razonText = (r) => {
    return r.denominacion + "(" + r.cifnif + ")";
}

const optionMapperRS = (option) => {
    return selectMapper(option.id, option.denominacion + "(" + option.cifnif + ")");
}

const UpdateMovimiento = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const movimiento = useSelector(selectors.getMovimiento);
    const razonSocialOptions = useSelector(selectors.getRazonesSociales);
    const conceptoOptions = useSelector(selectors.getConceptos);
    const categoriaOptions = useSelector(selectors.getCategorias);
    const cuentaOptions = useSelector(selectors.getCuentas);

    const [fecha, setFecha] = useState(numberChange(movimiento.fecha));
    const [gasto, setGasto] = useState(movimiento.esGasto);
    const [base0, setBase0] = useState(movimiento.base0);
    const [base4, setBase4] = useState(movimiento.base4);
    const [base10, setBase10] = useState(movimiento.base10);
    const [base21, setBase21] = useState(movimiento.base21);
    const [razonSocial, setRazonSocial] = useState(movimiento.razonSocial
        ? optionMapperRS(selectors.getRazonSocial(razonSocialOptions, movimiento.razonSocial)) : null);
    const [concepto, setConcepto] = useState(movimiento.concepto
        ? selectMapper(movimiento.concepto, selectors.getConcepto(conceptoOptions, movimiento.concepto)) : null);
    const [categoria, setCategoria] = useState(movimiento.categoria
        ? selectMapper(movimiento.categoria, selectors.getCategoria(categoriaOptions, movimiento.categoria)) : null);
    const [cuenta, setCuenta] = useState(movimiento.cuenta
        ? selectMapper(movimiento.cuenta, selectors.getCuenta(cuentaOptions, movimiento.cuenta)) : null);
    const [backendErrors, setBackendErrors] = useState(null);

    const iva4 = redondear(base4 * 0.04);
    const iva10 = redondear(base10 * 0.1);
    const iva21 = redondear(base21 * 0.21);
    const baseTotal = Number((base0 + base4 + base10 + base21).toFixed(2));
    const ivaTotal = Number((iva4 + iva10 + iva21).toFixed(2));
    const total = Number((baseTotal + ivaTotal).toFixed(2));

    let form;

    const handleSubmit = event => {

        event.preventDefault();

        if (form.checkValidity()) {

            dispatch(actions.updateMovimiento({
                    id: movimiento.id,
                    fecha: dateChange(fecha),
                    esGasto: gasto,
                    base0: base0,
                    base4: base4,
                    base10: base10,
                    base21: base21,
                    razonSocial: razonSocial ? razonSocial.value : null,
                    concepto: concepto ? concepto.value : null,
                    categoria: categoria ? categoria.value : null,
                    cuenta: cuenta ? cuenta.value : null,
                },
                () => navigate("/gestion/contabilidad/asientos"),
                errors => setBackendErrors(errors)
            ));

        } else {
            setBackendErrors(null);
        }

    }

    return (
        <div>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <form ref={node => form = node}
                  className="column"
                  noValidate
                  onSubmit={e => handleSubmit(e)}>
                <div className="row">
                    <div className="column">
                        <div>
                            <input type="radio" value="gasto" checked={gasto} onChange={() => setGasto(true)}/>
                            <label>Gasto</label>
                        </div>
                        <div>
                            <input type="radio" value="gasto" checked={!gasto} onChange={() => setGasto(false)}/>
                            <label>Ingreso</label>
                        </div>
                    </div>
                    <div className="column">
                        <label>Fecha</label>
                        <input
                            type="date"
                            value={fecha}
                            onChange={e => setFecha(e.target.value)}
                        />
                    </div>
                </div>
                <div className="column">
                    <div className="row">
                        <div>
                            <label>Razon Social</label>
                            <Select
                                className="selector"
                                isClearable
                                isSearchable
                                value={razonSocial}
                                onChange={setRazonSocial}
                                options={razonSocialOptions ? razonSocialOptions.map(r => selectMapper(r.id, razonText(r))) : []}
                            />
                        </div>
                        <div>
                            <label>Cuenta</label>
                            <Select
                                className="selector"
                                isClearable
                                isSearchable
                                value={cuenta}
                                onChange={setCuenta}
                                options={cuentaOptions ? cuentaOptions.map(c => selectMapper(c.id, c.name)) : []}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div>
                            <label>Concepto</label>
                            <Select
                                className="selector"
                                isClearable
                                isSearchable
                                value={concepto}
                                onChange={setConcepto}
                                options={conceptoOptions ? conceptoOptions.map(c => selectMapper(c.id, c.name)) : []}
                            />
                        </div>
                        <div>
                            <label>Categoria</label>
                            <Select
                                className="selector"
                                isClearable
                                isSearchable
                                value={categoria}
                                onChange={setCategoria}
                                options={categoriaOptions ? categoriaOptions.map(c => selectMapper(c.id, c.name)) : []}
                            />
                        </div>
                    </div>
                </div>
                <div className="row begin">
                    <div className="column">
                        <div className="column">
                            <label>Base 0:</label>
                            <input type="number" step="0.01" min="0" value={base0}
                                   onChange={e => setBase0(Number(e.target.value))}/>
                        </div>
                    </div>
                    <div className="column">
                        <div className="column">
                            <label>Base 4:</label>
                            <input type="number" step="0.01" min="0" value={base4}
                                   onChange={e => setBase4(Number(e.target.value))}/>
                        </div>
                        <div className="column">
                            <label>Iva 4:</label>
                            <input type="number" value={iva4} disabled/>
                        </div>
                    </div>
                    <div className="column">
                        <div className="column">
                            <label>Base 10:</label>
                            <input type="number" step="0.01" min="0" value={base10}
                                   onChange={e => setBase10(Number(e.target.value))}/>
                        </div>
                        <div className="column">
                            <label>Iva 10:</label>
                            <input type="number" value={iva10} disabled/>
                        </div>
                    </div>
                    <div className="column">
                        <div className="column">
                            <label>Base 21:</label>
                            <input type="number" step="0.01" min="0" value={base21}
                                   onChange={e => setBase21(Number(e.target.value))}/>
                        </div>
                        <div className="column">
                            <label>Iva 21:</label>
                            <input type="number" value={iva21} disabled/>
                        </div>
                    </div>
                    <div className="column">
                        <div className="column">
                            <label>Total Base:</label>
                            <input type="number" value={baseTotal} disabled/>
                        </div>
                        <div className="column">
                            <label>Total Iva:</label>
                            <input type="number" value={ivaTotal} disabled/>
                        </div>
                        <div className="column">
                            <label>Total:</label>
                            <input type="number" value={total} disabled/>
                        </div>
                    </div>
                </div>
                <div className="row end">
                    <button type="submit">
                        Actualizar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdateMovimiento;