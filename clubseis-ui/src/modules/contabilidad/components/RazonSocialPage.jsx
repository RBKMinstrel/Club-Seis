import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {Errors, Section} from "../../common";
import RazonSocialCreateForm from "./RazonSocialCreateForm.jsx";
import RazonSocialUpdateForm from "./RazonSocialUpdateForm.jsx";

import * as selectors from '../selectors';
import * as actions from '../actions';

const RazonSocialPage = () => {
    const dispatch = useDispatch();
    const razonesSociales = useSelector(selectors.getRazonesSociales) || [];

    const [selected, setSelected] = useState(null);

    const [backendErrors, setBackendErrors] = useState(null);

    useEffect(() => {
        dispatch(actions.findAllRazonSocial());
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
                    <h2>Razones Sociales</h2>
                    <div style={{width: "100%"}}>
                        {razonesSociales.map((razonSocial) => (
                            <div key={razonSocial.id} style={{
                                padding: 10,
                                border: "1px solid #ccc",
                                marginBottom: 10,
                                width: "100%",
                                cursor: "pointer",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                                 onClick={() => setSelected(razonSocial)}>
                                <div>{razonSocial.denominacion}</div>
                                <div>{razonSocial.cifnif}</div>
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
                            <Section title="Crear razon social">
                                <RazonSocialCreateForm
                                    onSuccess={() => setSelected(null)}
                                    onErrors={setBackendErrors}
                                />
                            </Section>
                        ) : (
                            <>
                                <Section title="Actualizar razon social">
                                    <RazonSocialUpdateForm
                                        razonSocial={selected}
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

export default RazonSocialPage;