import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import {useDispatch, useSelector} from "react-redux";
import {FormattedMessage, FormattedNumber, useIntl} from "react-intl";

import {fromStringDateToNumber} from "../../utils/dateUtils.js";

import * as actions from "../actions.js";
import * as selectors from "../selectors.js";

const Resumen = () => {

    const dispatch = useDispatch();
    const intl = useIntl();
    const resumen = useSelector(selectors.getResumen);

    const [options, setOptions] = useState([]);
    const [selected, setSelected] = useState();

    useEffect(() => {
        const generateOptions = () => {
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1;
            const currentYear = currentMonth > 7 ? currentDate.getFullYear() : currentDate.getFullYear() - 1;

            let yearOptions = [];

            for (let i = 0; i < 4; i++) {
                const year = currentYear - i;

                yearOptions.push({
                    value: {
                        fechaInicio: fromStringDateToNumber(new Date(year, 7, 2)),
                        fechaFin: fromStringDateToNumber(new Date(year + 1, 0, 32))
                    },
                    label: intl.formatMessage({id: 'project.contabilidad.Resumen.firstSeason'}) + ` ${year}/${year + 1}`
                });

                yearOptions.push({
                    value: {
                        fechaInicio: fromStringDateToNumber(new Date(year + 1, 1, 2)),
                        fechaFin: fromStringDateToNumber(new Date(year + 1, 6, 32))
                    },
                    label: intl.formatMessage({id: 'project.contabilidad.Resumen.secondSeason'}) + ` ${year}/${year + 1}`
                });

                yearOptions.push({
                    value: {
                        fechaInicio: fromStringDateToNumber(new Date(year, 7, 2)),
                        fechaFin: fromStringDateToNumber(new Date(year + 1, 6, 32))
                    },
                    label: intl.formatMessage({id: 'project.contabilidad.Resumen.year'}) + ` ${year}/${year + 1}`
                });
            }

            setOptions(yearOptions);
        };

        generateOptions();
    }, []);

    useEffect(() => {
        return () => dispatch(actions.clearResumen());
    }, []);

    const handleChange = event => {
        setSelected(event);

        dispatch(actions.getResumen(
            event.value.fechaInicio,
            event.value.fechaFin
        ));
    };

    return (
        <div style={{display: "flex", flexDirection: "column", gap: 20}}>
            <Select
                value={selected}
                onChange={handleChange}
                options={options}
            />
            {resumen ? (
                <div style={{display: "flex", justifyContent: "space-around", gap: 20}}>
                    <table className="custom-table">

                        <thead>
                        <tr>
                            <th scope="col"><FormattedMessage id="project.global.fields.concept"/></th>
                            <th scope="col"><FormattedMessage id="project.global.fields.spend"/></th>
                            <th scope="col"><FormattedMessage id="project.global.fields.income"/></th>
                        </tr>
                        </thead>

                        <tbody>
                        {resumen.conceptoSummaryList.map(concepto =>
                            <tr>
                                <td>
                                    {concepto.name ? concepto.name : intl.formatMessage({id: "project.global.title.unassigned"})}
                                </td>
                                <td>
                                    <FormattedNumber value={concepto.gasto} style="currency" currency="EUR"/>
                                </td>
                                <td>
                                    <FormattedNumber value={concepto.ingreso} style="currency" currency="EUR"/>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                    <table className="custom-table">

                        <thead>
                        <tr>
                            <th scope="col"><FormattedMessage id="project.global.fields.category"/></th>
                            <th scope="col"><FormattedMessage id="project.global.fields.spend"/></th>
                            <th scope="col"><FormattedMessage id="project.global.fields.income"/></th>
                        </tr>
                        </thead>

                        <tbody>
                        {resumen.categoriaSummaryList.map(categoria =>
                            <tr>
                                <td>
                                    {categoria.name ? categoria.name : intl.formatMessage({id: "project.global.title.unassigned"})}
                                </td>
                                <td>
                                    <FormattedNumber value={categoria.gasto} style="currency" currency="EUR"/>
                                </td>
                                <td>
                                    <FormattedNumber value={categoria.ingreso} style="currency" currency="EUR"/>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                    <table className="custom-table">

                        <thead>
                        <tr>
                            <th scope="col"><FormattedMessage id="project.global.fields.account"/></th>
                            <th scope="col"><FormattedMessage id="project.global.fields.spend"/></th>
                            <th scope="col"><FormattedMessage id="project.global.fields.income"/></th>
                        </tr>
                        </thead>

                        <tbody>
                        {resumen.cuentaSummaryList.map(cuenta =>
                            <tr>
                                <td>
                                    {cuenta.name ? cuenta.name : intl.formatMessage({id: "project.global.title.unassigned"})}
                                </td>
                                <td>
                                    <FormattedNumber value={cuenta.gasto} style="currency" currency="EUR"/>
                                </td>
                                <td>
                                    <FormattedNumber value={cuenta.ingreso} style="currency" currency="EUR"/>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div>
                    <FormattedMessage id="project.global.title.noContent"/>
                </div>
            )}
        </div>
    );

}

export default Resumen;