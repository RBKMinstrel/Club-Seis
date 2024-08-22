import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import {ActionButton, DataGrid, Pagination} from "../../common/index.js";

import * as actions from "../actions.js";
import * as selectors from "../selectors.js";
import {FormattedDate, FormattedMessage, useIntl} from "react-intl";

const FacturasSearch = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const intl = useIntl();
    const facturasSearch = useSelector(selectors.getFacturasSearch);

    const [forceUpdate, setForceUpdate] = useState(false);
    const [loading, setLoading] = useState(true);

    const [keywords, setKeywords] = useState('');
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
    }, [keywords, size]);

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getFacturasSearch(
            {
                keyword: keywords.trim() !== '' ? keywords.trim() : null,
                page: page,
                size: size,
            }
        ));
        setLoading(false);
    }, [page, forceUpdate]);

    const getRowId = (row) => "fact-" + row.id;
    const columns = {
        fecha: {
            header: () => <h4><FormattedMessage id="project.global.fields.date"/></h4>,
            cell: (item) =>
                <p><FormattedDate value={new Date(item.fecha * (1000 * 60 * 60 * 24))}/></p>
        },
        codigo: {
            header: () => <h4><FormattedMessage id="project.global.fields.code"/></h4>,
            cell: (item) =>
                <p>{item.codigo}</p>
        },
        tipo: {
            header: () => <h4><FormattedMessage id="project.global.fields.type"/></h4>,
            cell: (item) => {
                const getTipoName = (tipo) => {
                    switch (tipo) {
                        case 1:
                            return intl.formatMessage({id: 'project.global.fields.bill'});
                        case 2:
                            return intl.formatMessage({id: 'project.global.fields.receipt'});
                        default:
                            return '';
                    }
                }
                return (<p>{getTipoName(item.tipo)}</p>);
            }
        },
        anotaciones: {
            header: () => <h4><FormattedMessage id="project.global.fields.annotations"/></h4>,
            cell: (item) =>
                <p>{item.anotacion}</p>
        },
        emisor: {
            header: () => <h4><FormattedMessage id="project.global.fields.transmitter"/></h4>,
            cell: (item) =>
                <p>{item.emisor}</p>
        },
        receptor: {
            header: () => <h4><FormattedMessage id="project.global.fields.receiver"/></h4>,
            cell: (item) =>
                <p>{item.receptor}</p>
        },
        acciones: {
            header: () => <h4><FormattedMessage id="project.global.fields.actions"/></h4>,
            cell: (item) => {
                return (
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <span
                            style={{fontSize: '20px'}}
                            className="fa-solid fa-cloud-arrow-down"
                            onClick={() => dispatch(actions.getFacturaFile(item.id))}
                        />
                    </div>
                );
            }
        },
    };

    return (
        <>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <input
                    type="text"
                    id="keywords"
                    value={keywords}
                    onChange={e => setKeywords(e.target.value)}
                />
                <div style={{display: "flex", gap: 10}}>
                    <ActionButton
                        type="secondary"
                        htmlType="button"
                        onClick={() => navigate("/gestion/contabilidad/facturas/crearFactura")}
                    >
                        <FormattedMessage id="project.contabilidad.FacturaSearch.createBill"/>
                    </ActionButton>
                    <ActionButton
                        type="secondary"
                        htmlType="button"
                        onClick={() => navigate("/gestion/contabilidad/facturas/crearRecibi")}
                    >
                        <FormattedMessage id="project.contabilidad.FacturaSearch.createReceipt"/>
                    </ActionButton>
                </div>
            </div>
            <br/>
            <DataGrid
                dataList={facturasSearch ? facturasSearch.items : []}
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
                    actualItems={facturasSearch ? facturasSearch.items.length : 0}
                    totalItems={facturasSearch ? facturasSearch.totalItems : 0}
                />
            </DataGrid>
        </>
    );

}

export default FacturasSearch;