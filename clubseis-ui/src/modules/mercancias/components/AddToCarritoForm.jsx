import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import PropTypes from "prop-types";

import * as actions from "../actions.js";
import * as selectors from '../selectors';
import {ActionButton, Errors} from "../../common/index.js";
import Select from "react-select";
import {FormattedMessage} from "react-intl";

const AddToCarritoForm = ({idArticulo, typeArticulo, onSuccess}) => {
    const dispatch = useDispatch();

    const carrito = useSelector(selectors.getCarrito);
    const tallas = useSelector(selectors.getTallas);
    const tallasOptions = tallas.map(talla => ({label: talla.name, value: talla.id}));

    const [talla, setTalla] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [backendErrors, setBackendErrors] = useState(null);

    const handleSubmit = () => {

        dispatch(actions.addToCarrito(
            carrito.id,
            idArticulo,
            talla,
            quantity,
            () => onSuccess(),
            error => setBackendErrors(error)
        ))

    }

    return (
        <>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <div style={{height: 200, width: 100}}>
                {typeArticulo &&
                    <div>
                        <label><FormattedMessage id="project.global.fields.size"/>:</label>
                        <Select
                            options={tallasOptions}
                            value={tallasOptions.find(t => t.id === talla)}
                            onChange={e => setTalla(e.value)}
                        />
                    </div>
                }
                <div>
                    <label><FormattedMessage id="project.global.fields.quantity"/>:</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={e => setQuantity(Number(e.target.value))}
                        min="1"
                        step="1"
                    />
                </div>
                <div>
                    <ActionButton
                        type="primary"
                        htmlType="submit"
                        onClick={() => handleSubmit()}
                    >
                        <FormattedMessage id="project.global.fields.accept"/>
                    </ActionButton>
                </div>
            </div>
        </>
    );

}

AddToCarritoForm.prototype = {
    idArticulo: PropTypes.number.isRequired,
    typeArticulo: PropTypes.bool.isRequired,
    onSuccess: PropTypes.func.isRequired
}

export default AddToCarritoForm;