import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

import * as actions from "../actions.js";
import * as selectors from "../selectors.js";
import Select from "react-select";

const RazonSocialSelect = ({
                               razonSocial,
                               setRazonSocial,
                               required = false,
                               isClearable = false,
                               label = false,
                               style = {}
                           }) => {
    const dispatch = useDispatch();
    const razonSocialList = useSelector(selectors.getRazonesSociales);

    const options = !razonSocialList ? [] : razonSocialList.map(c => ({
        label: c.denominacion + " (" + c.cifnif + ")",
        value: c.id
    }));

    useEffect(() => {
        dispatch(actions.findAllRazonSocial());
    }, []);


    return (
        <div style={style}>
            {label &&
                <label>Razon Social</label>
            }
            <Select
                className="full-w"
                value={options.find(c => c.value === razonSocial)}
                onChange={e => setRazonSocial(e ? e.value : null)}
                options={options}
                isSearchable
                isClearable={isClearable}
                required={required}
            />
        </div>
    );

}

export default RazonSocialSelect;