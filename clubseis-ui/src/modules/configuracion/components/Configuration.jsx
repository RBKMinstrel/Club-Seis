import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import {ActionButton} from "../../common/index.js";

import * as actions from "../actions.js";
import * as selectors from "../selectors.js";
import {FormattedMessage} from "react-intl";

const Configuration = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const config = useSelector(selectors.getConfigBase);

    const [club, setClub] = useState("");
    const [direccion, setDireccion] = useState("");
    const [telefono, setTelefono] = useState("");
    const [nif, setNif] = useState("");
    const [otros, setOtros] = useState("");

    let form;

    useEffect(() => {
        dispatch(actions.findConfigBase());

        return () => dispatch(actions.clearConfigBase());
    }, []);

    useEffect(() => {
        if (config) {
            setClub(config.club);
            setDireccion(config.direccion);
            setTelefono(config.telefono);
            setNif(config.nif);
            setOtros(config.otros);
        }
    }, [config]);

    if (!config)
        return null;

    const handleSubmit = event => {

        event.preventDefault();

        if (form.checkValidity()) {

            dispatch(actions.updateConfiguracionBase({
                    club: club.trim(),
                    direccion: direccion.trim(),
                    telefono: telefono.trim(),
                    nif: nif.trim(),
                    otros: otros.trim(),
                },
                () => navigate('/gestion')));

        }

    }

    return (
        <>
            <div style={{borderBottom: "1px solid black", paddingBottom: "1rem"}}>
                <h2><FormattedMessage id="project.configuracion.Configuration.title"/></h2>
            </div>
            <>
                <form ref={node => form = node}
                      noValidate onSubmit={e => handleSubmit(e)}>
                    <div style={{margin: "15px 0"}}>
                        <div style={{margin: "0 0 6px"}}>
                            <label><FormattedMessage id="project.configuracion.Configuration.nameClub"/>:</label>
                        </div>
                        <div>
                            <input
                                value={club}
                                onChange={e => setClub(e.target.value)}
                                required
                                style={{width: 600, maxWidth: "100%", padding: "5px 12px", borderRadius: 6}}
                            />
                            <div style={{fontSize: 12, margin: "0.25rem 0 2px"}}>
                                <FormattedMessage id="project.configuracion.Configuration.nameClubDescription"/>
                            </div>
                        </div>
                    </div>
                    <div style={{margin: "15px 0"}}>
                        <div style={{margin: "0 0 6px"}}>
                            <label><FormattedMessage id="project.configuracion.Configuration.direction"/>:</label>
                        </div>
                        <div>
                            <input
                                value={direccion}
                                onChange={e => setDireccion(e.target.value)}
                                required
                                style={{width: 600, maxWidth: "100%", padding: "5px 12px", borderRadius: 6}}
                            />
                            <div style={{fontSize: 12, margin: "0.25rem 0 2px"}}>
                                <FormattedMessage id="project.configuracion.Configuration.directionDescription"/>
                            </div>
                        </div>
                    </div>
                    <div style={{margin: "15px 0"}}>
                        <div style={{margin: "0 0 6px"}}>
                            <label><FormattedMessage id="project.configuracion.Configuration.phonenumber"/>:</label>
                        </div>
                        <div>
                            <input
                                value={telefono}
                                onChange={e => setTelefono(e.target.value)}
                                required
                                style={{width: 600, maxWidth: "100%", padding: "5px 12px", borderRadius: 6}}
                            />
                            <div style={{fontSize: 12, margin: "0.25rem 0 2px"}}>
                                <FormattedMessage id="project.configuracion.Configuration.phonenumberDescription"/>
                            </div>
                        </div>
                    </div>
                    <div style={{margin: "15px 0"}}>
                        <div style={{margin: "0 0 6px"}}>
                            <label><FormattedMessage id="project.configuracion.Configuration.nif"/>:</label>
                        </div>
                        <div>
                            <input
                                value={nif}
                                onChange={e => setNif(e.target.value)}
                                required
                                style={{width: 600, maxWidth: "100%", padding: "5px 12px", borderRadius: 6}}
                            />
                            <div style={{fontSize: 12, margin: "0.25rem 0 2px"}}>
                                <FormattedMessage id="project.configuracion.Configuration.nifDescription"/>
                            </div>
                        </div>
                    </div>
                    <div style={{margin: "15px 0"}}>
                        <div style={{margin: "0 0 6px"}}>
                            <label><FormattedMessage id="project.configuracion.Configuration.otherData"/>:</label>
                        </div>
                        <div>
                            <input
                                value={otros}
                                onChange={e => setOtros(e.target.value)}
                                style={{width: 600, maxWidth: "100%", padding: "5px 12px", borderRadius: 6}}
                            />
                            <div style={{fontSize: 12, margin: "0.25rem 0 2px"}}>
                                <FormattedMessage id="project.configuracion.Configuration.otherDataDescription"/>
                            </div>
                        </div>
                    </div>
                    <ActionButton
                        type="primary"
                        htmlType="submit"
                    >
                        <FormattedMessage id="project.global.fields.save"/>
                    </ActionButton>
                </form>
            </>
        </>
    );

}

export default Configuration;