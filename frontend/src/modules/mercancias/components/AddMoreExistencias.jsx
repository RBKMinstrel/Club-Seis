import {useState} from "react";
import {ActionButton, Errors, Modal} from "../../common/index.js";
import {useDispatch, useSelector} from "react-redux";

import * as selectors from "../selectors.js";
import * as actions from "../actions.js";
import {FormattedMessage, useIntl} from "react-intl";

const AddMoreExistencias = ({articulo}) => {
    const dispatch = useDispatch();
    const intl = useIntl();

    const tallas = useSelector(selectors.getTallas);
    const stockList = !tallas
        ? []
        : articulo.esRopa
            ? tallas.map(t => ({id: t.id, name: t.name, stock: 0}))
            : [{id: null, name: null, stock: 0}];


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
                title={intl.formatMessage({id: 'project.mercancias.AddMoreExistencias.title'})}
            >
                <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
                <div style={{width: 400, height: 120, display: "flex", flexWrap: "wrap", gap: 20}}>
                    {
                        articulo.esRopa
                            ? (stock.map((talla, indice) =>
                                <div className="column begin">
                                    <label><FormattedMessage id="project.global.fields.size"/> {talla.name}:</label>
                                    <input type="number" step="0" min="0" value={talla.stock}
                                           onChange={e => setStock(
                                               stock.map((t, i) => indice === i ? {...t, stock: Number(e.target.value)} : t)
                                           )}/>
                                </div>
                            ))
                            : (
                                <div style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "100%"
                                }}>
                                    <div className="column begin">
                                        <label><FormattedMessage id="project.global.fields.quantity"/>:</label>
                                        <input type="number" step="0" min="0" value={stock[0].stock}
                                               onChange={e => setStock(
                                                   [{id: null, name: null, stock: Number(e.target.value)}]
                                               )}/>
                                    </div>
                                </div>
                            )
                    }

                </div>
                <div className="row" style={{justifyContent: "flex-end"}}>
                    <ActionButton
                        onClick={handleSubmit}
                        type={"primary"}
                        htmlType={"button"}
                    >
                        <FormattedMessage id="project.global.fields.save"/>
                    </ActionButton>
                </div>
            </Modal>
        </>
    );

}

export default AddMoreExistencias;