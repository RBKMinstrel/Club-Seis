import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";

import {ActionButton} from "../../common";

import * as actions from "../actions.js";
import PropTypes from "prop-types";

const CuentaUpdateForm = ({
                              cuenta, onSuccess = () => {
    }, onErrors = _ => {
    }
                          }) => {
    const dispatch = useDispatch();

    const [name, setName] = useState('');

    let form;

    useEffect(() => {
        setName(cuenta.name);
    }, [cuenta])

    const handleSubmit = event => {
        event.preventDefault();

        if (form.checkValidity()) {
            dispatch(actions.updateCuenta({
                    id: cuenta.id,
                    name: name.trim(),
                },
                () => {
                    dispatch(actions.findAllCuentas(true));
                    onSuccess();
                },
                errors => onErrors(errors)
            ));
        } else {
            onErrors(null);
        }
    }

    return (
        <form
            ref={node => form = node}
            noValidate
            onSubmit={e => handleSubmit(e)}
            style={{display: "flex", flexDirection: "column", gap: 20}}
        >
            <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8}}>
                <label>
                    Nombre
                </label>
                <input
                    type="text"
                    id="nameFieldUpdate"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    style={{width: "100%"}}
                />
            </div>
            <ActionButton
                type="primary"
                htmlType="submit"
            >
                Actualizar
            </ActionButton>
        </form>
    );

}

CuentaUpdateForm.propTypes = {
    cuenta: PropTypes.object,
    onSuccess: PropTypes.func,
    onErrors: PropTypes.func.isRequired,
};

export default CuentaUpdateForm;