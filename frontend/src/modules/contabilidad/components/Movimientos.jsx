import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {FormattedDate, FormattedMessage, FormattedNumber} from "react-intl";

import {DataGrid, Pagination} from "../../common";
import Filtros from "./Filtros";
import UploadAsientos from "./UploadAsientos.jsx";

import {fromStringDateToNumber} from "../../utils/dataUtils.js";

import * as actions from "../actions.js";
import * as selectors from '../selectors';

const Movimientos = () => {
    const dispatch = useDispatch();
    const movimientos = useSelector(selectors.getMovimientoSearch);

    const [forceUpdate, setForceUpdate] = useState(false);
    const [loading, setLoading] = useState(true);

    const [fecha, setFecha] = useState('');
    const [tipo, setTipo] = useState(null);
    const [razonSocial, setRazonSocial] = useState(null);
    const [concepto, setConcepto] = useState(null);
    const [categoria, setCategoria] = useState(null);
    const [cuenta, setCuenta] = useState(null);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(12);

    const sizeOptions = [
        {label: "6", value: 6},
        {label: "12", value: 12},
        {label: "24", value: 24},
        {label: "48", value: 48},
    ];

    useEffect(() => {
        setPage(0);
        setForceUpdate((prev) => !prev);
    }, [fecha, tipo, razonSocial, concepto, categoria, cuenta, size]);

    useEffect(() => {
        setLoading(true);
        dispatch(actions.findMovimientos({
            fecha: fecha !== '' ? fromStringDateToNumber(fecha) : null,
            tipo: tipo,
            razonSocialId: razonSocial,
            conceptoId: concepto,
            categoriaId: categoria,
            cuentaId: cuenta,
            size: size,
            page: page,
        }));
        setLoading(false);
    }, [page, forceUpdate]);

    const getRowId = (row) => "mov-id-" + row.id;
    const columns = {
        fecha: {
            header: () => <h4><FormattedMessage id="project.global.fields.date"/></h4>,
            cell: (movimiento) =>
                <FormattedDate value={new Date(movimiento.fecha * (1000 * 60 * 60 * 24))}/>,
        },
        tipo: {
            header: () => <h4><FormattedMessage id="project.global.fields.type"/></h4>,
            cell: (movimiento) => {
                return movimiento.gasto
                    ? (<p>Gasto</p>)
                    : (<p>Ingreso</p>)
            },
        },
        razonSocial: {
            header: () => <h4><FormattedMessage id="project.global.fields.registeredName"/></h4>,
            cell: (movimiento) => <p>{movimiento.razonSocial}</p>,
        },
        concepto: {
            header: () => <h4><FormattedMessage id="project.global.fields.concept"/></h4>,
            cell: (movimiento) => <p>{movimiento.concepto}</p>,
        },
        categoria: {
            header: () => <h4><FormattedMessage id="project.global.fields.category"/></h4>,
            cell: (movimiento) => <p>{movimiento.categoria}</p>,
        },
        cuenta: {
            header: () => <h4><FormattedMessage id="project.global.fields.account"/></h4>,
            cell: (movimiento) => <p>{movimiento.cuenta}</p>,
        },
        total: {
            header: () => <h4><FormattedMessage id="project.global.fields.total"/></h4>,
            cell: (movimiento) => <FormattedNumber value={movimiento.total} style="currency" currency="EUR"/>,
        },
        acciones: {
            header: () => <h4><FormattedMessage id="project.global.fields.actions"/></h4>,
            cell: (movimiento) =>
                <div className="row" style={{justifyContent: "space-around"}}>
                    <Link to={`/gestion/contabilidad/asientos/${movimiento.id}`}>
                        <span
                            style={{color: "black", fontSize: '20px'}}
                            className="fa-solid fa-eye link-out"
                        />
                    </Link>
                    <Link to={`/gestion/contabilidad/asientos/update-load/${movimiento.id}`}>
                        <span
                            style={{color: "black", fontSize: '20px'}}
                            className="fa-regular fa-pen-to-square link-out"
                        />
                    </Link>
                    <Link to={`/gestion/contabilidad/asientos/delete/${movimiento.id}`}>
                        <span
                            style={{color: "black", fontSize: '20px'}}
                            className="fa-solid fa-trash link-out"
                        />
                    </Link>
                </div>,
        },
    };

    const descargar = blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'datos.xlsx');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    };

    const excelDowload = () => {

        dispatch(actions.dowloadExcel(
            {
                fecha: fecha !== '' ? fromStringDateToNumber(fecha) : null,
                tipo: tipo,
                razonSocialId: razonSocial,
                conceptoId: concepto,
                categoriaId: categoria,
                cuentaId: cuenta,
            },
            blob => descargar(blob),
            error => console.log(error)
        ));
    };

    return (
        <div className="column" style={{alignItems: "center"}}>
            <div style={{display: "flex", justifyContent: "space-between", width: "100%", padding: 10}}>
                <div>
                    <h2><FormattedMessage id="project.contabilidad.Movimientos.title"/></h2>
                </div>
                <div style={{display: "flex", alignItems: "center", gap: 10}}>
                    <Link to="/gestion/contabilidad/asientos/crear">
                        <span
                            className="fa-solid fa-circle-plus link-out"
                            style={{color: "black", fontSize: '20px'}}
                        />
                    </Link>
                    <span
                        onClick={excelDowload}
                        style={{fontSize: '20px'}}
                        className="fa-solid fa-cloud-arrow-down"
                    />
                    <UploadAsientos/>
                </div>
            </div>
            <Filtros
                tipo={tipo}
                setTipo={setTipo}
                fecha={fecha}
                setFecha={setFecha}
                razonSocial={razonSocial}
                setRazonSocial={setRazonSocial}
                concepto={concepto}
                setConcepto={setConcepto}
                categoria={categoria}
                setCategoria={setCategoria}
                cuenta={cuenta}
                setCuenta={setCuenta}
            />
            <DataGrid
                dataList={movimientos ? movimientos.items : []}
                getRowId={getRowId}
                columns={columns}
                loading={loading}
            >
                <Pagination
                    page={page}
                    setPage={setPage}
                    size={size}
                    setSize={setSize}
                    sizeOptions={sizeOptions}
                    actualItems={movimientos ? movimientos.items.length : 0}
                    totalItems={movimientos ? movimientos.totalItems : 0}
                />
            </DataGrid>
        </div>
    );
}

export default Movimientos;