import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {Errors, Section} from "../../common";
import CuentaCreateForm from "./CuentaCreateForm.jsx";
import CuentaUpdateForm from "./CuentaUpdateForm.jsx";

import * as selectors from '../selectors';
import * as actions from '../actions';

const CuentaPage = () => {
    const dispatch = useDispatch();
    const cuentas = useSelector(selectors.getCuentas) || [];

    const [selected, setSelected] = useState(null);

    const [backendErrors, setBackendErrors] = useState(null);

    useEffect(() => {
        dispatch(actions.findAllCuentas());
    }, [dispatch]);

    return (
        <div style={{display: "flex", flexDirection: "column", height: "100%"}}>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <div style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "flex-start",
                gap: 10,
                height: "100%"
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 10,
                    width: "40%",
                    alignSelf: "flex-start"
                }}>
                    <h2>Cuentas</h2>
                    <div style={{width: "100%"}}>
                        {cuentas.map((cuenta) => (
                            <div key={cuenta.id} style={{
                                padding: 10,
                                border: "1px solid #ccc",
                                marginBottom: 10,
                                width: "100%",
                                cursor: "pointer"
                            }}
                                 onClick={() => setSelected(cuenta)}>
                                {cuenta.name}
                            </div>
                        ))}
                        {selected && (
                            <button onClick={() => setSelected(null)} style={{marginTop: 10}}>
                                Limpiar Selección
                            </button>
                        )}
                    </div>
                </div>
                <div style={{width: "40%", paddingTop: 40, display: "flex", flexDirection: "column", gap: 20}}>
                    {
                        !selected ? (
                            <Section title="Crear cuenta">
                                <CuentaCreateForm
                                    onSuccess={() => setSelected(null)}
                                    onErrors={setBackendErrors}
                                />
                            </Section>
                        ) : (
                            <>
                                <Section title="Actualizar cuenta">
                                    <CuentaUpdateForm
                                        cuenta={selected}
                                        onSuccess={() => setSelected(null)}
                                        onErrors={setBackendErrors}
                                    />
                                </Section>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default CuentaPage;