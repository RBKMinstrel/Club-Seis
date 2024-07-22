import {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import {ActionButton, BackLink, Errors, Section} from "../../common";
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
    const [factura, setFactura] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileExtension, setFileExtension] = useState('');
    const [fileContent, setFileContent] = useState('');
    const [codigo, setCodigo] = useState('');
    const [tipo, setTipo] = useState(1);
    const [anotacion, setAnotacion] = useState('');
    const [emisorReceptor, setEmisorReceptor] = useState('');
    const [backendErrors, setBackendErrors] = useState(null);

    const tiposOptions = [
        {label: "Factura", value: 1},
        {label: "Recibi", value: 2},
    ];

    const fileInputRef = useRef(null);

    const iva4 = redondear(base4 * 0.04);
    const iva10 = redondear(base10 * 0.1);
    const iva21 = redondear(base21 * 0.21);
    const baseTotal = Number((base0 + base4 + base10 + base21).toFixed(2));
    const ivaTotal = Number((iva4 + iva10 + iva21).toFixed(2));
    const total = Number((baseTotal + ivaTotal).toFixed(2));

    let form;

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1];
                setFileExtension(file.type);
                setFileContent(base64String);
                setSelectedFile(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleReset = (e) => {
        setFileExtension('');
        setFileContent('');
        setSelectedFile(null);
        fileInputRef.current.value = null;
    };

    const handleSubmit = event => {

        event.preventDefault();

        if (form.checkValidity()) {

            let movimiento = {};

            if (factura) {
                movimiento = {
                    tipo: tipo,
                    codigo: codigo.trim() === '' ? null : codigo.trim(),
                    fileContent: fileContent,
                    fileExtension: fileExtension,
                    anotacion: anotacion.trim() === '' ? null : anotacion.trim(),
                }

                movimiento = gasto
                    ? {...movimiento, receptor: emisorReceptor.trim()}
                    : {...movimiento, emisor: emisorReceptor.trim()};
            }

            dispatch(actions.createMovimiento({
                    ...movimiento,
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

    const selectMapper = (value, label) => {
        return ({value: value, label: label})
    };

    const razonText = (r) => {
        return r.denominacion + "(" + r.cifnif + ")";
    }

    return (
        <div style={{display: "flex", flexDirection: "column", gap: 10}}>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <BackLink style={{alignSelf: "start"}}/>
            <form ref={node => form = node}
                  className="column"
                  noValidate
                  onSubmit={e => handleSubmit(e)}>
                <Section title="Datos identificativos">
                    <div className="row" style={{justifyContent: "space-around"}}>
                        <div className="column">
                            <div className="row">
                                <div>
                                    <input type="radio" value="ingreso" checked={!gasto}
                                           onChange={() => setGasto(false)}/>
                                    <label>Ingreso</label>
                                </div>
                                <div>
                                    <input type="radio" value="gasto" checked={gasto} onChange={() => setGasto(true)}/>
                                    <label>Gasto</label>
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
                            <div>
                                <input type="checkbox" checked={factura} onChange={() => setFactura((prev) => !prev)}/>
                                <label>Factura</label>
                            </div>
                        </div>
                        <div className="column">
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
                        </div>
                        <div className="column">
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
                    </div>
                </Section>
                <Section title="Cuantia">
                    <div className="row begin" style={{justifyContent: "space-evenly"}}>
                        <div className="column">
                            <div className="column begin">
                                <label>Base 0:</label>
                                <input type="number" step="0.01" min="0" value={base0}
                                       onChange={e => setBase0(Number(e.target.value))}/>
                            </div>
                        </div>
                        <div className="column">
                            <div className="column begin">
                                <label>Base 4:</label>
                                <input type="number" step="0.01" min="0" value={base4}
                                       onChange={e => setBase4(Number(e.target.value))}/>
                            </div>
                            <div className="column begin">
                                <label>Iva 4:</label>
                                <input type="number" value={iva4} disabled/>
                            </div>
                        </div>
                        <div className="column">
                            <div className="column begin">
                                <label>Base 10:</label>
                                <input type="number" step="0.01" min="0" value={base10}
                                       onChange={e => setBase10(Number(e.target.value))}/>
                            </div>
                            <div className="column begin">
                                <label>Iva 10:</label>
                                <input type="number" value={iva10} disabled/>
                            </div>
                        </div>
                        <div className="column">
                            <div className="column begin">
                                <label>Base 21:</label>
                                <input type="number" step="0.01" min="0" value={base21}
                                       onChange={e => setBase21(Number(e.target.value))}/>
                            </div>
                            <div className="column begin">
                                <label>Iva 21:</label>
                                <input type="number" value={iva21} disabled/>
                            </div>
                        </div>
                        <div className="column">
                            <div className="column begin">
                                <label>Total Base:</label>
                                <input type="number" value={baseTotal} disabled/>
                            </div>
                            <div className="column begin">
                                <label>Total Iva:</label>
                                <input type="number" value={ivaTotal} disabled/>
                            </div>
                            <div className="column begin">
                                <label>Total:</label>
                                <input type="number" value={total} disabled/>
                            </div>
                        </div>
                    </div>
                </Section>
                {factura && (
                    <Section title="Subir factura">
                        <div style={{display: "flex", justifyContent: "space-around", gap: 20}}>
                            <div style={{display: "flex", flexDirection: "column", gap: 10}}>
                                <div className="column begin">
                                    <label>Tipo:</label>
                                    <Select
                                        value={tiposOptions.find(t => t.value === tipo)}
                                        onChange={e => setTipo(e.value)}
                                        options={tiposOptions}
                                    />
                                </div>
                                <div className="column begin">
                                    <label>Codigo:</label>
                                    <input
                                        type="text"
                                        value={codigo}
                                        onChange={e => setCodigo(e.target.value)}
                                    />
                                </div>
                                <div className="column begin">
                                    <label>Seleccione un archivo:</label>
                                    <input
                                        type="file"
                                        required
                                        onChange={handleFileChange}
                                        accept="application/pdf"
                                        ref={fileInputRef}
                                    />
                                </div>
                            </div>
                            <div style={{display: "flex", flexDirection: "column", gap: 10}}>
                                <div className="column begin">
                                    <label>Emisor/Receptor:</label>
                                    <textarea
                                        required
                                        value={emisorReceptor}
                                        onChange={e => setEmisorReceptor(e.target.value)}
                                        rows="2"
                                        cols="120"
                                    />
                                </div>
                                <div className="column begin">
                                    <label>Anotacion:</label>
                                    <textarea
                                        value={anotacion}
                                        onChange={e => setAnotacion(e.target.value)}
                                        rows="4"
                                        cols="120"
                                    />
                                </div>
                            </div>
                        </div>
                    </Section>
                )}
                <ActionButton
                    type="submit"
                    htmlType="submit"
                    style={{alignSelf: "end"}}
                >
                    Crear
                </ActionButton>
            </form>
        </div>
    );
}

export default CreateMovimiento;