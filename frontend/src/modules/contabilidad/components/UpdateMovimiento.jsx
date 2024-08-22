import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import {ActionButton, Errors, Section} from "../../common/index.js";
import Select from "react-select";

import * as selectors from "../selectors";
import * as actions from "../actions";
import {fromNumberToStringDate, fromStringDateToNumber} from "../../utils/dataUtils.js";
import {FormattedMessage, useIntl} from "react-intl";

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
    const intl = useIntl();

    const movimiento = useSelector(selectors.getMovimiento);
    const razonSocialOptions = useSelector(selectors.getRazonesSociales);
    const conceptoOptions = useSelector(selectors.getConceptos);
    const categoriaOptions = useSelector(selectors.getCategorias);
    const cuentaOptions = useSelector(selectors.getCuentas);

    const [fecha, setFecha] = useState(fromNumberToStringDate(movimiento.fecha));
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
                    fecha: fromStringDateToNumber(fecha),
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
        <div style={{display: "flex", flexDirection: "column", gap: 10}}>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <form ref={node => form = node}
                  className="column"
                  noValidate
                  onSubmit={e => handleSubmit(e)}>
                <Section title={intl.formatMessage({id: 'project.global.title.identificationData'})}>
                    <div className="row" style={{justifyContent: "space-around"}}>
                        <div className="column">
                            <div className="row">
                                <div>
                                    <input type="radio" value="ingreso" checked={!gasto}
                                           onChange={() => setGasto(false)}/>
                                    <label><FormattedMessage id="project.global.fields.income"/></label>
                                </div>
                                <div>
                                    <input type="radio" value="gasto" checked={gasto} onChange={() => setGasto(true)}/>
                                    <label><FormattedMessage id="project.global.fields.spend"/></label>
                                </div>
                            </div>
                            <div className="column">
                                <label><FormattedMessage id="project.global.fields.date"/></label>
                                <input
                                    type="date"
                                    required
                                    value={fecha}
                                    onChange={e => setFecha(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="column">
                            <div>
                                <label><FormattedMessage id="project.global.fields.registeredName"/></label>
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
                                <label><FormattedMessage id="project.global.fields.concept"/></label>
                                <Select
                                    className="selector"
                                    isClearable
                                    isSearchable
                                    value={concepto}
                                    onChange={setConcepto}
                                    options={conceptoOptions ? conceptoOptions.map(c => selectMapper(c.id, c.name)) : []}
                                />
                            </div>
                        </div>
                        <div className="column">
                            <div>
                                <label><FormattedMessage id="project.global.fields.category"/></label>
                                <Select
                                    className="selector"
                                    isClearable
                                    isSearchable
                                    value={categoria}
                                    onChange={setCategoria}
                                    options={categoriaOptions ? categoriaOptions.map(c => selectMapper(c.id, c.name)) : []}
                                />
                            </div>
                            <div>
                                <label><FormattedMessage id="project.global.fields.account"/></label>
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
                    </div>
                </Section>
                <Section title={intl.formatMessage({id: "project.global.fields.amount"})}>
                    <div className="row begin" style={{justifyContent: "space-evenly"}}>
                        <div className="column">
                            <div className="column begin">
                                <label><FormattedMessage id="project.global.fields.base"/> 0:</label>
                                <input type="number" step="0.01" min="0" value={base0}
                                       onChange={e => setBase0(Number(e.target.value))}/>
                            </div>
                        </div>
                        <div className="column">
                            <div className="column begin">
                                <label><FormattedMessage id="project.global.fields.base"/> 4:</label>
                                <input type="number" step="0.01" min="0" value={base4}
                                       onChange={e => setBase4(Number(e.target.value))}/>
                            </div>
                            <div className="column begin">
                                <label><FormattedMessage id="project.global.fields.vat"/> 4:</label>
                                <input type="number" value={iva4} disabled/>
                            </div>
                        </div>
                        <div className="column">
                            <div className="column begin">
                                <label><FormattedMessage id="project.global.fields.base"/> 10:</label>
                                <input type="number" step="0.01" min="0" value={base10}
                                       onChange={e => setBase10(Number(e.target.value))}/>
                            </div>
                            <div className="column begin">
                                <label><FormattedMessage id="project.global.fields.vat"/> 10:</label>
                                <input type="number" value={iva10} disabled/>
                            </div>
                        </div>
                        <div className="column">
                            <div className="column begin">
                                <label><FormattedMessage id="project.global.fields.base"/> 21:</label>
                                <input type="number" step="0.01" min="0" value={base21}
                                       onChange={e => setBase21(Number(e.target.value))}/>
                            </div>
                            <div className="column begin">
                                <label><FormattedMessage id="project.global.fields.vat"/> 21:</label>
                                <input type="number" value={iva21} disabled/>
                            </div>
                        </div>
                        <div className="column">
                            <div className="column begin">
                                <label><FormattedMessage id="project.global.fields.totalBase"/>:</label>
                                <input type="number" value={baseTotal} disabled/>
                            </div>
                            <div className="column begin">
                                <label><FormattedMessage id="project.global.fields.totalVAT"/>:</label>
                                <input type="number" value={ivaTotal} disabled/>
                            </div>
                            <div className="column begin">
                                <label><FormattedMessage id="project.global.fields.total"/>:</label>
                                <input type="number" value={total} disabled/>
                            </div>
                        </div>
                    </div>
                </Section>
                <ActionButton
                    type="submit"
                    htmlType="submit"
                    style={{alignSelf: "end"}}
                >
                    <FormattedMessage id="project.global.fields.update"/>
                </ActionButton>
            </form>
        </div>
    );
}

export default UpdateMovimiento;