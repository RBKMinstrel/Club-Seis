import {useDispatch, useSelector} from "react-redux";

import {DataGrid, Errors, Pagination} from "../../common";

import * as actions from "../actions.js";
import * as selectors from "../selectors.js";
import {useEffect, useState} from "react";
import CrearCompraByPedido from "./CrearCompraByPedido.jsx";
import DeletePedido from "./DeletePedido.jsx";

const Pedidos = () => {
    const dispatch = useDispatch();
    const pedidos = useSelector(selectors.getPedidos);
    const tallaList = useSelector(selectors.getTallas);

    const [forceUpdate, setForceUpdate] = useState(false);
    const [loading, setLoading] = useState(true);

    const [reserva, setReserva] = useState('');
    const [size, setSize] = useState(6);
    const [page, setPage] = useState(0);

    const [backendErrors, setBackendErrors] = useState(null);

    useEffect(() => {
        setPage(0);
        setForceUpdate((prev) => !prev);
    }, [reserva, size]);

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getPedidos({
            reserva: reserva.trim().length !== 0
                ? reserva.trim()
                : null,
            size: size,
            page: page,
        }));
        setLoading(false);
    }, [page, forceUpdate]);

    const sizeOptions = [
        {label: "6", value: 6},
        {label: "12", value: 12},
        {label: "24", value: 24},
    ];

    const getRowId = (row) => "pedido-" + row.id;
    const getSubRowId = (row) => row.articulo + "-" + row.tallaId ?? "null";
    const getNestedRows = (row) => row.subItems;
    const columns = {
        reserva: {
            header: () => <h4>Reserva</h4>,
            cell: (item) =>
                <p>{item.reserva}</p>,
        },
        articulo: {
            header: () => <h4>Articulo</h4>,
            cell: (item) =>
                <p>{item.articulo}</p>,
        },
        talla: {
            header: () => <h4>Talla</h4>,
            cell: (item) =>
                <p>{selectors.getTallaName(tallaList, item.tallaId)}</p>,
        },
        cantidad: {
            header: () => <h4>Cantidad</h4>,
            cell: (item) =>
                <p>{item.cantidad}</p>,
        },
    };
    const [expandedRows, setExpandedRows] = useState({});
    const [selectedRows, setSelectedRows] = useState([]);

    return (
        <div style={{display: "flex", flexDirection: "column", gap: 10}}>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div style={{alignSelf: "flex-end"}}>
                    <input
                        type="text"
                        id="reserva"
                        value={reserva}
                        onChange={e => setReserva(e.target.value)}
                    />
                </div>
                <div style={{display: "flex", gap: 10}}>
                    <DeletePedido
                        dispatch={dispatch}
                        selectedRows={selectedRows}
                        setBackendErrors={setBackendErrors}
                        setForceUpdate={setForceUpdate}
                    />
                    <CrearCompraByPedido
                        dispatch={dispatch}
                        selectedRows={selectedRows}
                        setBackendErrors={setBackendErrors}
                        setForceUpdate={setForceUpdate}
                    />
                </div>
            </div>
            <DataGrid
                dataList={pedidos ? pedidos.items : []}
                getRowId={getRowId}
                columns={columns}
                loading={loading}
                getNestedRows={getNestedRows}
                getSubRowId={getSubRowId}
                expandedRows={expandedRows}
                setExpandedRows={setExpandedRows}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
            >
                <Pagination
                    page={page}
                    setPage={setPage}
                    size={size}
                    setSize={setSize}
                    sizeOptions={sizeOptions}
                    actualItems={pedidos ? pedidos.items.length : 0}
                    totalItems={pedidos ? pedidos.totalItems : 0}
                />
            </DataGrid>
        </div>
    );

}

export default Pedidos;