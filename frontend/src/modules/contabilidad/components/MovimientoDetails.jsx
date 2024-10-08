import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import * as selectors from "../selectors";
import * as actions from "../actions";
import {FormattedDate, FormattedMessage, FormattedNumber, useIntl} from "react-intl";
import {useParams} from "react-router-dom";
import {BackLink, Section} from "../../common";

function redondear(numero) {
    const factor = Math.pow(10, 2);
    return Math.round(numero * factor) / factor;
}

const razonText = (r) => {
    return r ? r.denominacion + "(" + r.cifnif + ")" : "";
}

const MovimientoDetails = () => {
    const intl = useIntl();

    const movimiento = useSelector(selectors.getMovimiento);
    const razonSocialOptions = useSelector(selectors.getRazonesSociales);
    const conceptoOptions = useSelector(selectors.getConceptos);
    const categoriaOptions = useSelector(selectors.getCategorias);
    const cuentaOptions = useSelector(selectors.getCuentas);
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(() => {

        const movimientoId = Number(id);

        if (!Number.isNaN(movimientoId)) {
            dispatch(actions.findMovimientoById(movimientoId));
        }

        return () => {
            dispatch(actions.clearMovimiento())
        };

    }, [id, dispatch]);

    if (!movimiento) {
        return null;
    }

    const base0 = movimiento.base0;
    const base4 = movimiento.base4;
    const base10 = movimiento.base10;
    const base21 = movimiento.base21;
    const iva4 = redondear(base4 * 0.04);
    const iva10 = redondear(base10 * 0.1);
    const iva21 = redondear(base21 * 0.21);
    const baseTotal = Number((base0 + base4 + base10 + base21).toFixed(2));
    const ivaTotal = Number((iva4 + iva10 + iva21).toFixed(2));
    const total = Number((baseTotal + ivaTotal).toFixed(2));

    return (
        <div className="column">
            <BackLink style={{alignSelf: "start"}}/>
            <Section title={intl.formatMessage({id: 'project.global.title.identificationData'})}>
                <div className="row" style={{justifyContent: "space-around"}}>
                    <div className="column">
                        <div className="row">
                            <h3><FormattedMessage id="project.global.fields.type"/>:</h3>
                            <h5>
                                {movimiento.esGasto
                                    ? intl.formatMessage({id: 'project.global.fields.spend'})
                                    : intl.formatMessage({id: 'project.global.fields.income'})}
                            </h5>
                        </div>
                        <div className="row">
                            <h3><FormattedMessage id="project.global.fields.date"/>:</h3>
                            <FormattedDate value={new Date(movimiento.fecha * (1000 * 60 * 60 * 24))}/>
                        </div>
                    </div>
                    <div className="column">
                        <div className="row">
                            <h3><FormattedMessage id="project.global.fields.registeredName"/>:</h3>
                            <h5>{razonText(selectors.getRazonSocial(razonSocialOptions, movimiento.razonSocial))}</h5>
                        </div>
                        <div className="row">
                            <h3><FormattedMessage id="project.global.fields.concept"/>:</h3>
                            <h5>{selectors.getConcepto(conceptoOptions, movimiento.concepto)}</h5>
                        </div>
                    </div>
                    <div className="column">
                        <div className="row">
                            <h3><FormattedMessage id="project.global.fields.category"/>:</h3>
                            <h5>{selectors.getCategoria(categoriaOptions, movimiento.categoria)}</h5>
                        </div>
                        <div className="row">
                            <h3><FormattedMessage id="project.global.fields.account"/>:</h3>
                            <h5>{selectors.getCuenta(cuentaOptions, movimiento.cuenta)}</h5>
                        </div>
                    </div>
                </div>
            </Section>
            <Section title={intl.formatMessage({id: "project.global.fields.amount"})}>
                <div className="row begin" style={{justifyContent: "space-evenly"}}>
                    <div className="column" style={{alignItems: "start"}}>
                        <div className="column begin">
                            <h3><FormattedMessage id="project.global.fields.base"/> 0:</h3>
                            <FormattedNumber value={base0} style="currency" currency="EUR"/>
                        </div>
                    </div>
                    <div className="column" style={{alignItems: "start"}}>
                        <div className="column begin">
                            <h3><FormattedMessage id="project.global.fields.base"/> 4:</h3>
                            <FormattedNumber value={base4} style="currency" currency="EUR"/>
                        </div>
                        <div className="column begin">
                            <h3><FormattedMessage id="project.global.fields.vat"/> 4:</h3>
                            <FormattedNumber value={iva4} style="currency" currency="EUR"/>
                        </div>
                    </div>
                    <div className="column" style={{alignItems: "start"}}>
                        <div className="column begin">
                            <h3><FormattedMessage id="project.global.fields.base"/> 10:</h3>
                            <FormattedNumber value={base10} style="currency" currency="EUR"/>
                        </div>
                        <div className="column begin">
                            <h3><FormattedMessage id="project.global.fields.vat"/> 10:</h3>
                            <FormattedNumber value={iva10} style="currency" currency="EUR"/>
                        </div>
                    </div>
                    <div className="column" style={{alignItems: "start"}}>
                        <div className="column begin">
                            <h3><FormattedMessage id="project.global.fields.base"/> 21:</h3>
                            <FormattedNumber value={base21} style="currency" currency="EUR"/>
                        </div>
                        <div className="column begin">
                            <h3><FormattedMessage id="project.global.fields.vat"/> 21:</h3>
                            <FormattedNumber value={iva21} style="currency" currency="EUR"/>
                        </div>
                    </div>
                    <div className="column" style={{alignItems: "start"}}>
                        <div className="column begin">
                            <h3><FormattedMessage id="project.global.fields.totalBase"/>:</h3>
                            <FormattedNumber value={baseTotal} style="currency" currency="EUR"/>
                        </div>
                        <div className="column begin">
                            <h3><FormattedMessage id="project.global.fields.totalVAT"/>:</h3>
                            <FormattedNumber value={ivaTotal} style="currency" currency="EUR"/>
                        </div>
                        <div className="column begin">
                            <h3><FormattedMessage id="project.global.fields.total"/>:</h3>
                            <FormattedNumber value={total} style="currency" currency="EUR"/>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
}

export default MovimientoDetails;