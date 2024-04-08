import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import * as actions from "../actions.js";
import {useDispatch, useSelector} from "react-redux";
import * as selectors from "../selectors.js";
import {FormattedNumber} from "react-intl";

const dateChange = (date) => {
    const selectedDate = new Date(date);
    return Math.floor(selectedDate.getTime() / (1000 * 60 * 60 * 24));
};

const Resumen = () => {

    const dispatch = useDispatch();
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
                        fechaInicio: dateChange(new Date(year, 7, 2)),
                        fechaFin: dateChange(new Date(year + 1, 0, 32))
                    },
                    label: `1º Temporada ${year}/${year + 1}`
                });

                yearOptions.push({
                    value: {
                        fechaInicio: dateChange(new Date(year + 1, 1, 2)),
                        fechaFin: dateChange(new Date(year + 1, 6, 32))
                    },
                    label: `2º Temporada ${year}/${year + 1}`
                });

                yearOptions.push({
                    value: {
                        fechaInicio: dateChange(new Date(year, 7, 2)),
                        fechaFin: dateChange(new Date(year + 1, 6, 32))
                    },
                    label: `Año ${year}/${year + 1}`
                });
            }

            setOptions(yearOptions);
        };

        generateOptions();
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
                            <th scope="col">Concepto</th>
                            <th scope="col">Gasto</th>
                            <th scope="col">Ingreso</th>
                        </tr>
                        </thead>

                        <tbody>
                        {resumen.conceptoSummaryList.map(concepto =>
                            <tr>
                                <td>
                                    {concepto.name ? concepto.name : "Sin asignar"}
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
                            <th scope="col">Categoria</th>
                            <th scope="col">Gasto</th>
                            <th scope="col">Ingreso</th>
                        </tr>
                        </thead>

                        <tbody>
                        {resumen.categoriaSummaryList.map(categoria =>
                            <tr>
                                <td>
                                    {categoria.name ? categoria.name : "Sin asignar"}
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
                            <th scope="col">Cuenta</th>
                            <th scope="col">Gasto</th>
                            <th scope="col">Ingreso</th>
                        </tr>
                        </thead>

                        <tbody>
                        {resumen.cuentaSummaryList.map(cuenta =>
                            <tr>
                                <td>
                                    {cuenta.name ? cuenta.name : "Sin asignar"}
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
                    Sin contenido
                </div>
            )}
        </div>
    );

}

export default Resumen;