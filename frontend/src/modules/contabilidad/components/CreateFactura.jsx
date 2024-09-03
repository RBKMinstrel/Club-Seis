import {ActionButton, BackLink, Errors, Section} from "../../common/index.js";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import Select from "react-select";
import {FormattedMessage, useIntl} from "react-intl";

import ConceptoSelect from "./ConceptoSelect.jsx";
import CuentaSelect from "./CuentaSelect.jsx";
import CategoriaSelect from "./CategoriaSelect.jsx";
import RazonSocialSelect from "./RazonSocialSelect.jsx";
import {fromStringDateToNumber, todayStringDate} from "../../utils/dateUtils.js";

import * as actions from "../actions.js";

const CreateFactura = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const intl = useIntl();
    const ivaName = intl.formatMessage({id: "project.global.fields.vat"});

    const ivaOptions = [
        {label: ivaName + "4%", value: 1},
        {label: ivaName + "10%", value: 2},
        {label: ivaName + "21%", value: 3},
    ]

    const [concepto, setConcepto] = useState(null);
    const [razonSocial, setRazonSocial] = useState(null);
    const [categoria, setCategoria] = useState(null);
    const [cuenta, setCuenta] = useState(null);

    const [fecha, setFecha] = useState(todayStringDate());
    const [codigo, setCodigo] = useState("");
    const [receptor, setReceptor] = useState("");
    const [items, setItems] = useState([{key: Date.now(), concepto: '', cantidad: 1, iva: 1, amount: 0.01}]);

    const [backendErrors, setBackendErrors] = useState(null);

    let form;

    const handleAddItem = () => {
        setItems([...items, {key: Date.now(), concepto: '', cantidad: 1, iva: 1, amount: 0.01}]);
    };

    const handleRemoveItem = (index) => {
        if (items.length > 1) {
            setItems(items.filter((_, i) => i !== index));
        }
    };

    const handleInputChange = (index, event) => {
        const {name, value} = event.target;
        const newItems = [...items];
        if (name === 'cantidad' || name === 'amount') {
            newItems[index][name] = Number(value) || 0;
        } else {
            newItems[index][name] = value;
        }
        setItems(newItems);
    };

    const handleSelectChange = (index, selectedOption) => {
        const newItems = [...items];
        newItems[index].iva = selectedOption.value;
        setItems(newItems);
    };

    const handleMockSubmit = event => {

        event.preventDefault();

        if (form.checkValidity()) {

            dispatch(actions.mockFactura({
                    fecha: fromStringDateToNumber(fecha),
                    codigo: codigo.trim(),
                    receptor: receptor.trim(),
                    facturaItems: items,
                },
                errors => setBackendErrors(errors)
            ));

        } else {
            setBackendErrors(null);
        }

    }

    const handleCreateSubmit = event => {

        event.preventDefault();

        if (form.checkValidity()) {

            dispatch(actions.createFactura({
                    conceptoId: concepto,
                    razonSocialId: razonSocial,
                    categoriaId: categoria,
                    cuentaId: cuenta,
                    fecha: fromStringDateToNumber(fecha),
                    codigo: codigo.trim(),
                    receptor: receptor.trim(),
                    facturaItems: items,
                },
                () => navigate("/gestion/contabilidad/facturas"),
                errors => setBackendErrors(errors)
            ));

        } else {
            setBackendErrors(null);
        }

    }

    return (
        <div style={{display: "flex", flexDirection: "column", gap: 10}}>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <BackLink style={{alignSelf: "start"}}/>
            <form ref={node => form = node}
                  className="column"
                  noValidate>
                <Section title={intl.formatMessage({id: 'project.global.title.identificationData'})}>
                    <div className="row" style={{justifyContent: "space-around"}}>
                        <ConceptoSelect concepto={concepto} setConcepto={setConcepto} label={true} isClearable={true}
                                        style={{width: "20%"}}/>
                        <RazonSocialSelect razonSocial={razonSocial} setRazonSocial={setRazonSocial} label={true}
                                           isClearable={true} style={{width: "20%"}}/>
                        <CategoriaSelect categoria={categoria} setCategoria={setCategoria} label={true}
                                         isClearable={true} style={{width: "20%"}}/>
                        <CuentaSelect cuenta={cuenta} setCuenta={setCuenta} label={true} isClearable={true}
                                      style={{width: "20%"}}/>
                    </div>
                </Section>
                <Section title={intl.formatMessage({id: 'project.global.title.billData'})}>
                    <div style={{display: "flex", justifyContent: "space-between", gap: 10, padding: "0 20px"}}>
                        <div style={{display: "flex", flexDirection: "column", gap: 10, width: "35%"}}>
                            <div style={{display: "flex", flexDirection: "column", gap: 8}}>
                                <label><FormattedMessage id="project.contabilidad.CreateFactura.billData"/>:</label>
                                <input
                                    type="date"
                                    value={fecha}
                                    onChange={e => setFecha(e.target.value)}
                                />
                            </div>
                            <div style={{display: "flex", flexDirection: "column", gap: 8}}>
                                <label><FormattedMessage id="project.contabilidad.CreateFactura.billCode"/>:</label>
                                <input
                                    type="text"
                                    value={codigo}
                                    onChange={e => setCodigo(e.target.value)}
                                />
                            </div>
                            <div style={{display: "flex", flexDirection: "column", gap: 8}}>
                                <label><FormattedMessage id="project.contabilidad.CreateFactura.billTo"/>:</label>
                                <textarea
                                    required
                                    value={receptor}
                                    onChange={(e) => setReceptor(e.target.value)}
                                    style={{flexGrow: 1, resize: 'vertical', minHeight: 150}}
                                />
                            </div>
                        </div>
                        <div style={{display: "flex", flexDirection: "column", gap: 10, width: "60%"}}>
                            <div style={{display: "flex", justifyContent: "space-between", gap: 10}}>
                                <label><FormattedMessage id="project.contabilidad.CreateFactura.billItems"/>: </label>
                                <span
                                    onClick={handleAddItem}
                                    style={{fontSize: '20px'}}
                                    className="fa-solid fa-plus-circle"
                                />
                            </div>
                            <div style={{display: "flex", flexDirection: "column", gap: 10, maxWidth: "100%"}}>
                                {items.map((item, index) => (
                                    <div style={{display: "flex", gap: 8}} key={item.key}>
                                        <input
                                            type="number"
                                            name="cantidad"
                                            required
                                            min="1"
                                            step="1"
                                            placeholder={intl.formatMessage({id: 'project.global.fields.quantity'})}
                                            value={item.cantidad}
                                            onChange={(event) => handleInputChange(index, event)}
                                            style={{width: 80}}
                                        />
                                        <textarea
                                            name="concepto"
                                            required
                                            placeholder={intl.formatMessage({id: 'project.global.fields.concept'})}
                                            value={item.name}
                                            onChange={(event) => handleInputChange(index, event)}
                                            style={{flexGrow: 1, resize: 'vertical'}}
                                        />
                                        <Select
                                            value={ivaOptions.find(i => i.value === item.iva)}
                                            onChange={(selectedOption) => handleSelectChange(index, selectedOption)}
                                            options={ivaOptions}
                                            placeholder={ivaName}
                                        />
                                        <input
                                            type="number"
                                            name="amount"
                                            required
                                            min="0.01"
                                            step="0.01"
                                            placeholder={intl.formatMessage({id: 'project.global.fields.amount'})}
                                            value={item.amount}
                                            onChange={(event) => handleInputChange(index, event)}
                                        />
                                        <ActionButton
                                            htmlType="button"
                                            type="danger"
                                            onClick={() => handleRemoveItem(index)}
                                            disabled={items.length === 1}
                                        >
                                            <FormattedMessage id="project.global.button.remove"/>
                                        </ActionButton>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Section>
                <div style={{display: "flex", justifyContent: "flex-end", width: "100%", gap: 10}}>
                    <ActionButton
                        type="secondary"
                        htmlType="button"
                        onClick={e => handleMockSubmit(e)}
                    >
                        Vista Previa
                    </ActionButton>
                    <ActionButton
                        type="primary"
                        htmlType="button"
                        onClick={e => handleCreateSubmit(e)}
                    >
                        Crear
                    </ActionButton>
                </div>
            </form>
        </div>
    );

}

export default CreateFactura;