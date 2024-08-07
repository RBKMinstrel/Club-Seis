import PropTypes from "prop-types";
import {useState} from "react";
import {useDispatch} from "react-redux";

import {ActionButton} from "../../common";

import * as actions from "../actions.js";

const CuentaCreateForm = ({
                              onSuccess = () => {
                              }, onErrors = _ => {
    }
                          }) => {
    const dispatch = useDispatch();

    const [name, setName] = useState('');

    let form;

    const cleanFields = () => {
        setName('');
    }

    const handleSubmit = event => {
        event.preventDefault();

        if (form.checkValidity()) {
            dispatch(actions.createCuenta({
                    name: name.trim(),
                },
                () => {
                    dispatch(actions.findAllCuentas(true));
                    cleanFields();
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
                    id="nameFieldCreate"
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
                Aceptar
            </ActionButton>
        </form>
    );

}

CuentaCreateForm.propTypes = {
    onSuccess: PropTypes.func,
    onErrors: PropTypes.func.isRequired,
};

export default CuentaCreateForm;