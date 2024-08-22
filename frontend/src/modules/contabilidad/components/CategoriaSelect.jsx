import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

import * as actions from "../actions.js";
import * as selectors from "../selectors.js";
import Select from "react-select";
import {FormattedMessage} from "react-intl";

const CategoriaSelect = ({
                             categoria,
                             setCategoria,
                             required = false,
                             isClearable = false,
                             label = false,
                             style = {}
                         }) => {
    const dispatch = useDispatch();
    const categorias = useSelector(selectors.getConceptos);

    const options = !categorias ? [] : categorias.map(c => ({label: c.name, value: c.id}));

    useEffect(() => {
        dispatch(actions.findAllCategorias());
    }, []);


    return (
        <div style={style}>
            {label &&
                <label><FormattedMessage id="project.global.fields.category"/></label>
            }
            <Select
                className="full-w"
                value={options.find(c => c.value === categoria)}
                onChange={e => setCategoria(e ? e.value : null)}
                options={options}
                isSearchable
                isClearable={isClearable}
                required={required}
            />
        </div>
    );

}

export default CategoriaSelect;