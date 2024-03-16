import Select from "react-select";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import * as selectors from '../selectors';
import * as actions from '../actions';
import {Errors} from "../../common/index.js";

const Conceptos = () => {
    const dispatch = useDispatch();
    const conceptos = useSelector(selectors.getConceptos);
    const [selected, setSelected] = useState();
    const [nombre, setNombre] = useState('');
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    useEffect(() => {
        dispatch(actions.findAllConceptos());
    }, []);

    const selectMapper = (value, label) => {
        return ({value: value, label: label})
    };

    const selectConcepto = (concepto) => {
        setSelected(concepto);
        setNombre(concepto ? concepto.label : "");
    }

    const handleSubmit = event => {
        event.preventDefault();

        if (form.checkValidity()) {

            if (selected !== undefined && selected !== null) {
                dispatch(actions.updateConcepto({
                        id: selected.value,
                        name: nombre.trim(),
                    },
                    () => dispatch(actions.findAllConceptos()),
                    errors => setBackendErrors(errors)
                ));
            } else {
                dispatch(actions.createConcepto({
                        name: nombre.trim(),
                    },
                    () => dispatch(actions.findAllConceptos()),
                    errors => setBackendErrors(errors)
                ))
            }

        } else {
            setBackendErrors(null);
        }
    }

    return (
        <div>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <form className="form-filter-contabilidad"
                  ref={node => form = node}
                  noValidate
                  onSubmit={e => handleSubmit(e)}>
                <Select
                    className="selector"
                    isClearable={true}
                    isSearchable={true}
                    value={selected}
                    onChange={selectConcepto}
                    options={conceptos ? conceptos.map(c => (selectMapper(c.id, c.name))) : []}
                />
                <div>
                    <label>Nombre</label>
                    <input
                        type="text"
                        value={nombre}
                        required
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">
                        {selected ? "Actualizar" : "Crear"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Conceptos;