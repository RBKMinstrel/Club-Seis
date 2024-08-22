import {useEffect} from "react";
import Select from "react-select";
import {useDispatch, useSelector} from "react-redux";

import * as actions from "../actions.js";
import * as selectors from "../selectors.js";
import {FormattedMessage} from "react-intl";

const RolesSelect = ({
                         roles,
                         setRoles,
                         required = false,
                         isClearable = false,
                         label = false,
                         style = {}
                     }) => {
    const dispatch = useDispatch();
    const rolesList = useSelector(selectors.getRoles);

    const options = !rolesList ? [] : rolesList.map(c => ({label: c.name, value: c.id}));

    useEffect(() => {
        dispatch(actions.findAllRoles());
    }, []);


    return (
        <div style={style}>
            {label &&
                <label><FormattedMessage id="project.global.fields.roles"/></label>
            }
            <Select
                className="full-w"
                value={options.filter(c => roles.includes(c.value))}
                onChange={e => setRoles(e.map(rol => rol.value))}
                options={options}
                isSearchable
                isMulti
                isClearable={isClearable}
                required={required}
            />
        </div>
    );
}

export default RolesSelect;