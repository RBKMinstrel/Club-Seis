import Select from "react-select";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import * as selectors from '../selectors';
import * as actions from '../actions';
import {Errors} from "../../common/index.js";

const Categorias = () => {
    const dispatch = useDispatch();
    const categorias = useSelector(selectors.getCategorias);
    const [selected, setSelected] = useState();
    const [nombre, setNombre] = useState('');
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    useEffect(() => {
        dispatch(actions.findAllCategorias());
    }, []);

    const selectMapper = (value, label) => {
        return ({value: value, label: label})
    };

    const selectCategoria = (categoria) => {
        setSelected(categoria);
        setNombre(categoria ? categoria.label : "");
    }

    const handleSubmit = event => {
        event.preventDefault();

        if (form.checkValidity()) {

            if (selected !== undefined && selected !== null) {
                dispatch(actions.updateCategoria({
                        id: selected.value,
                        name: nombre.trim(),
                    },
                    () => dispatch(actions.findAllCategorias()),
                    errors => setBackendErrors(errors)
                ));
            } else {
                dispatch(actions.createCategoria({
                        name: nombre.trim(),
                    },
                    () => dispatch(actions.findAllCategorias()),
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
                    onChange={selectCategoria}
                    options={categorias ? categorias.map(c => (selectMapper(c.id, c.name))) : []}
                />
                <div style={{display: "flex", flexDirection: "column"}}>
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

export default Categorias;