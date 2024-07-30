import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

import * as actions from "../actions.js";
import * as selectors from "../selectors.js";
import Select from "react-select";

const CuentaSelect = ({cuenta, setCuenta, required = false, isClearable = false, label = false, style = {}}) => {
    const dispatch = useDispatch();
    const cuentas = useSelector(selectors.getCuentas);

    const options = !cuentas ? [] : cuentas.map(c => ({label: c.name, value: c.id}));

    useEffect(() => {
        dispatch(actions.findAllCuentas());
    }, []);

    return (
        <div style={style}>
            {label &&
                <label>Cuenta</label>
            }
            <Select
                className="full-w"
                value={options.find(c => c.value === cuenta)}
                onChange={e => setCuenta(e ? e.value : null)}
                options={options}
                isSearchable
                isClearable={isClearable}
                required={required}
            />
        </div>
    );

}

export default CuentaSelect;