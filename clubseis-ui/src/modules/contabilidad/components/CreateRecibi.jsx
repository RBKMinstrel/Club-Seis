import {ActionButton, BackLink, Errors, Section} from "../../common/index.js";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import ConceptoSelect from "./ConceptoSelect.jsx";
import CuentaSelect from "./CuentaSelect.jsx";
import CategoriaSelect from "./CategoriaSelect.jsx";
import RazonSocialSelect from "./RazonSocialSelect.jsx";
import * as actions from "../actions.js";

const CreateRecibi = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [concepto, setConcepto] = useState(null);
    const [razonSocial, setRazonSocial] = useState(null);
    const [categoria, setCategoria] = useState(null);
    const [cuenta, setCuenta] = useState(null);

    const [receptor, setReceptor] = useState("");
    const [receptorRol, setReceptorRol] = useState("");
    const [emisor, setEmisor] = useState("");
    const [precio, setPrecio] = useState(0);
    const [conceptoText, setConceptoText] = useState("");

    const [backendErrors, setBackendErrors] = useState(null);

    let form;

    const handleMockSubmit = event => {

        event.preventDefault();

        if (form.checkValidity()) {

            dispatch(actions.mockRecibi({
                    receptor: receptor.trim(),
                    receptorRol: receptorRol.trim(),
                    emisor: emisor.trim(),
                    precio: precio,
                    concepto: conceptoText.trim(),
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
                    receptorRol: receptorRol.trim(),
                    emisor: emisor.trim(),
                    precio: precio,
                    concepto: conceptoText.trim(),
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
                <Section title="Datos recibi">
                    <div style={{display: "flex", flexDirection: "column", justifyContent: "space-around", gap: 10}}>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-around",
                            alignItems: "start",
                            width: "100%",
                            gap: 8
                        }}>
                            <label>Receptor</label>
                            <textarea rows="2" cols="120" value={receptor} onChange={e => setReceptor(e.target.value)}
                                      required/>
                        </div>
                        <div style={{display: "flex", gap: 20, alignItems: "flex-end", width: "100%"}}>
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-around",
                                alignItems: "start",
                                gap: 8
                            }}>
                                <label>Rol del receptor</label>
                                <textarea rows="2" cols="60" value={receptorRol}
                                          onChange={e => setReceptorRol(e.target.value)} required/>
                            </div>
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-around",
                                alignItems: "start",
                                gap: 8
                            }}>
                                <label>Cantidad (en euros):</label>
                                <input type="number" step="0.01" min="0" value={precio}
                                       onChange={e => setPrecio(Number(e.target.value))}/>
                            </div>
                        </div>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-around",
                            alignItems: "start",
                            width: "100%",
                            gap: 8
                        }}>
                            <label>Emisor</label>
                            <textarea rows="2" cols="120" value={emisor} onChange={e => setEmisor(e.target.value)}
                                      required/>
                        </div>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-around",
                            alignItems: "start",
                            width: "100%",
                            gap: 8
                        }}>
                            <label>Concepto</label>
                            <textarea rows="2" cols="120" value={conceptoText}
                                      onChange={e => setConceptoText(e.target.value)} required/>
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

export default CreateRecibi;