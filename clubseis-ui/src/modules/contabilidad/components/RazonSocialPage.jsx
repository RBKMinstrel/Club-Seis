import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {ActionButton, Errors, Section} from "../../common";
import RazonSocialCreateForm from "./RazonSocialCreateForm.jsx";
import RazonSocialUpdateForm from "./RazonSocialUpdateForm.jsx";

import * as selectors from '../selectors';
import * as actions from '../actions';
import {FormattedMessage} from "react-intl";

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
                    <h2><FormattedMessage id="project.global.fields.registeredNames"/></h2>
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
                            <ActionButton
                                type="secondary"
                                htmlType="button"
                                onClick={() => setSelected(null)}
                                style={{marginTop: 10}}
                            >
                                <FormattedMessage id="project.global.button.cleanSelect"/>
                            </ActionButton>
                        )}
                    </div>
                </div>
                <div style={{width: "40%", paddingTop: 40, display: "flex", flexDirection: "column", gap: 20}}>
                    {
                        !selected ? (
                            <Section
                                title={intl.formatMessage({id: 'project.contabilidad.RazonSocialPage.createTitle'})}>
                                <RazonSocialCreateForm
                                    onSuccess={() => setSelected(null)}
                                    onErrors={setBackendErrors}
                                />
                            </Section>
                        ) : (
                            <>
                                <Section
                                    title={intl.formatMessage({id: 'project.contabilidad.RazonSocialPage.updateTitle'})}>
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