import {ActionButton, Modal} from "../../common";

import * as actions from "../actions.js";
import {FormattedMessage, useIntl} from "react-intl";

const UpdateItemCarrito = ({
        dispatch, carritoId, articuloId, tallaId,
        itemsData, setItemsData, modalActive, setModalActive
                           }) => {
    const intl = useIntl();

    const encontrarIndice = (array, condicion) => {//Find index no funciona
        for (let i = 0; i < array.length; i++) {
            if (condicion(array[i])) {
                return i;
            }
        }
        return -1; // Si no se encuentra ningún elemento que cumpla la condición
    };

    const indexItem = encontrarIndice(itemsData, e => e.artId === articuloId && e.talId === tallaId);

    const active = {
        articuloId: articuloId,
        tallaId: tallaId,
        type: "updateItem",
    };

    const isActive =
        modalActive !== null
        && modalActive.articuloId === articuloId
        && modalActive.tallaId === tallaId
        && modalActive.type === "updateItem";

    return (
        <>
            <span
                onClick={() => setModalActive(active)}
                style={{fontSize: '20px'}}
                className="fa-solid fa-edit"
            />
            <Modal
                isActive={isActive}
                title={intl.formatMessage({id: "project.mercancias.UpdateItemCarrito.title"})}
                onClose={() => setModalActive(null)}
            >
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: 20
                }}>
                    <div>
                        <label><FormattedMessage id="project.global.fields.quantity"/></label>
                        <input
                            type="number"
                            min="1"
                            step="1"
                            value={itemsData[indexItem].cant || 0}
                            onChange={e =>
                                setItemsData(itemsData.map((item, i) => indexItem === i ? {
                                    ...item, cant: Number(e.target.value)
                                } : item))}
                        />
                    </div>
                    <div style={{display: "flex", justifyContent: "flex-end", width: "100%"}}>
                        <ActionButton
                            type="primary"
                            htmlType="button"
                            onClick={() =>
                                dispatch(actions.updateCarritoItem(
                                    carritoId, articuloId, tallaId, itemsData[indexItem].cant,
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

export default UpdateItemCarrito;