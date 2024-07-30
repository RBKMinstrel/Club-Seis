import {useDispatch, useSelector} from "react-redux";

import {ActionButton, DataGrid} from "../../common";
import {useEffect, useState} from "react";
import {fromStringDateToNumber} from "../../utils/dataUtils.js";

import * as actions from "../actions.js";
import * as selectors from "../selectors.js";

const Demanda = () => {
    const dispatch = useDispatch();
    const demanda = useSelector(selectors.getDemanda);
    const tallaList = useSelector(selectors.getTallas);

    useEffect(() => {
        return () => dispatch(actions.cleanDemanda())
    }, [])

    const [beginDate, setBeginDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [expandedRows, setExpandedRows] = useState({});

    let form;

    const handleSubmit = event => {
        event.preventDefault();

        if (form.checkValidity()) {

            dispatch(actions.getDemanda(
                fromStringDateToNumber(beginDate),
                fromStringDateToNumber(endDate)
            ));
        }
    };

    const getRowId = (row) => "art-" + row.id;
    const getSubRowId = (row) => "talla-" + row.tallaId ?? "null";
    const getNestedRows = (row) => row.stockList;
    const columns = {
        articulo: {
            header: () => <h4>Articulo</h4>,
            cell: (item) =>
                <p>{item.name}</p>
        },
        talla: {
            header: () => <h4>Talla</h4>,
            cell: (item) => {
                const isItem = 'stockList' in item;
                const talla = isItem
                    ? ""
                    : selectors.getTallaName(tallaList, item.id ?? null);
                return (
                    <p>{talla}</p>
                );
            }
        },
        quantity: {
            header: () => <h4>Cantidad</h4>,
            cell: (item) =>
                <p>{item.stock}</p>
        },
    };

    return (
        <>
            <form ref={node => form = node}
                  style={{display: "flex", gap: 10}}
                  noValidate
                  onSubmit={e => handleSubmit(e)}
            >
                <div style={{display: "flex", flexDirection: "column"}}>
                    <label>Fecha de inicio:</label>
                    <input
                        type="date"
                        id="beginDate"
                        required
                        value={beginDate}
                        onChange={e => setBeginDate(e.target.value)}
                    />
                </div>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <label>Fecha de fin:</label>
                    <input
                        type="date"
                        id="endDate"
                        required
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                    />
                </div>
                <ActionButton
                    type="primary"
                    htmlType="submit"
                >
                    Buscar
                </ActionButton>
            </form>
            <br/>
            <br/>
            <DataGrid
                dataList={demanda ? demanda : []}
                getRowId={getRowId}
                columns={columns}
                getNestedRows={getNestedRows}
                getSubRowId={getSubRowId}
                expandedRows={expandedRows}
                setExpandedRows={setExpandedRows}
            >

            </DataGrid>
        </>
    );

}

export default Demanda;