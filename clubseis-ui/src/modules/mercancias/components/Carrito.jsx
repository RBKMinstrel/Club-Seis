import {ActionButton, BackLink, DataGrid, Errors, Modal} from "../../common";

import {useDispatch, useSelector} from "react-redux";
import {FormattedNumber} from "react-intl";

import * as selectors from "../selectors"
import RemoveItemCarrito from "./RemoveItemCarrito.jsx";
import {useEffect, useState} from "react";
import UpdateItemCarrito from "./UpdateItemCarrito.jsx";
import * as actions from "../actions.js";

const Carrito = () => {
    const dispatch = useDispatch();
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
            header: () => <h4>Articulo</h4>,
            cell: (item) =>
                <p>{item.articuloName}</p>
        },
        talla: {
            header: () => <h4>Talla</h4>,
            cell: (item) => {
                const talla = selectors.getTallaName(tallaList, item.tallaId ?? null)
                return (
                    <p>{talla}</p>
                );
            }
        },
        quantity: {
            header: () => <h4>Cantidad</h4>,
            cell: (item) =>
                <p>{item.quantity}</p>
        },
        disponible: {
            header: () => <h4>Disponible</h4>,
            cell: (item) =>
                <p>
                    {
                        item.itemDisponible
                            ? "Disponible"
                            : "Sin stock"
                    }
                </p>
        },
        articuloPrecio: {
            header: () => <h4>Precio No Socio</h4>,
            cell: (item) =>
                <FormattedNumber value={item.articuloPrecio} style="currency" currency="EUR"/>
        },
        articuloPrecioSocio: {
            header: () => <h4>Precio Socio</h4>,
            cell: (item) =>
                <FormattedNumber value={item.articuloPrecioSocio} style="currency" currency="EUR"/>
        },
        acciones: {
            header: () => <h4>Acciones</h4>,
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
                    title="¿Vacias articulos del carrito?"
                    onClose={() => setModalClean(false)}
                >
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        gap: 20
                    }}>
                        <h4>Esta acción no se puede deshacer, esta seguro?</h4>
                        <div style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                            <ActionButton
                                type="danger"
                                htmlType="button"
                                onClick={() =>
                                    setModalClean(false)}
                            >
                                Cancelar
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
                                Confirmar
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
                    Pedir
                </ActionButton>
                <Modal
                    isActive={modal}
                    title="Crear pedido"
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
                            <label>Texto de la reserva</label>
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
                                Cancelar
                            </ActionButton>
                            <ActionButton
                                type="primary"
                                htmlType="button"
                                onClick={() =>
                                    dispatch(actions.createPedido(
                                        carrito.id, reserva.trim(),
                                        () => {
                                            setModal(false)
                                            alert("Pedido creado exitosamente")
                                        },
                                        errors => setBackendErrors(errors)
                                    ))}
                            >
                                Confirmar
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
                    Comprar
                </ActionButton>
                <Modal
                    isActive={modal}
                    title="Crear compra"
                    onClose={() => setModal(false)}
                >
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        gap: 20
                    }}>
                        <div style={{display: "flex", gap: 10, padding: 20}}>
                            <div>
                                <input type="checkbox" checked={ventaTotal}
                                       onChange={e => setVentaTotal((prev) => !prev)}/>
                                <label> Venta total</label>
                            </div>
                            <div>
                                <input type="checkbox" checked={esSocio} onChange={e => setEsSocio((prev) => !prev)}/>
                                <label> Socio</label>
                            </div>
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", width: "100%", gap: 30}}>
                            <ActionButton
                                type="danger"
                                htmlType="button"
                                onClick={() =>
                                    setModal(false)}
                            >
                                Cancelar
                            </ActionButton>
                            <ActionButton
                                type="primary"
                                htmlType="button"
                                onClick={() =>
                                    dispatch(actions.createVenta(
                                        carrito.id, ventaTotal, esSocio,
                                        () => {
                                            setModal(false)
                                            alert("Venta creada exitosamente")
                                        },
                                        errors => setBackendErrors(errors)
                                    ))}
                            >
                                Confirmar
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
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <BackLink style={{width: 130}}/>
                <CleanCarrito/>
            </div>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-end"}}>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <div>
                        <h3>Precio No Socios: {<FormattedNumber value={carrito.totalPrice} style="currency"
                                                                currency="EUR"/>}</h3>

                    </div>
                    <div>
                        <h3>Precio Socios: {<FormattedNumber value={carrito.totalPriceSocio} style="currency"
                                                             currency="EUR"/>}</h3>

                    </div>
                </div>
                <h3>
                    {
                        carrito.allItemDisponible
                            ? "Todos los articulos estan disponibles"
                            : "Existen articulos no disponibles"
                    }
                </h3>
            </div>
            <DataGrid
                dataList={carrito.items}
                getRowId={getRowId}
                columns={columns}
            />
            <div style={{display: "flex", justifyContent: "flex-end", gap: 20}}>
                <PedirButton/>
                <ComprarButton/>
            </div>
        </div>
    );

}

export default Carrito;