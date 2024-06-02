import Filtros from "./Filtros";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as actions from "../actions.js";
import * as selectors from '../selectors';
import {DataGrid} from "../../common/index";
import {Link} from "react-router-dom";
import {FormattedDate, FormattedNumber} from "react-intl";

const Movimientos = () => {

    const movimientos = useSelector(selectors.getMovimientoSearch);
    const criteria = movimientos ? movimientos.criteria : {};
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);

    const getRowId = (row) => "mov-" + row.id;

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(12);

    const resetPage = () => setPage(0);

    useEffect(() => {
        setLoading(true);
        resetPage();
        dispatch(actions.findMovimientos({...criteria, page: 0, size: size}));
        setLoading(false);
    }, [dispatch, size]);

    useEffect(() => {
        setLoading(true);
        dispatch(actions.findMovimientos({...criteria, page: page}));
        setLoading(false);
    }, [dispatch, page]);

    const columns = {
        fecha: {
            header: () => <h4>Fecha</h4>,
            cell: (movimiento) =>
                <FormattedDate value={new Date(movimiento.fecha * (1000 * 60 * 60 * 24))}/>,
        },
        tipo: {
            header: () => <h4>Tipo</h4>,
            cell: (movimiento) => {
                return movimiento.gasto
                    ? (<p>Gasto</p>)
                    : (<p>Ingreso</p>)
            },
        },
        razonSocial: {
            header: () => <h4>Razón Social</h4>,
            cell: (movimiento) => <p>{movimiento.razonSocial}</p>,
        },
        concepto: {
            header: () => <h4>Concepto</h4>,
            cell: (movimiento) => <p>{movimiento.concepto}</p>,
        },
        categoria: {
            header: () => <h4>Categoria</h4>,
            cell: (movimiento) => <p>{movimiento.categoria}</p>,
        },
        cuenta: {
            header: () => <h4>Cuenta</h4>,
            cell: (movimiento) => <p>{movimiento.cuenta}</p>,
        },
        total: {
            header: () => <h4>Total</h4>,
            cell: (movimiento) => <FormattedNumber value={movimiento.total} style="currency" currency="EUR"/>,
        },
        acciones: {
            header: () => <h4>Acciones</h4>,
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
            criteria,
            blob => descargar(blob),
            error => console.log(error)
        ));
    };

    return (
        <div className="column" style={{alignItems: "center"}}>
            <div style={{display: "flex", justifyContent: "space-between", width: "100%", padding: 10}}>
                <div>
                    <h2>Asientos</h2>
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
                </div>
            </div>
            <Filtros criteria={criteria} resetPage={resetPage}/>
            <DataGrid
                dataList={movimientos ? movimientos.result.items : []}
                height={400}
                getRowId={getRowId}
                columns={columns}
                loading={loading}
                page={page}
                setPage={setPage}
                size={size}
                setSize={setSize}
                total={movimientos ? movimientos.result.totalItems : 0}
            />
        </div>
    );
}

export default Movimientos;