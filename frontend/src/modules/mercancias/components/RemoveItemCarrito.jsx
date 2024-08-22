import {ActionButton, Modal} from "../../common";

import * as actions from "../actions.js";
import {FormattedMessage, useIntl} from "react-intl";

const RemoveItemCarrito = ({dispatch, carritoId, articuloId, tallaId, modalActive, setModalActive}) => {
    const intl = useIntl();

    const active = {
        articuloId: articuloId,
        tallaId: tallaId,
        type: "removeItem",
    };

    const isActive =
        modalActive !== null
        && modalActive.articuloId === articuloId
        && modalActive.tallaId === tallaId
        && modalActive.type === "removeItem";

    return (
        <>
            <span
                onClick={() => setModalActive(active)}
                style={{fontSize: '20px'}}
                className="fa-solid fa-trash-can"
            />
            <Modal
                isActive={isActive}
                title={intl.formatMessage({id: 'project.mercancias.RemoveItemCarrito.title'})}
                onClose={() => setModalActive(null)}
            >
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: 20
                }}>
                    <h4><FormattedMessage id="project.mercancias.RemoveItemCarrito.text"/></h4>
                    <div style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                        <ActionButton
                            type="danger"
                            htmlType="button"
                            onClick={() =>
                                setModalActive(null)}
                        >
                            <FormattedMessage id="project.global.button.cancel"/>
                        </ActionButton>
                        <ActionButton
                            type="primary"
                            htmlType="button"
                            onClick={() =>
                                dispatch(actions.removeCarritoItem(
                                    carritoId, articuloId, tallaId,
                                    () => setModalActive(null)
                                ))}
                        >
                            <FormattedMessage id="project.global.button.confirm"/>
                        </ActionButton>
                    </div>
                </div>
            </Modal>
        </>
    );

}

export default RemoveItemCarrito;