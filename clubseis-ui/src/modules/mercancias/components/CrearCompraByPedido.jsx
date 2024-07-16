import {useState} from "react";

import {ActionButton, Modal} from "../../common";

import * as actions from "../actions.js";

const CrearCompraByPedido = ({dispatch, selectedRows, setBackendErrors, setForceUpdate}) => {
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
                Comprar
            </ActionButton>
            <Modal
                isActive={modal}
                onClose={() => setModal(false)}
                title="Crear compra a partir de pedido"
            >
                <>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <>
                            <input type="checkbox" checked={esSocio} onChange={e => setEsSocio((prev) => !prev)}/>
                            <label> Socio</label>
                        </>
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
                                dispatch(actions.createVentaByPedido(
                                    Number(selectedRows[0].split("-")[1]), esSocio,
                                    () => {
                                        setModal(false);
                                        alert("Compra realizada con exito")
                                        setForceUpdate((prev) => !prev)
                                    },
                                    errors => {
                                        setModal(false);
                                        setBackendErrors(errors)
                                    }
                                ))}
                        >
                            Comprar
                        </ActionButton>
                    </div>
                </>
            </Modal>
        </>
    )

}

export default CrearCompraByPedido;