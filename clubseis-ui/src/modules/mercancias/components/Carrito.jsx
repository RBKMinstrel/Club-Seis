import {BackLink} from "../../common";

import * as selectors from "../selectors"
import {useSelector} from "react-redux";

const Carrito = () => {
    const carrito = useSelector(selectors.getCarrito);

    return (
        <>
            <BackLink/>
        </>
    );

}

export default Carrito;