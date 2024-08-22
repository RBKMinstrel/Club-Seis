import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

import * as actions from "../actions.js";
import * as selectors from "../selectors.js";
import Select from "react-select";
import {FormattedMessage} from "react-intl";

const ConceptoSelect = ({concepto, setConcepto, required = false, isClearable = false, label = false, style = {}}) => {
    const dispatch = useDispatch();
    const conceptos = useSelector(selectors.getConceptos);

    const options = !conceptos ? [] : conceptos.map(c => ({label: c.name, value: c.id}));

    useEffect(() => {
        dispatch(actions.findAllConceptos());
    }, []);


    return (
        <div style={style}>
            {label &&
                <label><FormattedMessage id="project.global.fields.concept"/></label>
            }
            <Select
                className="full-w"
                value={options.find(c => c.value === concepto)}
                onChange={e => setConcepto(e ? e.value : null)}
                options={options}
                isSearchable
                isClearable={isClearable}
                required={required}
            />
        </div>
    );

}

export default ConceptoSelect;