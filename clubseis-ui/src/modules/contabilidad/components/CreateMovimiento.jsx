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
                    <button type="submit">
                        Crear
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateMovimiento;