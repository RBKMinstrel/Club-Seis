import {ActionButton, BackLink, DataGrid, Errors, Modal} from "../../common";

import {useDispatch, useSelector} from "react-redux";
import {FormattedMessage, FormattedNumber, useIntl} from "react-intl";

import * as selectors from "../selectors"
import RemoveItemCarrito from "./RemoveItemCarrito.jsx";
import {useEffect, useState} from "react";
import UpdateItemCarrito from "./UpdateItemCarrito.jsx";
import * as actions from "../actions.js";

const Carrito = () => {
    const dispatch = useDispatch();
    const intl = useIntl();
    const carrito = useSelector(selectors.getCarrito);
    const tallaList = useSelector(selectors.getTallas);

    const [backendErrors, setBackendErrors] = useState(null);
    const [modalActive, setModalActive] = useState(null);
    const [itemsData, setItemsData] = useState(carrito.items.map(i =>
        ({artId: i.articuloId, talId: i.tallaId ?? null, cant: i.quantity})));

    useEffect(() => {
        setItemsData(carrito
            ? carrito.items.map(i =>
                ({artId: i.articuloId, talId: i.tallaId ?? null, cant: i.quantity}))
            : [])
    }, [carrito]);

    const getRowId = (row) => "art-" + row.articuloId + "-talla-" + row.tallaId ?? "null";
    const columns = {
        articulo: {
            header: () => <h4><FormattedMessage id="project.global.fields.article"/></h4>,
            cell: (item) =>
                <p>{item.articuloName}</p>
        },
        talla: {
            header: () => <h4><FormattedMessage id="project.global.fields.size"/></h4>,
            cell: (item) => {
                const talla = selectors.getTallaName(tallaList, item.tallaId ?? null)
                return (
                    <p>{talla}</p>
                );
            }
        },
        quantity: {
            header: () => <h4><FormattedMessage id="project.global.fields.quantity"/></h4>,
            cell: (item) =>
                <p>{item.quantity}</p>
        },
        disponible: {
            header: () => <h4><FormattedMessage id="project.mercancias.Carrito.available"/></h4>,
            cell: (item) =>
                <p>
                    {
                        item.itemDisponible
                            ? intl.formatMessage({id: 'project.mercancias.Carrito.available'})
                            : item.existencia === 0
                                ? intl.formatMessage({id: 'project.mercancias.Carrito.outStock'})
                                : intl.formatMessage({id: 'project.mercancias.Carrito.availableX'}, {stock: item.existencia})
                    }
                </p>
        },
        articuloPrecio: {
            header: () => <h4><FormattedMessage id="project.global.fields.noMemberPrice"/></h4>,
            cell: (item) =>
                <FormattedNumber value={item.articuloPrecio} style="currency" currency="EUR"/>
        },
        articuloPrecioSocio: {
            header: () => <h4><FormattedMessage id="project.global.fields.memberPrice"/></h4>,
            cell: (item) =>
                <FormattedNumber value={item.articuloPrecioSocio} style="currency" currency="EUR"/>
        },
        acciones: {
            header: () => <h4><FormattedMessage id="project.global.fields.actions"/></h4>,
            cell: (item) => {
                return (
                    <div style={{display: "flex", gap: 10}}>
                        <UpdateItemCarrito
                            dispatch={dispatch}
                            carritoId={carrito.id}
                            articuloId={item.articuloId}
                            tallaId={item.tallaId ?? null}
                            itemsData={itemsData}
                            setItemsData={setItemsData}
                            modalActive={modalActive}
                            setModalActive={setModalActive}
                        />
                        <RemoveItemCarrito
                            dispatch={dispatch}
                            carritoId={carrito.id}
                            articuloId={item.articuloId}
                            tallaId={item.tallaId ?? null}
                            modalActive={modalActive}
                            setModalActive={setModalActive}
                            itemsData={itemsData}
                            setItemsData={setItemsData}
                        />
                    </div>
                );
            }
        },
    };

    const CleanCarrito = () => {
        const [modalClean, setModalClean] = useState(false);
        return (
            <>
                <span
                    onClick={() => setModalClean(true)}
                    style={{fontSize: '20px'}}
                    className="fa-solid fa-broom"
                />
                <Modal
                    isActive={modalClean}
                    title={intl.formatMessage({id: "project.mercancias.Carrito.cleanCarrito.title"})}
                    onClose={() => setModalClean(false)}
                >
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        gap: 20
                    }}>
                        <h4><FormattedMessage id="project.mercancias.Carrito.cleanCarrito.text"/></h4>
                        <div style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                            <ActionButton
                                type="danger"
                                htmlType="button"
                                onClick={() =>
                                    setModalClean(false)}
                            >
                                <FormattedMessage id="project.global.button.cancel"/>
                            </ActionButton>
                            <ActionButton
                                type="primary"
                                htmlType="button"
                                onClick={() =>
                                    dispatch(actions.cleanCarrito(
                                        carrito.id,
                                        () => setModalClean(false)
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

    const PedirButton = () => {
        const [modal, setModal] = useState(false);
        const [reserva, setReserva] = useState('');

        return (
            <>
                <ActionButton
                    type="primary"
                    htmlType="button"
                    disabled={carrito.items.length === 0}
                    onClick={() => setModal(true)}
                >
                    <FormattedMessage id="project.mercancias.Carrito.PedirButton.button"/>
                </ActionButton>
                <Modal
                    isActive={modal}
                    title={intl.formatMessage({id: "project.mercancias.Carrito.PedirButton.title"})}
                    onClose={() => setModal(false)}
                >
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        gap: 20
                    }}>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <label><FormattedMessage id="project.mercancias.Carrito.PedirButton.text"/></label>
                            <input
                                type="text"
                                value={reserva}
                                onChange={e => setReserva(e.target.value)}
                                style={{width: 500}}
                            />
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                            <ActionButton
                                type="danger"
                                htmlType="button"
                                onClick={() =>
                                    setModal(false)}
                            >
                                <FormattedMessage id="project.global.button.cancel"/>
                            </ActionButton>
                            <ActionButton
                                type="primary"
                                htmlType="button"
                                onClick={() =>
                                    dispatch(actions.createPedido(
                                        carrito.id, reserva.trim(),
                                        () => {
                                            setModal(false)
                                            alert(intl.formatMessage({id: "project.mercancias.Carrito.PedirButton.success"}))
                                        },
                                        errors => setBackendErrors(errors)
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

    const ComprarButton = () => {
        const [modal, setModal] = useState(false);
        const [ventaTotal, setVentaTotal] = useState(false);
        const [esSocio, setEsSocio] = useState(false);

        return (
            <>
                <ActionButton
                    type="primary"
                    htmlType="button"
                    disabled={carrito.items.length === 0}
                    onClick={() => setModal(true)}
                >
                    <FormattedMessage id="project.global.button.buy"/>
                </ActionButton>
                <Modal
                    isActive={modal}
                    title={intl.formatMessage({id: "project.mercancias.Carrito.ComprarButton.title"})}
                    onClose={() => setModal(false)}
                >
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        gap: 20
                    }}>
                        <div style={{display: "flex", justifyContent: "center"}}>
                            <FormattedMessage id="project.mercancias.Carrito.ComprarButton.text"/>
                        </div>
                        <div style={{display: "flex", gap: 10, padding: 20}}>
                            <div>
                                <input type="checkbox" checked={ventaTotal}
                                       onChange={e => setVentaTotal((prev) => !prev)}/>
                                <label> <FormattedMessage
                                    id="project.mercancias.Carrito.ComprarButton.fullBuy"/></label>
                            </div>
                            <div>
                                <input type="checkbox" checked={esSocio} onChange={e => setEsSocio((prev) => !prev)}/>
                                <label> <FormattedMessage id="project.global.fields.member"/></label>
                            </div>
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", width: "100%", gap: 30}}>
                            <ActionButton
                                type="danger"
                                htmlType="button"
                                onClick={() =>
                                    setModal(false)}
                            >
                                <FormattedMessage id="project.global.button.cancel"/>
                            </ActionButton>
                            <ActionButton
                                type="primary"
                                htmlType="button"
                                onClick={() =>
                                    dispatch(actions.createVenta(
                                        carrito.id, ventaTotal, esSocio,
                                        () => {
                                            setModal(false)
                                            alert(intl.formatMessage({id: "project.mercancias.Carrito.ComprarButton.success"}))
                                        },
                                        errors => setBackendErrors(errors)
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

    return (
        <div style={{display: "flex", flexDirection: "column", gap: 15}}>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-end"}}>
                <BackLink style={{width: 130}}/>
                <h3>
                    {
                        carrito.allItemDisponible
                            ? intl.formatMessage({id: "project.mercancias.Carrito.allStock"})
                            : intl.formatMessage({id: "project.mercancias.Carrito.noStock"})
                    }
                </h3>
                <CleanCarrito/>
            </div>
            <DataGrid
                dataList={carrito.items}
                getRowId={getRowId}
                columns={columns}
            />
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    width: "40%"
                }}>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <div>
                            <h3><FormattedMessage id="project.mercancias.Carrito.noMembers"/>: {<FormattedNumber
                                value={carrito.totalPrice} style="currency"
                                                             currency="EUR"/>}</h3>

                        </div>
                        <div>
                            <h3><FormattedMessage id="project.mercancias.Carrito.members"/>: {<FormattedNumber
                                value={carrito.totalPriceSocio} style="currency"
                                                          currency="EUR"/>}</h3>

                        </div>
                    </div>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <div>
                            <h3><FormattedMessage id="project.mercancias.Carrito.avaivableNoMembers"/>: {
                                <FormattedNumber value={carrito.totalPriceAvaible}
                                                                         style="currency"
                                                                         currency="EUR"/>}</h3>

                        </div>
                        <div>
                            <h3><FormattedMessage id="project.mercancias.Carrito.avaivableMembers"/>: {<FormattedNumber
                                value={carrito.totalPriceSocioAvaible}
                                                                      style="currency"
                                                                      currency="EUR"/>}</h3>

                        </div>
                    </div>
                </div>
                <div style={{display: "flex", justifyContent: "flex-end", gap: 20}}>
                    <PedirButton/>
                    <ComprarButton/>
                </div>
            </div>
        </div>
    );

}

export default Carrito;