import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import {Errors} from "../../common/index.js";
import Select from "react-select";

import * as selectors from "../selectors";
import * as actions from "../actions";

const numberChange = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
};

const dateChange = (date) => {
    const selectedDate = new Date(date);
    return Math.floor(selectedDate.getTime() / (1000 * 60 * 60 * 24));
};

function redondear(numero) {
    const factor = Math.pow(10, 2);
    return Math.round(numero * factor) / factor;
}

const CreateMovimiento = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const razonSocialOptions = useSelector(selectors.getRazonesSociales);
    const conceptoOptions = useSelector(selectors.getConceptos);
    const categoriaOptions = useSelector(selectors.getCategorias);
    const cuentaOptions = useSelector(selectors.getCuentas);

    const [fecha, setFecha] = useState(numberChange());
    const [gasto, setGasto] = useState(false);
    const [base0, setBase0] = useState(0);
    const [base4, setBase4] = useState(0);
    const [base10, setBase10] = useState(0);
    const [base21, setBase21] = useState(0);
    const [razonSocial, setRazonSocial] = useState();
    const [concepto, setConcepto] = useState();
    const [categoria, setCategoria] = useState();
    const [cuenta, setCuenta] = useState();
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

            dispatch(actions.createMovimiento({
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
                () => navigate("/gestion/contabilidad/"),
                errors => setBackendErrors(errors)
            ));

        } else {
            setBackendErrors(null);
        }

    }


    const selectMapper = (value, label) => {
        return ({value: value, label: label})
    };

    const razonText = (r) => {
        return r.denominacion + "(" + r.cifnif + ")";
    }

    return (
        <div>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <form ref={node => form = node}
                  noValidate
                  onSubmit={e => handleSubmit(e)}>
                <div>
                    <div>
                        <input type="radio" value="gasto" checked={gasto} onChange={() => setGasto(true)}/>
                        <label>Gasto</label>
                        <input type="radio" value="gasto" checked={!gasto} onChange={() => setGasto(false)}/>
                        <label>Ingreso</label>
                    </div>
                    <div>
                        <label>Fecha</label>
                        <input
                            type="date"
                            value={fecha}
                            onChange={e => setFecha(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <div>
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
                    <div>
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
                <div>
                    <div>
                        <div>
                            <label>Base 0:</label>
                            <input type="number" step="0.01" min="0" value={base0}
                                   onChange={e => setBase0(Number(e.target.value))}/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>Base 4:</label>
                            <input type="number" step="0.01" min="0" value={base4}
                                   onChange={e => setBase4(Number(e.target.value))}/>
                        </div>
                        <div>
                            <label>Iva 4:</label>
                            <input type="number" value={iva4} disabled/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>Base 10:</label>
                            <input type="number" step="0.01" min="0" value={base10}
                                   onChange={e => setBase10(Number(e.target.value))}/>
                        </div>
                        <div>
                            <label>Iva 10:</label>
                            <input type="number" value={iva10} disabled/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>Base 21:</label>
                            <input type="number" step="0.01" min="0" value={base21}
                                   onChange={e => setBase21(Number(e.target.value))}/>
                        </div>
                        <div>
                            <label>Iva 21:</label>
                            <input type="number" value={iva21} disabled/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>Total Base:</label>
                            <input type="number" value={baseTotal} disabled/>
                        </div>
                        <div>
                            <label>Total Iva:</label>
                            <input type="number" value={ivaTotal} disabled/>
                        </div>
                        <div>
                            <label>Total:</label>
                            <input type="number" value={total} disabled/>
                        </div>
                    </div>
                </div>
                <div>
                    <button type="submit">
                        Crear
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateMovimiento;