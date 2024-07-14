import {useState} from "react";
import PropTypes from "prop-types";

import {Modal} from "../../common";
import AddToCarritoForm from "./AddToCarritoForm.jsx";

const AddToCarrito = ({idArticulo, typeArticulo}) => {
    const [modal, setModal] = useState(false);

    return (
        <>
            <span
                onClick={() => setModal(true)}
                style={{fontSize: '20px'}}
                className="fa-solid fa-cart-plus"
            />
            <Modal
                isActive={modal}
                title="Añadir a carrito"
                onClose={() => setModal(false)}
            >
                <AddToCarritoForm
                    idArticulo={idArticulo}
                    typeArticulo={typeArticulo}
                    onSuccess={() => setModal(false)}
                />
            </Modal>
        </>
    );

}

AddToCarrito.prototype = {
    idArticulo: PropTypes.number.isRequired,
    typeArticulo: PropTypes.bool.isRequired
}

export default AddToCarrito;