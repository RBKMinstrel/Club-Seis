import {useState} from "react";

import {ActionButton, Modal} from "../../common";

import * as actions from "../actions.js";
import {FormattedMessage, useIntl} from "react-intl";

const DeletePedido = ({dispatch, selectedRows, setBackendErrors, setForceUpdate}) => {
    const intl = useIntl();

    const [modal, setModal] = useState(false);

    return (
        <>
            <ActionButton
                type="danger"
                htmlType="button"
                onClick={() => setModal(true)}
                disabled={selectedRows.length !== 1}
            >
                <FormattedMessage id="project.global.button.delete"/>
            </ActionButton>
            <Modal
                isActive={modal}
                onClose={() => setModal(false)}
                title={intl.formatMessage({id: 'project.mercancias.DeletePedido.title'})}
            >
                <>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <p><FormattedMessage id="project.mercancias.DeletePedido.text"/></p>
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
                                dispatch(actions.deletePedido(
                                    Number(selectedRows[0].split("-")[1]),
                                    () => {
                                        setModal(false);
                                        alert(intl.formatMessage({id: "project.mercancias.DeletePedido.success"}))
                                        setForceUpdate((prev) => !prev);
                                    },
                                    errors => {
                                        setModal(false);
                                        setBackendErrors(errors)
                                    }
                                ))}
                        >
                            <FormattedMessage id="project.global.button.confirm"/>
                        </ActionButton>
                    </div>
                </>
            </Modal>
        </>
    )

}

export default DeletePedido;