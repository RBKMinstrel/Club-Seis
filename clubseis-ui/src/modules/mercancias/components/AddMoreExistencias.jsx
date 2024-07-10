import {useState} from "react";
import {ActionButton, Errors, Modal} from "../../common/index.js";
import {useDispatch, useSelector} from "react-redux";

import * as selectors from "../selectors.js";
import * as actions from "../actions.js";

const AddMoreExistencias = ({articulo}) => {
    const dispatch = useDispatch();

    const tallas = useSelector(selectors.getTallas);
    const stockList = tallas ? tallas.map(t => ({id: t.id, name: t.name, stock: 0})) : [];


    const [stock, setStock] = useState(stockList);

    const [modal, setModal] = useState(false);
    const [backendErrors, setBackendErrors] = useState(null);

    const handleSubmit = () => {
        const filteredItems = stock.filter(item => item.stock > 0);

        if (filteredItems.length === 0)
            setModal(false);

        dispatch(actions.addMoreExistencias({
                id: articulo.id,
                stockList: filteredItems,
            },
            () => setModal(false),
            error => setBackendErrors(error),
        ))
    }

    return (
        <>
            <span
                onClick={() => setModal(true)}
                style={{fontSize: '20px'}}
                className="fa-solid fa-plus"
            />
            <Modal
                isActive={modal}
                onClose={() => setModal(false)}
                title="Reponer articulo"
            >
                <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
                <div style={{width: 600, height: 200, display: "flex", flexWrap: "wrap", gap: 20}}>
                    {stock.map((talla, indice) =>
                        <div className="column begin">
                            <label>Talla {talla.name}:</label>
                            <input type="number" step="0" min="0" value={talla.stock}
                                   onChange={e => setStock(
                                       stock.map((t, i) => indice === i ? {...t, stock: Number(e.target.value)} : t)
                                   )}/>
                        </div>
                    )}
                </div>
                <div className="row" style={{justifyContent: "flex-end"}}>
                    <ActionButton
                        onClick={handleSubmit}
                        type={"primary"}
                        htmlType={"button"}
                    >
                        Guardar
                    </ActionButton>
                </div>
            </Modal>
        </>
    );

}

export default AddMoreExistencias;