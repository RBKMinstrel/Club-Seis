import {ActionButton, BackLink, Errors, Section} from "../../common/index.js";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import ConceptoSelect from "./ConceptoSelect.jsx";
import CuentaSelect from "./CuentaSelect.jsx";
import CategoriaSelect from "./CategoriaSelect.jsx";
import RazonSocialSelect from "./RazonSocialSelect.jsx";
import Select from "react-select";
import {fromStringDateToNumber, todayStringDate} from "../../utils/dataUtils.js";

import * as actions from "../actions.js";

const CreateFactura = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const ivaOptions = [
        {label: "IVA4%", value: 1},
        {label: "IVA10%", value: 2},
        {label: "IVA21%", value: 3},
    ]

    const [concepto, setConcepto] = useState(null);
    const [razonSocial, setRazonSocial] = useState(null);
    const [categoria, setCategoria] = useState(null);
    const [cuenta, setCuenta] = useState(null);

    const [fecha, setFecha] = useState(todayStringDate());
    const [codigo, setCodigo] = useState("");
    const [receptor, setReceptor] = useState("");
    const [items, setItems] = useState([{key: Date.now(), concepto: '', cantidad: 1, iva: 1, amount: 0}]);

    const [backendErrors, setBackendErrors] = useState(null);

    let form;

    const handleAddItem = () => {
        setItems([...items, {key: Date.now(), concepto: '', cantidad: 1, iva: 1, amount: 0}]);
    };

    const handleRemoveItem = (index) => {
        if (items.length > 1) {
            setItems(items.filter((_, i) => i !== index));
        }
    };

    const handleInputChange = (index, event) => {
        const {name, value} = event.target;
        const newItems = [...items];
        newItems[index][name] = name === 'amount' ? parseFloat(value) || 0 : value;
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

            dispatch(actions.createRecibi({
                    conceptoId: concepto,
                    razonSocialId: razonSocial,
                    categoriaId: categoria,
                    cuentaId: cuenta,
                    receptor: receptor.trim(),
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
                <Section title="Datos identificativos">
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
                <Section title="Datos factura">
                    <div style={{display: "flex", justifyContent: "space-between", gap: 10, padding: "0 20px"}}>
                        <div style={{display: "flex", flexDirection: "column", gap: 10, width: "35%"}}>
                            <div style={{display: "flex", flexDirection: "column", gap: 8}}>
                                <label>Fecha factura:</label>
                                <input
                                    type="date"
                                    value={fecha}
                                    onChange={e => setFecha(e.target.value)}
                                />
                            </div>
                            <div style={{display: "flex", flexDirection: "column", gap: 8}}>
                                <label>Codigo factura:</label>
                                <input
                                    type="text"
                                    value={codigo}
                                    onChange={e => setCodigo(e.target.value)}
                                />
                            </div>
                            <div style={{display: "flex", flexDirection: "column", gap: 8}}>
                                <label>Factura a:</label>
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
                                <label>Items: </label>
                                <span
                                    onClick={handleAddItem}
                                    style={{fontSize: '20px'}}
                                    className="fa-solid fa-plus-circle"
                                />
                            </div>
                            <div style={{display: "flex", flexDirection: "column", gap: 10, maxWidth: "100%"}}>
                                {items.map((item, index) => (
                                    <div style={{display: "flex", gap: 8}} key={item.key}>
                                        <textarea
                                            name="concepto"
                                            required
                                            placeholder="Concepto"
                                            value={item.name}
                                            onChange={(event) => handleInputChange(index, event)}
                                            style={{flexGrow: 1, resize: 'vertical'}}
                                        />
                                        <Select
                                            value={ivaOptions.find(i => i.value === item.iva)}
                                            onChange={(selectedOption) => handleSelectChange(index, selectedOption)}
                                            options={ivaOptions}
                                            placeholder="Select an option"
                                        />
                                        <input
                                            type="number"
                                            name="amount"
                                            required
                                            step="0.01"
                                            placeholder="Cantidad"
                                            value={item.amount}
                                            onChange={(event) => handleInputChange(index, event)}
                                        />
                                        <ActionButton
                                            htmlType="button"
                                            type="danger"
                                            onClick={() => handleRemoveItem(index)}
                                            disabled={items.length === 1}
                                        >
                                            Quitar
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
                        Mock
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