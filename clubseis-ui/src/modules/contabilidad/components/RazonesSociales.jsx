import Select from "react-select";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import * as selectors from '../selectors';
import * as actions from '../actions';
import {Errors} from "../../common/index.js";

const RazonesSociales = () => {
    const dispatch = useDispatch();
    const razonesSociales = useSelector(selectors.getRazonesSociales);
    const [selected, setSelected] = useState();
    const [denominacion, setDenominacion] = useState('');
    const [cifnif, setCifnif] = useState('');
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    useEffect(() => {
        dispatch(actions.findAllRazonSocial());
    }, []);

    const selectMapper = (value, label) => {
        return ({value: value, label: label})
    };

    const selectRazonSocial = (razonSocial) => {
        setSelected(razonSocial);
        const razon = razonSocial ? razonesSociales.find(r => r.id === razonSocial.value) : {};
        setDenominacion(razonSocial ? razon.denominacion : "");
        setCifnif(razonSocial ? razon.cifnif : "");
    }

    const handleSubmit = event => {
        event.preventDefault();

        if (form.checkValidity()) {

            if (selected !== undefined && selected !== null) {
                dispatch(actions.updateRazonSocial({
                        id: selected.value,
                        denominacion: denominacion.trim(),
                        cifnif: cifnif.trim(),
                    },
                    () => dispatch(actions.findAllRazonSocial()),
                    errors => setBackendErrors(errors)
                ));
            } else {
                dispatch(actions.createRazonSocial({
                        denominacion: denominacion.trim(),
                        cifnif: cifnif.trim(),
                    },
                    () => dispatch(actions.findAllRazonSocial()),
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
                    onChange={selectRazonSocial}
                    options={razonesSociales ? razonesSociales.map(c => (selectMapper(c.id, c.denominacion + "(" + c.cifnif + ")"))) : []}
                />
                <div>
                    <label>Denominacion</label>
                    <input
                        type="text"
                        value={denominacion}
                        required
                        onChange={e => setDenominacion(e.target.value)}
                    />
                </div>
                <div>
                    <label>Cif/Nif</label>
                    <input
                        type="text"
                        value={cifnif}
                        required
                        onChange={e => setCifnif(e.target.value)}
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

export default RazonesSociales;