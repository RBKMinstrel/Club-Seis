import {useState} from "react";

import {ActionButton, Modal} from "../../common";

import * as actions from "../actions.js";

const DeletePedido = ({dispatch, selectedRows, setBackendErrors, setForceUpdate}) => {
    const [modal, setModal] = useState(false);

    return (
        <>
            <ActionButton
                type="danger"
                htmlType="button"
                onClick={() => setModal(true)}
                disabled={selectedRows.length !== 1}
            >
                Eliminar
            </ActionButton>
            <Modal
                isActive={modal}
                onClose={() => setModal(false)}
                title="Eliminar pedido"
            >
                <>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <p>Esta accion no se puede deshacer, esta seguro?</p>
                    </div>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <ActionButton
                            type="danger"
                            htmlType="button"
                            onClick={() => setModal(false)}
                        >
                            Cancelar
                        </ActionButton>
                        <ActionButton
                            type="primary"
                            htmlType="button"
                            onClick={() =>
                                dispatch(actions.deletePedido(
                                    Number(selectedRows[0].split("-")[1]),
                                    () => {
                                        setModal(false);
                                        alert("Pedido eliminado exitosamente")
                                        setForceUpdate((prev) => !prev);
                                    },
                                    errors => {
                                        setModal(false);
                                        setBackendErrors(errors)
                                    }
                                ))}
                        >
                            Aceptar
                        </ActionButton>
                    </div>
                </>
            </Modal>
        </>
    )

}

export default DeletePedido;