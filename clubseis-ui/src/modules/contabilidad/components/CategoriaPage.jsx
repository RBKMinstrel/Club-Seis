import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {Errors, Section} from "../../common";
import CategoriaCreateForm from "./CategoriaCreateForm.jsx";
import CategoriaUpdateForm from "./CategoriaUpdateForm.jsx";

import * as selectors from '../selectors';
import * as actions from '../actions';

const CategoriaPage = () => {
    const dispatch = useDispatch();
    const categorias = useSelector(selectors.getCategorias) || [];

    const [selected, setSelected] = useState(null);

    const [backendErrors, setBackendErrors] = useState(null);

    useEffect(() => {
        dispatch(actions.findAllCategorias());
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
                    <h2>Categorias</h2>
                    <div style={{width: "100%"}}>
                        {categorias.map((categoria) => (
                            <div key={categoria.id} style={{
                                padding: 10,
                                border: "1px solid #ccc",
                                marginBottom: 10,
                                width: "100%",
                                cursor: "pointer"
                            }}
                                 onClick={() => setSelected(categoria)}>
                                {categoria.name}
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
                            <Section title="Crear categoria">
                                <CategoriaCreateForm
                                    onSuccess={() => setSelected(null)}
                                    onErrors={setBackendErrors}
                                />
                            </Section>
                        ) : (
                            <>
                                <Section title="Actualizar categoria">
                                    <CategoriaUpdateForm
                                        categoria={selected}
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

export default CategoriaPage;
