import PropTypes from "prop-types";
import {useState} from "react";
import {useDispatch} from "react-redux";

import {ActionButton} from "../../common";

import * as actions from "../actions.js";
import RazonSocialFormFields from "./RazonSocialFormFields.jsx";
import {FormattedMessage} from "react-intl";

const RazonSocialCreateForm = ({
                                   onSuccess = () => {
                                   },
                                   onErrors = _ => {
                                   }
                               }) => {
    const dispatch = useDispatch();

    const [denominacion, setDenominacion] = useState('');
    const [cifnif, setCifnif] = useState('');

    let form;

    const cleanFields = () => {
        setDenominacion('');
        setCifnif('');
    }

    const handleSubmit = event => {
        event.preventDefault();

        if (form.checkValidity()) {
            dispatch(actions.createRazonSocial({
                    denominacion: denominacion.trim(),
                    cifnif: cifnif.trim(),
                },
                () => {
                    dispatch(actions.findAllRazonSocial(true));
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
            <RazonSocialFormFields
                denominacion={denominacion}
                setDenominacion={setDenominacion}
                cifnif={cifnif}
                setCifnif={setCifnif}
            />
            <ActionButton
                type="primary"
                htmlType="submit"
            >
                <FormattedMessage id="project.global.fields.accept"/>
            </ActionButton>
        </form>
    );

}

RazonSocialCreateForm.propTypes = {
    onSuccess: PropTypes.func,
    onErrors: PropTypes.func.isRequired,
};

export default RazonSocialCreateForm;