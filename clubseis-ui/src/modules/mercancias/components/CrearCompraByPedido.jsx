import {useState} from "react";

import {ActionButton, Modal} from "../../common";

import * as actions from "../actions.js";
import {FormattedMessage, useIntl} from "react-intl";

const CrearCompraByPedido = ({dispatch, selectedRows, setBackendErrors, setForceUpdate}) => {
    const intl = useIntl();

    const [modal, setModal] = useState(false);
    const [esSocio, setEsSocio] = useState(false);

    return (
        <>
            <ActionButton
                type="primary"
                htmlType="button"
                onClick={() => setModal(true)}
                disabled={selectedRows.length !== 1}
            >
                <FormattedMessage id="project.global.button.buy"/>
            </ActionButton>
            <Modal
                isActive={modal}
                onClose={() => setModal(false)}
                title={intl.formatMessage({id: "project.mercancias.CrearCompraByPedido.title"})}
            >
                <>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <>
                            <input type="checkbox" checked={esSocio} onChange={e => setEsSocio((prev) => !prev)}/>
                            <label> <FormattedMessage id="project.global.fields.member"/></label>
                        </>
                    </div>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <ActionButton
                            type="danger"
                            htmlType="button"
                            onClick={() => setModal(false)}
                        >
                            <FormattedMessage id="project.global.button.cancel"/>
                        </ActionButton>
                        <ActionButton
                            type="primary"
                            htmlType="button"
                            onClick={() =>
                                dispatch(actions.createVentaByPedido(
                                    Number(selectedRows[0].split("-")[1]), esSocio,
                                    () => {
                                        setModal(false);
                                        alert(intl.formatMessage({id: "project.mercancias.CrearCompraByPedido.success"}))
                                        setForceUpdate((prev) => !prev)
                                    },
                                    errors => {
                                        setModal(false);
                                        setBackendErrors(errors)
                                    }
                                ))}
                        >
                            <FormattedMessage id="project.global.button.buy"/>
                        </ActionButton>
                    </div>
                </>
            </Modal>
        </>
    )

}

export default CrearCompraByPedido;