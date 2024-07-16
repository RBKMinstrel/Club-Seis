import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import PropTypes from "prop-types";

import * as actions from "../actions.js";
import * as selectors from '../selectors';
import {ActionButton, Errors} from "../../common/index.js";
import Select from "react-select";

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
                        <label>Talla:</label>
                        <Select
                            options={tallasOptions}
                            value={tallasOptions.find(t => t.id === talla)}
                            onChange={e => setTalla(e.value)}
                        />
                    </div>
                }
                <div>
                    <label>Cantidad:</label>
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
                        Aceptar
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